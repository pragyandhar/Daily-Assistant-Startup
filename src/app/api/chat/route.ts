import { NextRequest } from "next/server";
import { ChatCompletionRequest, APIMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { 
      messages, 
      model = "GPT-4", 
      useCustomApi = false, 
      customApiKey 
    }: ChatCompletionRequest & { 
      model?: string; 
      useCustomApi?: boolean; 
      customApiKey?: string 
    } = await request.json();

    console.log("Received model:", model);
    console.log("Use custom API:", useCustomApi);

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    // Determine which API key to use
    let apiKey: string;
    if (useCustomApi && customApiKey) {
      apiKey = customApiKey;
      console.log("Using custom API key");
    } else {
      apiKey = process.env.OPENAI_API_KEY || "";
      if (!apiKey) {
        console.error("No API key configured");
        return new Response("API key not configured", { status: 500 });
      }
      console.log("Using server OpenAI API key");
    }

    // Convert messages to the format expected by the API
    const apiMessages: APIMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Map frontend model names to actual API model names
    const modelMap: { [key: string]: string } = {
      "GPT-5": "gpt-4o-mini", // Forced to GPT-5 Nano for testing
      "GPT-5 Mini": "gpt-4o-mini", // Forced to GPT-5 Nano for testing
      "GPT-5 Nano": "gpt-4o-mini", // Forced to GPT-5 Nano for testing
      "GPT-4": "gpt-4o-mini", // Forced to GPT-5 Nano for testing
      "GPT-4 Mini": "gpt-4o-mini", // Forced to GPT-5 Nano for testing
      "DALL-E": "gpt-4o-mini" // Forced to GPT-5 Nano for testing
    };

    // FORCE ALL MODELS TO USE GPT-5 NANO (gpt-4o-mini) FOR TESTING
    const actualModel = "gpt-4o-mini";
    console.log("Using actual model:", actualModel, "(FORCED GPT-5 Nano for testing)");

    // For this example, we'll use OpenAI's API format
    // You can replace this with any other LLM provider
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: actualModel,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        model: actualModel,
        useCustomApi,
      });
      return new Response(`Failed to get AI response: ${response.statusText}`, { 
        status: response.status 
      });
    }

    // Create a readable stream for Server-Sent Events
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        try {
          let buffer = "";
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            
            // Keep the last incomplete line in buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  
                  if (content) {
                    const sseData = JSON.stringify({ content });
                    controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));
                  }
                } catch (parseError) {
                  // Skip invalid JSON
                  continue;
                }
              }
            }
          }
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500 
    });
  }
}
