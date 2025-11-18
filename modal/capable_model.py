"""
Modal script for deploying capable SabiYarn models (ChatGPT-style)
Deploy to different workspaces: naijaai, pauljeffrey, model-host
"""

import modal
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import List, Dict, Any, Optional
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Create Modal app
app = modal.App("sabiyarn-capable")

# Define the image with required dependencies
image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install(
        "transformers==4.41.2",
        "torch==2.1.0",
        "accelerate==0.24.0",
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "pydantic==2.5.0",
    )
)

# Model repository mapping for capable models (to be added when available)
CAPABLE_MODEL_REPOS: Dict[str, str] = {
    "sabiyarn-32k": "BeardedMonster/sabiyarn-32k",
    # "sabiyarn-chat": "BeardedMonster/SabiYarn-Chat",
    # Add models here when they become available
}

END_OF_TOKEN_ID = 32


@app.function(
    image=image,
    gpu="T4",
    timeout=600,
    scaledown_window=300,
)
def chat_completion(
    model_id: str,
    messages: List[Dict[str, str]],
    session_id: str,
    config: Optional[Dict[str, Any]] = None,
) -> Dict[str, str]:
    """
    Generate chat completion with conversation history.
    This will be implemented when capable models are available.
    """
    # Check if model exists
    if model_id not in CAPABLE_MODEL_REPOS:
        raise ValueError(f"Model {model_id} not found")
    
    repo_name = CAPABLE_MODEL_REPOS[model_id]
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    try:
        # Load model
        tokenizer = AutoTokenizer.from_pretrained(repo_name, trust_remote_code=True)
        model = AutoModelForCausalLM.from_pretrained(
            repo_name, trust_remote_code=True
        ).to(device)
        model.eval()
        
        # Format conversation
        # conversation = ""
        # for msg in messages:
        #     role = msg["role"]
        #     content = msg["content"]
        #     if role == "user":
        #         conversation += f"User: {content}\n"
        #     elif role == "assistant":
        #         conversation += f"Assistant: {content}\n"
        
        # conversation += "Assistant: "
        
        
        
        # Tokenize
        input_ids = tokenizer.apply_chat_template(messages, add_generation_prompt=True, return_tensors="pt").to(device)
        
        cfg = config or {}
        max_new_tokens = int(cfg.get("maxNewTokens", 256))
        temperature = float(cfg.get("temperature", 0.7))
        top_p = float(cfg.get("topP", 0.9))
        top_k = max(1, int(cfg.get("topK", 50)))
        repetition_penalty = float(cfg.get("repetitionPenalty", 1.1))
        do_sample = bool(cfg.get("doSample", True))

        # Generate
        gen_config = {
            "max_new_tokens": max_new_tokens,
            "temperature": temperature,
            "top_p": top_p,
            "top_k": top_k,
            "repetition_penalty": repetition_penalty,
            "do_sample": do_sample,
            "pad_token_id": tokenizer.eos_token_id,
            "eos_token_id": END_OF_TOKEN_ID,
        }
        
        with torch.no_grad():
            output = model.generate(input_ids, **gen_config)
        
        # Decode only the newly generated tokens after the prompt
        prompt_length = input_ids.shape[-1]
        generated_tokens = output[0, prompt_length:]
        response = tokenizer.decode(generated_tokens, skip_special_tokens=True).strip()
        
        # Clean up
        response = re.sub(r"\n\n+", "\n", response)
        response = response.strip()
        
        # Generate session name from first user message
        session_name = "New Chat"
        if messages and len(messages) > 0:
            first_user_msg = next(
                (msg["content"] for msg in messages if msg["role"] == "user"),
                "New Chat"
            )
            session_name = first_user_msg[:30] + ("..." if len(first_user_msg) > 30 else "")
        
        return {
            "output": response,
            "session_name": session_name,
        }
        
    except Exception as e:
        raise Exception(f"Error generating chat response: {str(e)}")


# FastAPI app
web_app = FastAPI(title="SabiYarn Capable Models API")

class ChatRequest(BaseModel):
    model: str
    messages: List[Dict[str, str]]
    session_id: str
    config: Optional[Dict[str, Any]] = None

@web_app.post("/predict")
async def predict(request: ChatRequest):
    """API endpoint for chat prediction"""
    try:
        if not CAPABLE_MODEL_REPOS:
            raise HTTPException(
                status_code=503,
                detail="Capable models are not yet available. They will be released in the next 3 months."
            )
        
        # Call Modal function asynchronously
        result = await chat_completion.remote.aio(
            request.model,
            request.messages,
            request.session_id,
            request.config
        )
        return {
            "output": result["output"],
            "session_name": result.get("session_name")
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@web_app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "models_available": len(CAPABLE_MODEL_REPOS) > 0,
        "models": list(CAPABLE_MODEL_REPOS.keys())
    }

# Deploy FastAPI app on Modal
@app.function(
    image=image,
    timeout=600,
    scaledown_window=300,
)
@modal.asgi_app()
def fastapi_app():
    return web_app
