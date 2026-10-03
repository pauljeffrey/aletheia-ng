"""
Modal script for deploying capable (chat) SabiYarn models
Deploy to different workspaces: modal deploy capable_model.py

Endpoints (served by `fastapi_app`):
  POST /predict  -> {"output": "...", "session_name": "..."}   (whole response at once)
  POST /         -> alias of /predict
  POST /stream   -> text/event-stream of JSON events (token-by-token)
                    {"type": "delta", "text": "..."}
                    {"type": "done", "output": "...", "session_name": "..."}
                    {"type": "error", "message": "..."}
  GET  /health
"""

import json
import threading
from typing import Any, Dict, Iterator, List, Optional

import modal

# Create Modal app
app = modal.App("sabiyarn-capable")

# The chat models' remote code targets newer transformers than the pretrained models
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch==2.5.1",
        "transformers==4.57.1",
        "safetensors>=0.4.3",
        "fastapi==0.115.6",
        "pydantic==2.10.4",
    )
    .env({"HF_HOME": "/cache/huggingface"})
)

# Persist downloaded weights across cold starts
hf_cache = modal.Volume.from_name("sabiyarn-hf-cache", create_if_missing=True)

# Model repository mapping for capable models
CAPABLE_MODEL_REPOS: Dict[str, str] = {
    "sabiyarn-moe-280m": "Aletheia-ng/SabiYarn_MoE-280M",
    "sabiyarn-32k": "BeardedMonster/sabiyarn-32k",
}
DEFAULT_MODEL = "sabiyarn-moe-280m"

END_OF_TEXT_ID = 32  # "|end_of_text|"; "</s>" (the chat template's turn end) is added at load time
MAX_PROMPT_TOKENS = 4096
ALLOWED_ROLES = {"system", "user", "assistant"}


def build_gen_config(config: Optional[Dict[str, Any]]) -> dict:
    cfg = config or {}
    return {
        "max_new_tokens": max(1, int(cfg.get("maxNewTokens", 256))),
        "do_sample": bool(cfg.get("doSample", True)),
        "temperature": max(0.01, float(cfg.get("temperature", 0.7))),
        "top_k": max(1, int(cfg.get("topK", 15))),
        "top_p": min(1.0, max(0.01, float(cfg.get("topP", 0.95)))),
        "repetition_penalty": float(cfg.get("repetitionPenalty", 1.1)),
    }


def session_name(messages: List[Dict[str, str]]) -> str:
    first = next((m["content"] for m in messages if m.get("role") == "user"), "").strip()
    if not first:
        return "New Chat"
    return first[:40].rstrip() + ("…" if len(first) > 40 else "")


@app.cls(
    image=image,
    gpu="T4",
    timeout=600,
    scaledown_window=300,
    volumes={"/cache": hf_cache},
)
class SabiYarnChat:
    @modal.enter()
    def load(self):
        import torch

        self.torch = torch
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.loaded = {}
        self.lock = threading.Lock()
        # Warm the default model so the first request doesn't pay for it
        self._get(DEFAULT_MODEL)
        hf_cache.commit()

    def _get(self, model_id: str):
        from transformers import AutoModelForCausalLM, AutoTokenizer

        if model_id not in CAPABLE_MODEL_REPOS:
            raise ValueError(f"Unknown model '{model_id}'. Available: {', '.join(CAPABLE_MODEL_REPOS)}")
        with self.lock:
            if model_id not in self.loaded:
                repo = CAPABLE_MODEL_REPOS[model_id]
                tokenizer = AutoTokenizer.from_pretrained(repo, trust_remote_code=True)
                model = AutoModelForCausalLM.from_pretrained(repo, trust_remote_code=True)
                self.loaded[model_id] = (tokenizer, model.to(self.device).eval())
        return self.loaded[model_id]

    def _prepare(self, model_id: str, messages: List[Dict[str, str]], config: Optional[Dict[str, Any]]):
        tokenizer, model = self._get(model_id)

        chat = [
            {"role": m["role"], "content": str(m.get("content", ""))}
            for m in messages
            if m.get("role") in ALLOWED_ROLES and str(m.get("content", "")).strip()
        ]
        if not chat or chat[-1]["role"] != "user":
            raise ValueError("The conversation must end with a user message")

        def encode(msgs):
            return tokenizer.apply_chat_template(msgs, add_generation_prompt=True, return_tensors="pt")

        # Drop the oldest turns (keeping any system prompt) until the prompt fits
        input_ids = encode(chat)
        while input_ids.shape[-1] > MAX_PROMPT_TOKENS and len(chat) > 1:
            drop = 1 if chat[0]["role"] == "system" and len(chat) > 2 else 0
            chat.pop(drop)
            input_ids = encode(chat)
        input_ids = input_ids[:, -MAX_PROMPT_TOKENS:].to(self.device)

        eos_ids = sorted({i for i in (tokenizer.eos_token_id, END_OF_TEXT_ID) if i is not None})
        gen_kwargs = {
            **build_gen_config(config),
            "attention_mask": self.torch.ones_like(input_ids),
            "eos_token_id": eos_ids,
            "pad_token_id": tokenizer.pad_token_id if tokenizer.pad_token_id is not None else eos_ids[0],
        }
        return tokenizer, model, input_ids, gen_kwargs

    def _complete(self, model_id, messages, config) -> str:
        tokenizer, model, input_ids, gen_kwargs = self._prepare(model_id, messages, config)
        with self.torch.no_grad():
            output = model.generate(input_ids, **gen_kwargs)
        return tokenizer.decode(output[0, input_ids.shape[-1]:], skip_special_tokens=True).strip()

    @modal.method()
    def chat(self, model_id: str, messages: List[Dict[str, str]], config: Optional[Dict[str, Any]] = None) -> str:
        return self._complete(model_id, messages, config)

    @modal.method(is_generator=True)
    def stream(
        self, model_id: str, messages: List[Dict[str, str]], config: Optional[Dict[str, Any]] = None
    ) -> Iterator[str]:
        """Yield text deltas as the model produces tokens (new text only, no prompt)."""
        from transformers import StoppingCriteria, StoppingCriteriaList, TextIteratorStreamer

        tokenizer, model, input_ids, gen_kwargs = self._prepare(model_id, messages, config)
        streamer = TextIteratorStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True, timeout=120)
        cancelled = threading.Event()

        class StopOnCancel(StoppingCriteria):
            def __call__(self, *args, **kwargs) -> bool:
                return cancelled.is_set()

        error: list = []

        def run():
            try:
                with self.torch.no_grad():
                    model.generate(
                        input_ids,
                        streamer=streamer,
                        stopping_criteria=StoppingCriteriaList([StopOnCancel()]),
                        **gen_kwargs,
                    )
            except Exception as e:  # surface errors to the consumer instead of hanging
                error.append(e)
                streamer.end()

        thread = threading.Thread(target=run, daemon=True)
        thread.start()

        started = False
        try:
            for chunk in streamer:
                if not started:
                    chunk = chunk.lstrip()
                    started = bool(chunk)
                if chunk:
                    yield chunk
        finally:
            cancelled.set()
            thread.join(timeout=5)

        if error:
            raise error[0]


def sse(payload: dict) -> str:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


# Deploy FastAPI app on Modal
@app.function(
    image=image,
    timeout=600,
    scaledown_window=300,
)
@modal.asgi_app()
def fastapi_app():
    # FastAPI is imported inside the container so deploying needs no local web dependencies
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import StreamingResponse
    from pydantic import BaseModel

    web_app = FastAPI(title="SabiYarn Capable Models API")

    class ChatRequest(BaseModel):
        model: Optional[str] = None
        messages: List[Dict[str, Any]]
        session_id: Optional[str] = None
        config: Optional[Dict[str, Any]] = None

    def resolve_model(model: Optional[str]) -> str:
        model_id = model or DEFAULT_MODEL
        if model_id not in CAPABLE_MODEL_REPOS:
            raise HTTPException(
                status_code=404,
                detail=f"Unknown model '{model_id}'. Available: {', '.join(CAPABLE_MODEL_REPOS)}",
            )
        return model_id

    @web_app.post("/")
    @web_app.post("/predict")
    async def predict(request: ChatRequest):
        """API endpoint for chat prediction"""
        model_id = resolve_model(request.model)
        try:
            output = await SabiYarnChat().chat.remote.aio(model_id, request.messages, request.config)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        return {"output": output, "session_name": session_name(request.messages)}

    @web_app.post("/stream")
    async def stream(request: ChatRequest):
        """Server-sent events stream of the assistant's reply"""
        model_id = resolve_model(request.model)

        async def events():
            output = ""
            try:
                async for delta in SabiYarnChat().stream.remote_gen.aio(model_id, request.messages, request.config):
                    output += delta
                    yield sse({"type": "delta", "text": delta})
                yield sse({"type": "done", "output": output.strip(), "session_name": session_name(request.messages)})
            except Exception as e:
                yield sse({"type": "error", "message": str(e)})

        return StreamingResponse(
            events(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    @web_app.get("/health")
    async def health():
        """Health check endpoint"""
        return {
            "status": "healthy",
            "default_model": DEFAULT_MODEL,
            "models": list(CAPABLE_MODEL_REPOS.keys()),
        }

    return web_app
