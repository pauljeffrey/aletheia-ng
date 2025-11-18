import { NextRequest, NextResponse } from "next/server";

// Modal endpoint URLs for capable models
// Format: https://{workspace}--sabiyarn-capable-fastapi-app.modal.run/
// Note: User confirmed capable models use root path
const WORKSPACES = ["naijaai", "model-host", "pauljeffrey"];
const API_URLS = WORKSPACES.map(
  (workspace) => `https://${workspace}--sabiyarn-capable-fastapi-app.modal.run/`
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, sessionId } = body;

    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Model and messages are required" },
        { status: 400 }
      );
    }

    const payload = {
      model: model,
      messages: messages,
      session_id: sessionId,
    };

    // Try each API URL until one succeeds
    let lastError: Error | null = null;
    for (const url of API_URLS) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            output: data.output || data.response || "",
            sessionName: data.session_name || data.sessionName || "New Chat",
          });
        }
      } catch (error) {
        lastError = error as Error;
        console.error(`Error fetching from ${url}:`, error);
        continue;
      }
    }

    // If all URLs failed, return error
    return NextResponse.json(
      { error: "All API endpoints failed", details: lastError?.message },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error in capable models API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

