import { NextResponse } from "next/server";

const TIMEOUT_MS = 120000;

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
};

const post = (url: string, payload: unknown, signal: AbortSignal) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]),
  });

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { output: text };
  }
}

interface ProxyOptions {
  /** Modal web endpoint base URLs, tried in order. */
  bases: string[];
  payload: unknown;
  stream: boolean;
  signal: AbortSignal;
  /** Maps a successful /predict JSON body to the response sent to the browser. */
  mapPredict: (data: Record<string, unknown>) => Record<string, unknown>;
}

/**
 * Forwards a request to the first healthy Modal workspace.
 * With `stream`, it pipes `/stream` server-sent events straight through; a workspace still on a
 * deployment without `/stream` falls back to `/predict` and returns JSON.
 */
export async function proxyToModal({ bases, payload, stream, signal, mapPredict }: ProxyOptions) {
  let lastError: Error | null = null;

  for (const base of bases) {
    try {
      if (stream) {
        const response = await post(`${base}/stream`, payload, signal);
        if (response.ok && response.body) {
          return new Response(response.body, { headers: SSE_HEADERS });
        }
        // Modal's own 404s (disabled workspace, app not deployed) mean try the next workspace;
        // a plain FastAPI 404 means this deployment just predates /stream.
        const body = await response.text().catch(() => "");
        if (response.status !== 404 || body.includes("modal-http")) {
          lastError = new Error(`HTTP ${response.status} from ${base}/stream: ${body.slice(0, 200)}`);
          console.error(lastError.message);
          continue;
        }
      }

      const response = await post(`${base}/predict`, payload, signal);
      if (response.ok) {
        return NextResponse.json(mapPredict(await readJson(response)));
      }
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`API error from ${base}:`, response.status, errorText);
      lastError = new Error(`HTTP ${response.status}: ${errorText}`);
    } catch (error) {
      if (signal.aborted) {
        return new Response(null, { status: 499 });
      }
      lastError = error as Error;
      console.error(`Error fetching from ${base}:`, error);
    }
  }

  return NextResponse.json(
    { error: "All API endpoints failed", details: lastError?.message },
    { status: 500 }
  );
}

// Modal workspaces with the SabiYarn apps deployed, in failover order
export const MODAL_WORKSPACES = ["sabiyarn1", "sabiyarn2", "model-host", "ottobiz"];

/** Base URL of a Modal ASGI app: https://{workspace}--{app}-{function}.modal.run */
export const modalBases = (app: string, fn = "fastapi-app") =>
  MODAL_WORKSPACES.map((workspace) => `https://${workspace}--${app}-${fn}.modal.run`);
