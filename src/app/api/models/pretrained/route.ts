import { NextRequest, NextResponse } from "next/server";
import { modalBases, proxyToModal } from "@/lib/modal-proxy";

export const dynamic = "force-dynamic";

// Routes: /predict (JSON) and /stream (server-sent events)
const API_BASES = modalBases("sabiyarn-fastapi-app");

type RawConfig = Record<string, unknown> | undefined;

const toInt = (value: unknown, fallback: number) => {
  const n = typeof value === "string" ? parseInt(value, 10) : Number(value);
  return Number.isFinite(n) ? Math.round(n) : fallback;
};

const toFloat = (value: unknown, fallback: number) => {
  const n = typeof value === "string" ? parseFloat(value) : Number(value);
  return Number.isFinite(n) && n !== 0 ? n : fallback;
};

const toBool = (value: unknown, fallback: boolean) =>
  typeof value === "string" ? value === "true" : typeof value === "boolean" ? value : fallback;

const buildConfig = (config: RawConfig) => ({
  maxLength: toInt(config?.maxLength, 100),
  maxNewTokens: toInt(config?.maxNewTokens, 80),
  numBeams: toInt(config?.numBeams, 1),
  doSample: toBool(config?.doSample, true),
  temperature: toFloat(config?.temperature, 0.99),
  topK: toInt(config?.topK, 15),
  topP: toFloat(config?.topP, 0.95),
  // Penalties must always be sent as floats
  repetitionPenalty: toFloat(config?.repetitionPenalty, 4.0),
  lengthPenalty: toFloat(config?.lengthPenalty, 3.0),
  earlyStopping: true,
  eosTokenId: 32,
});

export async function POST(request: NextRequest) {
  try {
    const { model, prompt, config, stream } = await request.json();

    if (!model || !prompt) {
      return NextResponse.json({ error: "Model and prompt are required" }, { status: 400 });
    }

    return await proxyToModal({
      bases: API_BASES,
      payload: { model, prompt, config: buildConfig(config) },
      stream: Boolean(stream),
      signal: request.signal,
      mapPredict: (data) => ({ output: data.output || data.response || "No response generated" }),
    });
  } catch (error) {
    console.error("Error in pretrained models API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
