import { NextRequest, NextResponse } from "next/server";

// Modal endpoint URLs - verify these match your actual deployments
// Get exact URLs from: modal app show sabiyarn-fastapi-app
// Or click "Web endpoint" in Modal dashboard
const API_URLS = [
  "https://naijaai--sabiyarn-fastapi-app-fastapi-app.modal.run/predict",
  "https://model-host--sabiyarn-fastapi-app-fastapi-app.modal.run/predict",
  "https://pauljeffrey--sabiyarn-fastapi-app-fastapi-app.modal.run/predict",
];
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, prompt, config } = body;

    if (!model || !prompt) {
      return NextResponse.json(
        { error: "Model and prompt are required" },
        { status: 400 }
      );
    }

    const payload = {
      model: model,
      prompt: prompt,
      config: {
        maxLength: config.maxLength || 100,
        maxNewTokens: config.maxNewTokens || 80,
        numBeams: config.numBeams || 5,
        doSample: config.doSample || false,
        temperature: config.temperature || 0.99,
        topK: config.topK || 50,
        topP: config.topP || 0.95,
        repetitionPenalty: config.repetitionPenalty || 4.0,
        lengthPenalty: config.lengthPenalty || 3.0,
        earlyStopping: true,
      },
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
          signal: AbortSignal.timeout(120000), // 2 minute timeout
        });

        if (response.ok) {
          try {
            const data = await response.json();
            return NextResponse.json({ 
              output: data.output || data.response || "No response generated" 
            });
          } catch (jsonError) {
            // If response is not JSON, try as text
            const textData = await response.text();
            return NextResponse.json({ 
              output: textData || "No response generated" 
            });
          }
        } else {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error(`API error from ${url}:`, response.status, errorText);
          lastError = new Error(`HTTP ${response.status}: ${errorText}`);
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
    console.error("Error in pretrained models API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

