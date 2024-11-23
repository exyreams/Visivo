import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role,
        parts: msg.content,
      })),
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content,
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 },
    );
  }
}
