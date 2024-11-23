import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);

export async function POST(req) {
  try {
    const { message, fileData } = await req.json();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are Visivo, an intelligent AI designed to analyze and interpret a wide variety of file types, including " +
        "documents, audio files, videos, and images. When a user uploads a file, your task is to process the content " +
        "thoroughly and provide clear, accurate, and meaningful insights tailored to the file's format and the user's " +
        "intent. Respond in a professional and approachable tone, ensuring your explanations are easy to understand. " +
        "Your goal is to assist users with detailed analysis, extracting key information, and offering valuable " +
        "context for their uploaded files. Adapt your responses to suit the file type and user needs effectively.",
    });

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
