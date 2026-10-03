"""
Modal script for deploying pretrained/finetuned SabiYarn models
Deploy to different workspaces: naijaai, pauljeffrey, model-host

Endpoints (served by `fastapi_app`):
  POST /predict  -> {"output": "..."}                (whole response at once)
  POST /stream   -> text/event-stream of JSON events (token-by-token)
                    {"type": "delta", "text": "..."}
                    {"type": "done", "output": "..."}
                    {"type": "error", "message": "..."}
  GET  /health
"""

import json
import re
import threading
from typing import Dict, Iterator

import modal

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
    .env({"HF_HOME": "/cache/huggingface"})
)

# Persist downloaded weights across cold starts
hf_cache = modal.Volume.from_name("sabiyarn-hf-cache", create_if_missing=True)

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
DEFAULT_MODEL = "sabiyarn-125m"
END_OF_TOKEN_ID = 32

CLEANUP_PATTERN = re.compile(
    r"\|(end_f_text|end_of_text|end_ofext|end_of_text_|end_of_te|end_o|end_of_tet|end_oftext)|:|`"
)
# A partial "|end_of_text" marker can arrive split across chunks; hold back
# anything after a trailing "|" until it is long enough to be ruled out.
MAX_MARKER_LEN = 16


def clean_output(text: str) -> str:
    return CLEANUP_PATTERN.sub("", text).strip()


# Some finetuned models emit only a ":" marker and stop under greedy/sampled decoding;
# beam search gets past it, so it's used as a fallback when a reply comes out empty.
BEAM_FALLBACK = {"numBeams": 5, "doSample": False}


def build_gen_config(config: dict) -> dict:
    return {
        "max_length": int(config.get("maxLength", 100)),
        "max_new_tokens": int(config.get("maxNewTokens", 80)),
        "num_beams": max(1, int(config.get("numBeams", 1))),
        "do_sample": bool(config.get("doSample", True)),
        "temperature": float(config.get("temperature", 0.99)),
        "top_k": int(config.get("topK", 15)),
        "top_p": float(config.get("topP", 0.95)),
        "repetition_penalty": float(config.get("repetitionPenalty", 4.0)),
        "length_penalty": float(config.get("lengthPenalty", 3.0)),
        "early_stopping": True,
        "eos_token_id": END_OF_TOKEN_ID,
    }


@app.cls(
    image=image,
    gpu="T4",
    timeout=600,
    scaledown_window=300,
    volumes={"/cache": hf_cache},
)
class SabiYarn:
    @modal.enter()
    def load(self):
        import torch
        from transformers import AutoTokenizer

        self.torch = torch
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_REPOS[DEFAULT_MODEL], trust_remote_code=True)
        self.models = {}
        self.lock = threading.Lock()
        # Warm the most-used model so the first request doesn't pay for it
        self._get_model(DEFAULT_MODEL)
        hf_cache.commit()

    def _get_model(self, model_id: str):
        from transformers import AutoModelForCausalLM

        model_id = model_id if model_id in MODEL_REPOS else DEFAULT_MODEL
        with self.lock:
            if model_id not in self.models:
                model = AutoModelForCausalLM.from_pretrained(MODEL_REPOS[model_id], trust_remote_code=True)
                self.models[model_id] = model.to(self.device).eval()
        return self.models[model_id]

    def _input_ids(self, prompt: str):
        return self.tokenizer(prompt, return_tensors="pt")["input_ids"].to(self.device)

    def _generate_text(self, model_id: str, prompt: str, config: dict) -> str:
        model = self._get_model(model_id)
        input_ids = self._input_ids(prompt)
        with self.torch.no_grad():
            output = model.generate(input_ids, **build_gen_config(config))
        new_tokens = output[0, input_ids.shape[-1]:]
        text = clean_output(self.tokenizer.decode(new_tokens, skip_special_tokens=True))
        if not text and int(config.get("numBeams", 1)) <= 1:
            return self._generate_text(model_id, prompt, {**config, **BEAM_FALLBACK})
        return text

    @modal.method()
    def generate(self, model_id: str, prompt: str, config: dict) -> str:
        return self._generate_text(model_id, prompt, config)

    @modal.method(is_generator=True)
    def stream(self, model_id: str, prompt: str, config: dict) -> Iterator[str]:
        """Yield cleaned text deltas as the model produces tokens."""
        from transformers import StoppingCriteria, StoppingCriteriaList, TextIteratorStreamer

        gen_config = build_gen_config(config)

        # HF streamers don't support beam search; emit the finished text in one piece.
        if gen_config["num_beams"] > 1:
            yield self._generate_text(model_id, prompt, config)
            return

        model = self._get_model(model_id)
        input_ids = self._input_ids(prompt)
        streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, skip_special_tokens=True, timeout=120)
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
                        **gen_config,
                    )
            except Exception as e:  # surface errors to the consumer instead of hanging
                error.append(e)
                streamer.end()

        thread = threading.Thread(target=run, daemon=True)
        thread.start()

        raw, sent = "", ""
        try:
            for chunk in streamer:
                raw += chunk
                pipe = raw.rfind("|")
                stable = raw[:pipe] if pipe != -1 and len(raw) - pipe < MAX_MARKER_LEN else raw
                safe = clean_output(stable)
                if safe.startswith(sent) and len(safe) > len(sent):
                    yield safe[len(sent):]
                    sent = safe
            final = clean_output(raw)
            if final.startswith(sent) and len(final) > len(sent):
                yield final[len(sent):]
                sent = final
        finally:
            cancelled.set()
            thread.join(timeout=5)

        if error:
            raise error[0]
        if not sent:
            yield self._generate_text(model_id, prompt, {**config, **BEAM_FALLBACK})


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

    web_app = FastAPI(title="SabiYarn Pretrained Models API")

    class PredictRequest(BaseModel):
        model: str
        prompt: str
        config: dict

    @web_app.post("/predict")
    async def predict(request: PredictRequest):
        """API endpoint for model prediction"""
        try:
            output = await SabiYarn().generate.remote.aio(request.model, request.prompt, request.config)
            return {"output": output}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @web_app.post("/stream")
    async def stream(request: PredictRequest):
        """Server-sent events stream of generated text"""

        async def events():
            output = ""
            try:
                async for delta in SabiYarn().stream.remote_gen.aio(request.model, request.prompt, request.config):
                    output += delta
                    yield sse({"type": "delta", "text": delta})
                yield sse({"type": "done", "output": output})
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
        return {"status": "healthy", "models": list(MODEL_REPOS.keys())}

    return web_app
