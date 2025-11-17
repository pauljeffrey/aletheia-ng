import { NextRequest, NextResponse } from "next/server";

// Modal endpoint URLs for pretrained models
// Format: https://{workspace}--sabiyarn-fastapi-app-fastapi-app.modal.run/predict
const WORKSPACES = ["naijaai", "model-host", "pauljeffrey"];
const API_URLS = WORKSPACES.map(
  (workspace) =>
    `https://${workspace}--sabiyarn-fastapi-app-fastapi-app.modal.run/predict`
);
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

    // Convert config values to proper types (handle both string and number inputs)
    const payload = {
      model: model,
      prompt: prompt,
      config: {
        maxLength: typeof config?.maxLength === "string" 
          ? parseInt(config.maxLength, 10) 
          : (config?.maxLength || 100),
        maxNewTokens: typeof config?.maxNewTokens === "string"
          ? parseInt(config.maxNewTokens, 10)
          : (config?.maxNewTokens || 80),
        numBeams: typeof config?.numBeams === "string"
          ? parseInt(config.numBeams, 10)
          : (config?.numBeams || 5),
        doSample: typeof config?.doSample === "string"
          ? config.doSample === "true"
          : (config?.doSample || false),
        temperature: typeof config?.temperature === "string"
          ? parseFloat(config.temperature)
          : (config?.temperature || 0.99),
        topK: typeof config?.topK === "string"
          ? parseInt(config.topK, 10)
          : (config?.topK || 50),
        topP: typeof config?.topP === "string"
          ? parseFloat(config.topP)
          : (config?.topP || 0.95),
        repetitionPenalty: typeof config?.repetitionPenalty === "string"
          ? parseFloat(config.repetitionPenalty)
          : (config?.repetitionPenalty || 4.0),
        lengthPenalty: typeof config?.lengthPenalty === "string"
          ? parseFloat(config.lengthPenalty)
          : (config?.lengthPenalty || 3.0),
        earlyStopping: true,
        eosTokenId: 32,
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

