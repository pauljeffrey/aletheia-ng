# Generation Examples - SabiYarn Model

This document shows how to use the SabiYarn model for text generation with different options.

## Overview

The model supports two generation modes:
1. **With `use_cache=True`** (default): Uses `past_key_values` for incremental decoding (faster, matches HuggingFace with cache)
2. **With `use_cache=False`**: Passes full sequence each time (matches HuggingFace without cache, slower but easier to debug)

## Example 1: Custom generate() with use_cache=True (Recommended)

```python
from sabiyarn_optimized import GPTJXForCausalLM, GPTJXConfig
from transformers import AutoTokenizer

# Load model and tokenizer
config = GPTJXConfig(
    block_size=32768,
    use_kv_cache=True,  # Internal cache (separate from past_key_values)
    kv_cache_dtype="float16",  # Optional: use half precision
)
model = GPTJXForCausalLM.from_pretrained("BeardedMonster/SabiYarn-125M")
tokenizer = AutoTokenizer.from_pretrained("BeardedMonster/SabiYarn-125M")

# Prepare input
text = "<prompt> Wetin dem dey call you? <response>: "
input_ids = tokenizer(text, return_tensors="pt")["input_ids"].to(device)

# Generate with use_cache=True (uses past_key_values for incremental decoding)
# This is the RECOMMENDED way - it's faster and matches HuggingFace's behavior
output = model.generate(
    input_ids,
    max_new_tokens=100,
    do_sample=True,
    temperature=0.8,
    top_p=0.9,
    repetition_penalty=1.2,
    eos_token_id=tokenizer.eos_token_id,
    use_cache=True,  # ✅ Use past_key_values for incremental decoding
)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
```

## Example 2: Custom generate() with use_cache=False

```python
# Generate with use_cache=False (passes full sequence each time)
# This matches HuggingFace's behavior when cache is disabled
# Slower but easier to debug - use for testing
output = model.generate(
    input_ids,
    max_new_tokens=100,
    do_sample=True,
    temperature=0.8,
    top_p=0.9,
    repetition_penalty=1.2,
    eos_token_id=tokenizer.eos_token_id,
    use_cache=False,  # ❌ No past_key_values - full sequence each time
)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
```

## Example 3: HuggingFace's generate() with use_cache=True

```python
# Use HuggingFace's generate() method with past_key_values
# This will automatically use past_key_values for incremental decoding
output = model.generate(
    input_ids,
    max_new_tokens=100,
    do_sample=True,
    temperature=0.8,
    top_p=0.9,
    repetition_penalty=1.2,
    eos_token_id=tokenizer.eos_token_id,
    use_cache=True,  # ✅ HuggingFace will use past_key_values automatically
)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
```

## Example 4: HuggingFace's generate() with use_cache=False

```python
# Use HuggingFace's generate() without cache
# This passes full sequence each time (like original behavior)
output = model.generate(
    input_ids,
    max_new_tokens=100,
    do_sample=True,
    temperature=0.8,
    top_p=0.9,
    repetition_penalty=1.2,
    eos_token_id=tokenizer.eos_token_id,
    use_cache=False,  # ❌ No cache - full sequence each time
)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
```

## Testing Recommendations

### To match original HuggingFace output:
1. **First try**: Use HuggingFace's `generate()` with `use_cache=False`
   ```python
   output = model.generate(input_ids, use_cache=False, **generation_config)
   ```

2. **Then try**: Use custom `generate()` with `use_cache=False`
   ```python
   output = model.generate(input_ids, use_cache=False, **generation_config)
   ```

3. **If they match**: Try with `use_cache=True` for both
   ```python
   # HuggingFace
   output_hf = model.generate(input_ids, use_cache=True, **generation_config)
   
   # Custom
   output_custom = model.generate(input_ids, use_cache=True, **generation_config)
   ```

### Performance Comparison

| Method | use_cache | Speed | Memory | Matches HuggingFace |
|--------|-----------|-------|--------|---------------------|
| Custom generate() | True | ⚡ Fast | 💾 Medium | ✅ Yes (with cache) |
| Custom generate() | False | 🐌 Slow | 💾 High | ✅ Yes (without cache) |
| HuggingFace generate() | True | ⚡ Fast | 💾 Medium | ✅ Yes (with cache) |
| HuggingFace generate() | False | 🐌 Slow | 💾 High | ✅ Yes (without cache) |

## Key Points

1. **`use_cache=True`** (default): 
   - Uses `past_key_values` for incremental decoding
   - Only processes new tokens each step
   - Faster and more memory efficient
   - **Recommended for production**

2. **`use_cache=False`**:
   - Passes full sequence each time
   - Easier to debug
   - Matches original HuggingFace behavior when cache was disabled
   - **Use for testing/debugging**

3. **The `use_kv_cache` config parameter** is different from `use_cache`:
   - `use_kv_cache` (config): Controls internal KV cache buffers (legacy)
   - `use_cache` (generate): Controls `past_key_values` usage (HuggingFace standard)

## Full Example

```python
import torch
from sabiyarn_optimized import GPTJXForCausalLM, GPTJXConfig
from transformers import AutoTokenizer

# Setup
device = "cuda" if torch.cuda.is_available() else "cpu"
tokenizer = AutoTokenizer.from_pretrained("BeardedMonster/SabiYarn-125M")

# Load model
config = GPTJXConfig(
    block_size=32768,
    use_kv_cache=False,  # We'll use past_key_values instead
)
model = GPTJXForCausalLM.from_pretrained("BeardedMonster/SabiYarn-125M")
model.to(device)
model.eval()

# Prepare input
text = "<prompt> Wetin dem dey call you? <response>: "
input_ids = tokenizer(text, return_tensors="pt")["input_ids"].to(device)

# Generation config
generation_config = {
    "max_new_tokens": 100,
    "do_sample": True,
    "temperature": 0.8,
    "top_p": 0.9,
    "repetition_penalty": 1.2,
    "eos_token_id": tokenizer.eos_token_id,
}

# Option 1: Custom generate with cache (RECOMMENDED)
output1 = model.generate(input_ids, use_cache=True, **generation_config)
text1 = tokenizer.decode(output1[0], skip_special_tokens=True)
print("With cache:", text1)

# Option 2: Custom generate without cache (for testing)
output2 = model.generate(input_ids, use_cache=False, **generation_config)
text2 = tokenizer.decode(output2[0], skip_special_tokens=True)
print("Without cache:", text2)

# Option 3: HuggingFace generate with cache
output3 = model.generate(input_ids, use_cache=True, **generation_config)
text3 = tokenizer.decode(output3[0], skip_special_tokens=True)
print("HuggingFace with cache:", text3)

# Option 4: HuggingFace generate without cache
output4 = model.generate(input_ids, use_cache=False, **generation_config)
text4 = tokenizer.decode(output4[0], skip_special_tokens=True)
print("HuggingFace without cache:", text4)
```

## Troubleshooting

### If outputs don't match:

1. **Check `use_cache` parameter**: Make sure both methods use the same value
2. **Check generation config**: Ensure all parameters match (temperature, top_p, etc.)
3. **Check random seed**: Set seed for reproducible results
   ```python
   torch.manual_seed(42)
   ```
4. **Check device**: Ensure both are on the same device (CPU/GPU)
5. **Check model state**: Ensure model is in eval mode
   ```python
   model.eval()
   ```

### For debugging:

Use `use_cache=False` to see the full computation path:
- Passes full sequence each time
- Easier to debug attention masks
- Easier to verify position embeddings
- Matches original HuggingFace behavior when cache was disabled

