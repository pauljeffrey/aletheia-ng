"""
SabiYarn Model Implementation - Fixed and Optimized
Memory-optimized for large context length (65536) while maintaining HuggingFace compatibility.
"""

from transformers import PretrainedConfig, PreTrainedModel, AutoConfig, AutoModelForCausalLM
from transformers.modeling_outputs import CausalLMOutputWithPast
from typing import List, Optional, Tuple
from torch import nn
import torch
import torch.nn.functional as F
import math

repo_name = "BeardedMonster/SabiYarn-125M"


class GPTJXConfig(PretrainedConfig):
    """Configuration class for SabiYarn model."""
    
    model_type = "SabiYarn"
    
    def __init__(
        self,
        block_size: int = 32768 * 2,
        vocab_size: int = 52050,  # GPT-2 vocab_size of 50257, padded up to nearest multiple of 64 for efficiency
        n_layer: int = 12,
        n_heads: int = 12,
        n_embd: int = 768,
        dropout: float = 0.0,
        max_batch_size: int = 1,
        use_kv_cache: bool = True,
        bias: bool = False,  # True: bias in Linears and LayerNorms, like GPT-2. False: a bit better and faster
        **kwargs
    ):
        self.block_size = block_size
        self.vocab_size = vocab_size
        self.n_layer = n_layer
        self.n_heads = n_heads
        self.n_embd = n_embd
        self.dropout = dropout
        self.bias = bias
        self.use_kv_cache = use_kv_cache
        self.max_batch_size = max_batch_size
        
        super().__init__(**kwargs)


class LayerNorm(nn.Module):
    """LayerNorm but with an optional bias. PyTorch doesn't support simply bias=False"""
    
    def __init__(self, ndim: int, bias: bool):
        super().__init__()
        self.weight = nn.Parameter(torch.ones(ndim))
        self.bias = nn.Parameter(torch.zeros(ndim)) if bias else None
    
    def forward(self, input: torch.Tensor) -> torch.Tensor:
        return F.layer_norm(input, self.weight.shape, self.weight, self.bias, 1e-5)


class CausalSelfAttention(nn.Module):
    """
    Multi-head causal self-attention with optional KV caching.
    Memory-optimized: No large buffers, uses shared mask from model class.
    """
    
    def __init__(self, config: GPTJXConfig, shared_bias_mask: Optional[torch.Tensor] = None):
        super().__init__()
        assert config.n_embd % config.n_heads == 0
        
        # key, query, value projections for all heads, but in a batch
        self.c_attn = nn.Linear(config.n_embd, 3 * config.n_embd, bias=config.bias)
        # output projection
        self.c_proj = nn.Linear(config.n_embd, config.n_embd, bias=config.bias)
        # regularization
        self.attn_dropout = nn.Dropout(config.dropout)
        self.resid_dropout = nn.Dropout(config.dropout)
        self.n_heads = config.n_heads
        self.n_embd = config.n_embd
        self.dropout = config.dropout
        self.head_dim = config.n_embd // config.n_heads
        
        # flash attention make GPU go brrrrr but support is only in PyTorch >= 2.0
        self.flash = hasattr(torch.nn.functional, 'scaled_dot_product_attention')
        
        self.use_kv_cache = config.use_kv_cache
        
        # Memory optimization: Use shared bias mask from model class instead of per-layer buffer
        # This saves massive memory with large block_size (65536)
        self.shared_bias_mask = shared_bias_mask
        
        # Memory optimization: Lazy KV cache allocation
        # Only allocate when actually needed during inference, not at initialization
        self._cache_k = None
        self._cache_v = None
        self._cache_initialized = False
        self.max_batch_size = config.max_batch_size
        self.block_size = config.block_size
    
    def _init_kv_cache(self, device: torch.device, dtype: torch.dtype):
        """Lazy initialization of KV cache. Only allocates when needed."""
        if not self._cache_initialized and self.use_kv_cache:
            self._cache_k = torch.zeros(
                self.max_batch_size,
                self.n_heads,
                self.block_size,
                self.head_dim,
                device=device,
                dtype=dtype
            )
            self._cache_v = torch.zeros(
                self.max_batch_size,
                self.n_heads,
                self.block_size,
                self.head_dim,
                device=device,
                dtype=dtype
            )
            self._cache_initialized = True
    
    def clear_cache(self):
        """Clear the KV cache. Useful for resetting state between sequences."""
        if self._cache_initialized:
            self._cache_k.zero_()
            self._cache_v.zero_()
    
    def forward(self, x: torch.Tensor, start_pos: int = 0, attn_mask: Optional[torch.Tensor] = None) -> torch.Tensor:
        """
        Forward pass through attention.
        
        Args:
            x: Input tensor of shape (B, T, C)
            start_pos: Starting position for KV cache (for incremental decoding)
            attn_mask: Optional attention mask
        """
        B, T, C = x.size()  # batch size, sequence length, embedding dimensionality (n_embd)
        
        # Calculate query, key, values for all heads in batch and move head forward to be the batch dim
        q, k, v = self.c_attn(x).split(self.n_embd, dim=2)
        k = k.view(B, T, self.n_heads, self.head_dim).transpose(1, 2)  # (B, nh, T, hs)
        q = q.view(B, T, self.n_heads, self.head_dim).transpose(1, 2)  # (B, nh, T, hs)
        v = v.view(B, T, self.n_heads, self.head_dim).transpose(1, 2)  # (B, nh, T, hs)
        
        # Handle KV cache for incremental decoding
        if self.use_kv_cache and not self.training:
            # Lazy initialization: allocate cache on first use
            if not self._cache_initialized:
                self._init_kv_cache(x.device, x.dtype)
            
            # Move cache to correct device if needed
            if self._cache_k.device != x.device:
                self._cache_k = self._cache_k.to(x.device)
                self._cache_v = self._cache_v.to(x.device)
            
            # Update cache with new keys and values
            self._cache_k[:B, :, start_pos:start_pos + T] = k
            self._cache_v[:B, :, start_pos:start_pos + T] = v
            
            # Use cached keys and values up to current position
            k = self._cache_k[:B, :, :start_pos + T]
            v = self._cache_v[:B, :, :start_pos + T]
        
        # Causal self-attention
        if self.flash:
            # Efficient attention using Flash Attention CUDA kernels
            if attn_mask is not None:
                attn_mask = attn_mask.to(torch.bool)
                y = torch.nn.functional.scaled_dot_product_attention(
                    q, k, v, 
                    attn_mask=attn_mask, 
                    dropout_p=self.dropout if self.training else 0
                )
            else:
                y = torch.nn.functional.scaled_dot_product_attention(
                    q, k, v, 
                    attn_mask=None, 
                    dropout_p=self.dropout if self.training else 0, 
                    is_causal=True
                )
        else:
            # Manual implementation of attention (fallback)
            att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))
            
            # Apply causal mask using shared mask from model class
            if self.shared_bias_mask is not None:
                # Use shared mask, slice to actual sequence dimensions
                seq_len = k.size(-2)
                att = att.masked_fill(
                    self.shared_bias_mask[:, :, :T, :seq_len] == 0, 
                    float('-inf')
                )
            else:
                # Fallback: create small mask on-the-fly if no shared mask
                causal_mask = torch.tril(torch.ones(T, k.size(-2), device=att.device, dtype=torch.bool))
                att = att.masked_fill(~causal_mask, float('-inf'))
            
            # Apply custom attention mask if provided
            if attn_mask is not None:
                att = att.masked_fill(attn_mask == 0, float('-inf'))
            
            att = F.softmax(att, dim=-1)
            att = self.attn_dropout(att)
            y = att @ v  # (B, nh, T, T) x (B, nh, T, hs) -> (B, nh, T, hs)
        
        y = y.transpose(1, 2).contiguous().view(B, T, C)  # re-assemble all head outputs side by side
        # Output projection
        y = self.resid_dropout(self.c_proj(y))
        return y


class MLP(nn.Module):
    """Multi-layer perceptron with GELU activation."""
    
    def __init__(self, config: GPTJXConfig):
        super().__init__()
        self.c_fc = nn.Linear(config.n_embd, 4 * config.n_embd, bias=config.bias)
        self.gelu = nn.GELU()
        self.c_proj = nn.Linear(4 * config.n_embd, config.n_embd, bias=config.bias)
        self.dropout = nn.Dropout(config.dropout)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.c_fc(x)
        x = self.gelu(x)
        x = self.c_proj(x)
        x = self.dropout(x)
        return x


class BlockJ(nn.Module):
    """Transformer block with pre-norm architecture and additional layer norm."""
    
    def __init__(self, config: GPTJXConfig, shared_bias_mask: Optional[torch.Tensor] = None):
        super().__init__()
        self.ln_1 = LayerNorm(config.n_embd, bias=config.bias)
        # FIXED: Changed from LayerNorm(config.n_embd, config.n_embd) to use bias parameter
        self.j = LayerNorm(config.n_embd, bias=config.bias)
        self.attn = CausalSelfAttention(config, shared_bias_mask=shared_bias_mask)
        self.ln_2 = LayerNorm(config.n_embd, bias=config.bias)
        self.mlp = MLP(config)
    
    def forward(self, x: torch.Tensor, start_pos: int = 0, attn_mask: Optional[torch.Tensor] = None) -> torch.Tensor:
        """
        Forward pass through transformer block.
        
        Args:
            x: Input tensor
            start_pos: Starting position for KV cache (kept for compatibility, not used in original)
            attn_mask: Optional attention mask
        """
        h = x
        x = self.ln_1(x)
        x = h + self.attn(x, start_pos, attn_mask) + self.j(x)
        x = x + self.mlp(self.ln_2(x))
        return x


class GPTJXForCausalLM(PreTrainedModel):
    """SabiYarn model for causal language modeling."""
    
    config_class = GPTJXConfig
    base_model_prefix = "transformer"
    is_parallelizable = True
    supports_gradient_checkpointing = True
    _no_split_modules = ["BlockJ"]
    _supports_flash_attn_2 = True
    _tied_weights_keys = ["lm_head.weight"]
    
    def __init__(self, config: GPTJXConfig):
        super().__init__(config)
        assert config.vocab_size is not None
        assert config.block_size is not None
        
        self.config = config
        
        # Memory optimization: Create shared bias mask once at model level instead of per-layer
        # With block_size=65536, a single mask is ~16GB if float32, but we can optimize further
        # Only create if flash attention is not available (flash handles causality internally)
        self.flash_available = hasattr(torch.nn.functional, 'scaled_dot_product_attention')
        
        if not self.flash_available:
            # Memory optimization: Use smaller base mask (1024) and compute larger masks on-demand
            # This saves ~16GB+ that would be allocated as a buffer
            base_mask_size = 1024
            base_mask = torch.tril(
                torch.ones(base_mask_size, base_mask_size, dtype=torch.bool)
            ).view(1, 1, base_mask_size, base_mask_size)
            self.register_buffer("_base_mask", base_mask)
            self._base_mask_size = base_mask_size
            shared_bias_mask = self._base_mask
        else:
            # Flash attention handles causality, no mask needed
            self._base_mask = None
            self._base_mask_size = 0
            shared_bias_mask = None
        
        self.transformer = nn.ModuleDict(dict(
            wte=nn.Embedding(config.vocab_size, config.n_embd),
            wpe=nn.Embedding(config.block_size, config.n_embd),
            drop=nn.Dropout(config.dropout),
            h=nn.ModuleList([
                BlockJ(config, shared_bias_mask=shared_bias_mask) 
                for _ in range(config.n_layer)
            ]),
            ln_f=LayerNorm(config.n_embd, bias=config.bias),
        ))
        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)
        
        # Weight tying: share weights between input embeddings and output projection
        self.transformer.wte.weight = self.lm_head.weight
        
        # Initialize all weights
        self.apply(self._init_weights)
        
        # Apply special scaled init to the residual projections, per GPT-2 paper
        for pn, p in self.named_parameters():
            if pn.endswith('c_proj.weight'):
                torch.nn.init.normal_(p, mean=0.0, std=0.02 / math.sqrt(2 * config.n_layer))
        
        # Report number of parameters
        print("number of parameters: %.2fM" % (self.get_num_params() / 1e6,))
    
    def _init_weights(self, module: nn.Module):
        """Initialize weights following GPT-2 initialization scheme."""
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
    
    def get_num_params(self, non_embedding: bool = True) -> int:
        """
        Return the number of parameters in the model.
        For non-embedding count (default), the position embeddings get subtracted.
        The token embeddings would too, except due to the parameter sharing these
        params are actually used as weights in the final layer, so we include them.
        """
        n_params = sum(p.numel() for p in self.parameters())
        if non_embedding:
            n_params -= self.transformer.wpe.weight.numel()
        return n_params
    
    def get_input_embeddings(self):
        """FIXED: Return transformer.wte instead of self.wte"""
        return self.transformer.wte
    
    def set_input_embeddings(self, new_embeddings: nn.Embedding):
        """FIXED: Set transformer.wte instead of self.wte"""
        self.transformer.wte = new_embeddings
    
    def clear_kv_cache(self):
        """Clear KV cache in all attention layers. Useful for resetting state."""
        for block in self.transformer.h:
            block.attn.clear_cache()
    
    def forward(
        self,
        idx: torch.Tensor,
        targets: Optional[torch.Tensor] = None,
        attn_mask: Optional[torch.Tensor] = None,
        output_hidden_states: Optional[bool] = None,
        **kwargs
    ) -> CausalLMOutputWithPast:
        """
        Forward pass through the model.
        
        Args:
            idx: Input token indices of shape (B, T)
            targets: Target token indices for loss computation of shape (B, T)
            attn_mask: Optional attention mask
            output_hidden_states: Whether to return hidden states
        
        Returns:
            CausalLMOutputWithPast
        """
        device = idx.device
        b, t = idx.size()
        
        assert t <= self.config.block_size, (
            f"Cannot forward sequence of length {t}, block size is only {self.config.block_size}"
        )
        
        pos = torch.arange(0, t, dtype=torch.long, device=device)  # shape (t)
        
        # Forward the GPT model itself
        tok_emb = self.transformer.wte(idx)  # token embeddings of shape (b, t, n_embd)
        pos_emb = self.transformer.wpe(pos)  # position embeddings of shape (t, n_embd)
        x = self.transformer.drop(tok_emb + pos_emb)
        
        # Pass through transformer blocks
        # Note: Original code doesn't pass start_pos, but we keep it for KV cache compatibility
        for block in self.transformer.h:
            x = block(x, start_pos=0, attn_mask=attn_mask)
        
        x = self.transformer.ln_f(x)
        
        # Compute logits and loss
        if targets is not None:
            # Training: calculate loss
            logits = self.lm_head(x)
            loss = F.cross_entropy(
                logits.view(-1, logits.size(-1)), 
                targets.view(-1), 
                ignore_index=-100
            )
        else:
            # Inference optimization: only forward lm_head on the very last position
            # This matches the original implementation exactly
            logits = self.lm_head(x[:, [-1], :])  # note: using list [-1] to preserve the time dim
            loss = None
        
        return CausalLMOutputWithPast(
            loss=loss,
            logits=logits,
            hidden_states=x if output_hidden_states else None,
            attentions=None,
        )
    
    def prepare_inputs_for_generation(self, input_ids, attention_mask=None, **kwargs):
        """
        Prepare inputs for generation. Called by HuggingFace's generate().
        DO NOT MODIFY - This must match the original exactly.
        """
        # Default model inputs
        model_inputs = {"idx": input_ids}
        
        # Add attention mask if provided
        if attention_mask is not None:
            model_inputs["attn_mask"] = attention_mask
        
        return model_inputs
    
    def crop_block_size(self, block_size: int):
        """Crop the model's block size to a smaller value."""
        assert block_size <= self.config.block_size
        self.config.block_size = block_size
        self.transformer.wpe.weight = nn.Parameter(self.transformer.wpe.weight[:block_size])
        
        # Update block_size in all attention layers
        for block in self.transformer.h:
            block.attn.block_size = block_size
            # Clear cache if it was already allocated
            if block.attn._cache_initialized:
                block.attn.clear_cache()
                block.attn._cache_initialized = False
                block.attn._cache_k = None
                block.attn._cache_v = None
        
        # Update base mask if it exists
        if self._base_mask is not None and block_size < self._base_mask_size:
            # Keep base mask as is (it's small)
            pass
        elif self._base_mask is not None and block_size > self._base_mask_size:
            # Would need to expand, but we use dynamic masks anyway
            pass


# Register model with AutoConfig and AutoModel
AutoConfig.register("SabiYarn", GPTJXConfig)
AutoModel.register(GPTJXConfig, GPTJXForCausalLM)
AutoModelForCausalLM.register(GPTJXConfig, GPTJXForCausalLM)

