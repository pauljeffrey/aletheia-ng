"""
SabiYarn Model - Exact Match to Original Implementation
Only fixes critical bugs, no optimizations that change behavior.
"""

from transformers import PretrainedConfig, PreTrainedModel, AutoConfig, AutoModel, AutoModelForCausalLM
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
        vocab_size: int = 52050,
        n_layer: int = 12,
        n_heads: int = 12,
        n_embd: int = 768,
        dropout: float = 0.0,
        max_batch_size: int = 1,
        use_kv_cache: bool = True,
        bias: bool = False,
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
    
    def __init__(self, ndim, bias):
        super().__init__()
        self.weight = nn.Parameter(torch.ones(ndim))
        self.bias = nn.Parameter(torch.zeros(ndim)) if bias else None
    
    def forward(self, input):
        return F.layer_norm(input, self.weight.shape, self.weight, self.bias, 1e-5)


class CausalSelfAttention(nn.Module):
    """Causal self-attention - EXACT match to original implementation."""
    
    def __init__(self, config):
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
        
        # flash attention make GPU go brrrrr but support is only in PyTorch >= 2.0
        self.flash = hasattr(torch.nn.functional, 'scaled_dot_product_attention')
        
        self.use_kv_cache = config.use_kv_cache
        if self.use_kv_cache:
            self.cache_k = torch.zeros(
                (
                    config.max_batch_size,
                    self.n_heads,
                    config.block_size,
                    config.n_embd // config.n_heads
                )
            )
            self.cache_v = torch.zeros(
                (
                    config.max_batch_size,
                    self.n_heads,
                    config.block_size,
                    config.n_embd // config.n_heads
                )
            )
    
    def forward(self, x: torch.Tensor, start_pos: int, attn_mask=None):
        B, T, C = x.size()  # batch size, sequence length, embedding dimensionality (n_embd)
        
        # calculate query, key, values for all heads in batch and move head forward to be the batch dim
        q, k, v = self.c_attn(x).split(self.n_embd, dim=2)
        k = k.view(B, T, self.n_heads, C // self.n_heads).transpose(1, 2)  # (B, nh, T, hs)
        q = q.view(B, T, self.n_heads, C // self.n_heads).transpose(1, 2)  # (B, nh, T, hs)
        v = v.view(B, T, self.n_heads, C // self.n_heads).transpose(1, 2)  # (B, nh, T, hs)
        
        # CRITICAL: KV cache logic - exact match to original
        # Note: HuggingFace generate() does full forward passes, so start_pos is always 0
        # and the cache doesn't actually help. But we keep the logic to match original.
        if self.use_kv_cache and not self.training:
            self.cache_k = self.cache_k.to(q)
            self.cache_v = self.cache_v.to(q)
            self.cache_k[:B, :, start_pos: start_pos + T] = k
            self.cache_v[:B, :, start_pos: start_pos + T] = v
            k = self.cache_k[:B, :, :start_pos + T]
            v = self.cache_v[:B, :, :start_pos + T]
        
        # causal self-attention; Self-attend: (B, nh, T, hs) x (B, nh, hs, T) -> (B, nh, T, T)
        if self.flash:
            if attn_mask is not None:
                # efficient attention using Flash Attention CUDA kernels
                attn_mask = attn_mask.to(torch.bool)
                y = torch.nn.functional.scaled_dot_product_attention(q, k, v, attn_mask=attn_mask, dropout_p=self.dropout if self.training else 0)
            else:
                y = torch.nn.functional.scaled_dot_product_attention(q, k, v, attn_mask=None, dropout_p=self.dropout if self.training else 0, is_causal=True)
        else:
            # manual implementation of attention
            att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))
            # CRITICAL: Exact match to original mask application
            # Original code: att = att.masked_fill(self.bias[:,:,:T,:T] == 0, float('-inf'))
            # For HuggingFace generate(), we always do full forward passes, so:
            # - T is the current sequence length (query length)
            # - k.size(-2) is the key length (same as T for full forward passes)
            # - We use self.bias[:,:,:T,:T] exactly as in original
            if hasattr(self, '_model_bias'):
                # Use exact same slicing as original: self.bias[:,:,:T,:T]
                # This works because HuggingFace generate() does full forward passes
                # so T (query length) == k.size(-2) (key length) always
                att = att.masked_fill(self._model_bias[:, :, :T, :T] == 0, float('-inf'))
            else:
                # Fallback: create mask on the fly if not available
                causal_mask = torch.tril(torch.ones(T, T, device=att.device, dtype=torch.bool))
                att = att.masked_fill(~causal_mask, float('-inf'))
            
            att = F.softmax(att, dim=-1)
            att = self.attn_dropout(att)
            y = att @ v  # (B, nh, T, T) x (B, nh, T, hs) -> (B, nh, T, hs)
        
        y = y.transpose(1, 2).contiguous().view(B, T, C)  # re-assemble all head outputs side by side
        # output projection
        y = self.resid_dropout(self.c_proj(y))
        return y


class MLP(nn.Module):
    """Multi-layer perceptron."""
    
    def __init__(self, config):
        super().__init__()
        self.c_fc = nn.Linear(config.n_embd, 4 * config.n_embd, bias=config.bias)
        self.gelu = nn.GELU()
        self.c_proj = nn.Linear(4 * config.n_embd, config.n_embd, bias=config.bias)
        self.dropout = nn.Dropout(config.dropout)
    
    def forward(self, x):
        x = self.c_fc(x)
        x = self.gelu(x)
        x = self.c_proj(x)
        x = self.dropout(x)
        return x


class BlockJ(nn.Module):
    """Transformer block."""
    
    def __init__(self, config):
        super().__init__()
        self.ln_1 = LayerNorm(config.n_embd, bias=config.bias)
        # FIXED: Changed from LayerNorm(config.n_embd, config.n_embd) to use bias parameter
        self.j = LayerNorm(config.n_embd, bias=config.bias)
        self.attn = CausalSelfAttention(config)
        self.ln_2 = LayerNorm(config.n_embd, bias=config.bias)
        self.mlp = MLP(config)
    
    def forward(self, x, start_pos: int = 0, attn_mask=None):
        """
        Forward pass through transformer block.
        Note: Original code doesn't use start_pos in BlockJ, but CausalSelfAttention needs it.
        We keep it for KV cache compatibility but default to 0 (full sequence).
        """
        h = x
        x = self.ln_1(x)
        # CRITICAL: Original code would fail here because CausalSelfAttention.forward expects start_pos
        # but BlockJ.forward in original doesn't pass it. However, for HuggingFace generate(),
        # we always pass full sequences, so start_pos=0 is correct.
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
    
    def __init__(self, config):
        super().__init__(config)
        assert config.vocab_size is not None
        assert config.block_size is not None
        self.config = config
        
        self.transformer = nn.ModuleDict(dict(
            wte=nn.Embedding(config.vocab_size, config.n_embd),
            wpe=nn.Embedding(config.block_size, config.n_embd),
            drop=nn.Dropout(config.dropout),
            h=nn.ModuleList([BlockJ(config) for _ in range(config.n_layer)]),
            ln_f=LayerNorm(config.n_embd, bias=config.bias),
        ))
        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)
        
        # Weight tying
        self.transformer.wte.weight = self.lm_head.weight
        
        # CRITICAL: Register bias mask at model level (as in original)
        # This is accessed by CausalSelfAttention via _model_bias
        self.register_buffer("bias", torch.tril(torch.ones(config.block_size, config.block_size))
                            .view(1, 1, config.block_size, config.block_size))
        
        # Pass bias reference to all attention layers
        for block in self.transformer.h:
            block.attn._model_bias = self.bias
        
        # init all weights
        self.apply(self._init_weights)
        
        # apply special scaled init to the residual projections, per GPT-2 paper
        for pn, p in self.named_parameters():
            if pn.endswith('c_proj.weight'):
                torch.nn.init.normal_(p, mean=0.0, std=0.02/math.sqrt(2 * config.n_layer))
        
        # report number of parameters
        print("number of parameters: %.2fM" % (self.get_num_params()/1e6,))
    
    def _init_weights(self, module):
        """Initialize weights following GPT-2 initialization scheme."""
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
    
    def get_num_params(self, non_embedding=True):
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
    
    def set_input_embeddings(self, new_embeddings):
        """FIXED: Set transformer.wte instead of self.wte"""
        self.transformer.wte = new_embeddings
    
    def forward(self, idx, targets=None, attn_mask=None, output_hidden_states: Optional[bool] = None, **kwargs):
        device = idx.device
        b, t = idx.size()
        
        assert t <= self.config.block_size, f"Cannot forward sequence of length {t}, block size is only {self.config.block_size}"
        
        pos = torch.arange(0, t, dtype=torch.long, device=device)  # shape (t)
        
        # forward the GPT model itself
        tok_emb = self.transformer.wte(idx)  # token embeddings of shape (b, t, n_embd)
        pos_emb = self.transformer.wpe(pos)  # position embeddings of shape (t, n_embd)
        x = self.transformer.drop(tok_emb + pos_emb)
        
        # CRITICAL: HuggingFace generate() does full forward passes each time
        # It doesn't use our KV cache mechanism, so start_pos=0 is always correct
        # Original code doesn't pass start_pos, but CausalSelfAttention needs it (defaults to 0)
        for block in self.transformer.h:
            x = block(x, start_pos=0, attn_mask=attn_mask)
        
        x = self.transformer.ln_f(x)
        
        # logits = self.lm_head(x)  # logits over the entire sequence, shape (b, t, vocab_size)
        if targets is not None:
            # if we are given some desired targets also calculate the loss
            logits = self.lm_head(x)
            loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1), ignore_index=-100)
        else:
            # inference-time mini-optimization: only forward the lm_head on the very last position
            logits = self.lm_head(x[:, [-1], :])  # note: using list [-1] to preserve the time dim
            loss = None
        
        return CausalLMOutputWithPast(
            loss=loss,
            logits=logits,
            hidden_states=x if output_hidden_states else None,
            attentions=None,
        )
    
    def prepare_inputs_for_generation(self, input_ids, attention_mask=None, **kwargs):
        """Prepare inputs for generation. Called by HuggingFace's generate()."""
        # Default model inputs
        model_inputs = {"idx": input_ids}
        
        # Add attention mask if provided
        if attention_mask is not None:
            model_inputs["attn_mask"] = attention_mask
        
        return model_inputs
    
    def crop_block_size(self, block_size):
        """Crop the model's block size to a smaller value."""
        assert block_size <= self.config.block_size
        self.config.block_size = block_size
        self.transformer.wpe.weight = nn.Parameter(self.transformer.wpe.weight[:block_size])
        for block in self.transformer.h:
            if hasattr(block.attn, 'bias'):
                block.attn.bias = block.attn.bias[:, :, :block_size, :block_size]
        # Also update model-level bias
        self.bias = self.bias[:, :, :block_size, :block_size]
        # Update references in attention layers
        for block in self.transformer.h:
            block.attn._model_bias = self.bias


# Register model with AutoConfig and AutoModel
AutoConfig.register("SabiYarn", GPTJXConfig)
AutoModel.register(GPTJXConfig, GPTJXForCausalLM)
AutoModelForCausalLM.register(GPTJXConfig, GPTJXForCausalLM)

