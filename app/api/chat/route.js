import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);

export async function POST(req) {
  try {
    const { message, fileData } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const content = [{ text: message }];

    // If file is provided, add file handling logic
    if (fileData) {
      content.unshift({
        inlineData: {
          mimeType: fileData.mimeType,
          data: fileData.data,
        },
      });
    }

    // Use streaming for faster response
    const result = await model.generateContentStream(content);

    // Create a ReadableStream to send chunks back to the client
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(chunkText);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
