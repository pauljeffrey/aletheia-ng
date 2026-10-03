import { NextRequest, NextResponse } from "next/server";
import { modalBases, proxyToModal } from "@/lib/modal-proxy";

export const dynamic = "force-dynamic";

// Routes: /predict (JSON) and /stream (server-sent events)
const API_BASES = modalBases("sabiyarn-capable");

const ROLES = new Set(["system", "user", "assistant"]);

const sanitizeNumber = (value: unknown, fallback: number) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const buildConfig = (config: Record<string, unknown> | undefined) => ({
  maxNewTokens: Math.round(sanitizeNumber(config?.maxNewTokens, 256)),
  temperature: sanitizeNumber(config?.temperature, 0.7),
  topP: sanitizeNumber(config?.topP, 0.95),
  topK: Math.round(sanitizeNumber(config?.topK, 15)),
  repetitionPenalty: sanitizeNumber(config?.repetitionPenalty, 1.1),
  doSample: typeof config?.doSample === "string" ? config.doSample === "true" : config?.doSample ?? true,
});

export async function POST(request: NextRequest) {
  try {
    const { model, messages, sessionId, config, stream } = await request.json();

    if (!model || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Model and messages are required" }, { status: 400 });
    }

    const cleanMessages = messages
      .filter((m: { role?: unknown; content?: unknown }) => ROLES.has(String(m?.role)) && typeof m?.content === "string")
      .map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }));

    return await proxyToModal({
      bases: API_BASES,
      payload: { model, messages: cleanMessages, session_id: sessionId, config: buildConfig(config) },
      stream: Boolean(stream),
      signal: request.signal,
      mapPredict: (data) => ({
        output: data.output || data.response || "",
        sessionName: data.session_name || data.sessionName || "New Chat",
      }),
    });
  } catch (error) {
    console.error("Error in capable models API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
