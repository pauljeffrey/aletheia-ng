"""
Modal script for deploying capable SabiYarn models (ChatGPT-style)
Deploy to different workspaces: naijaai, pauljeffrey, model-host
"""

import modal
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import List, Dict
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Create Modal stub
stub = modal.Stub("sabiyarn-capable")

# Define the image with required dependencies
image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install(
        "transformers==4.35.0",
        "torch==2.1.0",
        "accelerate==0.24.0",
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "pydantic==2.5.0",
    )
)

# Model repository mapping for capable models (to be added when available)
CAPABLE_MODEL_REPOS: Dict[str, str] = {
    # "sabiyarn-it": "BeardedMonster/SabiYarn-IT",
    # "sabiyarn-chat": "BeardedMonster/SabiYarn-Chat",
    # Add models here when they become available
}


@stub.function(
    image=image,
    gpu="T4",
    timeout=600,
    container_idle_timeout=300,
)
def chat_completion(model_id: str, messages: List[Dict[str, str]], session_id: str) -> Dict[str, str]:
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
        conversation = ""
        for msg in messages:
            role = msg["role"]
            content = msg["content"]
            if role == "user":
                conversation += f"User: {content}\n"
            elif role == "assistant":
                conversation += f"Assistant: {content}\n"
        
        conversation += "Assistant: "
        
        # Tokenize
        input_ids = tokenizer(
            conversation,
            return_tensors="pt",
            truncation=True,
            max_length=1024
        )["input_ids"].to(device)
        
        # Generate
        gen_config = {
            "max_new_tokens": 256,
            "temperature": 0.7,
            "top_p": 0.9,
            "do_sample": True,
            "pad_token_id": tokenizer.eos_token_id,
        }
        
        with torch.no_grad():
            output = model.generate(input_ids, **gen_config)
        
        # Decode response
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        
        # Extract assistant response
        if "Assistant: " in generated_text:
            response = generated_text.split("Assistant: ")[-1].strip()
        else:
            response = generated_text[len(conversation):].strip()
        
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
            request.session_id
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

# Deploy to Modal
@stub.asgi(app=web_app)
def fastapi_app():
    return web_app
