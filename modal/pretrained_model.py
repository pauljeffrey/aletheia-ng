"""
Modal script for deploying pretrained/finetuned SabiYarn models
Deploy to different workspaces: naijaai, pauljeffrey, model-host
"""

import modal
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional

# Create Modal app
app = modal.App("sabiyarn-fastapi-app")

# Define the image with required dependencies
image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install(
        "transformers==4.41.2",
        "torch==2.2.0",
        "accelerate==0.24.0",
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "pydantic==2.5.0",
    )
)

# Model repository mapping
MODEL_REPOS: Dict[str, str] = {
    "sabiyarn-125m": "BeardedMonster/SabiYarn-125M",
    "sabiyarn-finetune": "BeardedMonster/SabiYarn-125M-finetune",
    "sabiyarn-translate": "BeardedMonster/SabiYarn-125M-translate",
    "sabiyarn-sentiment": "BeardedMonster/SabiYarn-125M-sentiment",
    "sabiyarn-topic": "BeardedMonster/SabiYarn-125M-topic",
    "sabiyarn-diacritize": "BeardedMonster/SabiYarn-diacritics-cleaner",
    "sabiyarn-igbo-translate": "BeardedMonster/SabiYarn-125M-Igbo-translate",
    "sabiyarn-yoruba-translate": "BeardedMonster/SabiYarn-125M-Yoruba-translate",
    "sabiyarn-language-detection": "BeardedMonster/Sabiyarn_language_detection",
}
END_OF_TOKEN_ID= 32

@app.function(
    image=image,
    gpu="T4",
    timeout=600,
    scaledown_window=300,
)
def generate_text(model_id: str, prompt: str, config: dict) -> str:
    """
    Load model and generate text.
    Models are loaded on-demand per request.
    """
    repo_name = MODEL_REPOS.get(model_id, MODEL_REPOS["sabiyarn-125m"])
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    try:
        # Load tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(repo_name, trust_remote_code=True)
        model = AutoModelForCausalLM.from_pretrained(
            repo_name, trust_remote_code=True
        ).to(device)
        model.eval()
        
        # Prepare generation config
        gen_config = {
            "max_length": config.get("maxLength", 100),
            "max_new_tokens": config.get("maxNewTokens", 80),
            "num_beams": config.get("numBeams", 5),
            "do_sample": config.get("doSample", False),
            "temperature": config.get("temperature", 0.99),
            "top_k": config.get("topK", 50),
            "top_p": config.get("topP", 0.95),
            "repetition_penalty": config.get("repetitionPenalty", 4.0),
            "length_penalty": config.get("lengthPenalty", 3.0),
            "early_stopping": True,
            "eos_token_id": END_OF_TOKEN_ID,
        }
        
        # Tokenize input
        input_ids = tokenizer(prompt, return_tensors="pt")["input_ids"].to(device)
        
        # Generate
        with torch.no_grad():
            output = model.generate(input_ids, **gen_config)
        
        # Decode output
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        
        # Clean up output
        generated_text = re.sub(
            r"\|(end_f_text|end_of_text|end_ofext|end_of_text_|end_of_te|end_o|end_of_tet|end_oftext)|:|`",
            "",
            generated_text
        )
        generated_text = generated_text.strip("\n")
        
        return generated_text
        
    except Exception as e:
        raise Exception(f"Error generating text: {str(e)}")


# FastAPI app
web_app = FastAPI(title="SabiYarn Pretrained Models API")

class PredictRequest(BaseModel):
    model: str
    prompt: str
    config: dict

@web_app.post("/predict")
async def predict(request: PredictRequest):
    """API endpoint for model prediction"""
    try:
        # Call Modal function asynchronously
        output = await generate_text.remote.aio(
            request.model,
            request.prompt,
            request.config
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@web_app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "models": list(MODEL_REPOS.keys())}

# Deploy FastAPI app on Modal
@app.function(
    image=image,
    timeout=600,
    scaledown_window=300,
)
@modal.asgi_app()
def fastapi_app():
    return web_app
