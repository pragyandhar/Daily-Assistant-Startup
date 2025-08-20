import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt, 
      model = "dall-e-3",
      size = "1024x1024",
      quality = "standard",
      useCustomApi = false, 
      customApiKey 
    } = await request.json();

    console.log("Received image generation request:", { prompt, model, size, quality, useCustomApi });

    if (!prompt || typeof prompt !== 'string') {
      return new Response("Invalid prompt", { status: 400 });
    }

    // Determine which API key to use
    let apiKey: string;
    if (useCustomApi && customApiKey) {
      apiKey = customApiKey;
      console.log("Using custom API key for image generation");
    } else {
      apiKey = process.env.OPENAI_API_KEY || "";
      if (!apiKey) {
        console.error("No API key configured for image generation");
        return new Response("API key not configured", { status: 500 });
      }
      console.log("Using server OpenAI API key for image generation");
    }

    // Call OpenAI's DALL-E API
    const requestBody: any = {
      model: model,
      prompt: prompt,
      n: 1,
      size: size,
      response_format: "url"
    };

    // Only add quality parameter for DALL-E 3
    if (model === "dall-e-3") {
      requestBody.quality = quality;
    }

    console.log("Making request to OpenAI with body:", requestBody);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI DALL-E API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        model,
        useCustomApi,
      });
      return new Response(`Failed to generate image: ${response.statusText}`, { 
        status: response.status 
      });
    }

    const result = await response.json();
    
    if (result.data && result.data.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        imageUrl: result.data[0].url,
        revisedPrompt: result.data[0].revised_prompt || prompt
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("No image generated", { status: 500 });
    }

  } catch (error) {
    console.error("Image generation API error:", error);
    return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500 
    });
  }
}
