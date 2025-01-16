import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const action = formData.get("action");

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    if (!allowedMimeTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Unsupported image type" },
        { status: 400 },
      );
    }

    const bytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(bytes);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are Visivo, an advanced AI model specializing in image analysis. When a user uploads an image, your role" +
        " is to thoroughly analyze the visual content and provide clear, accurate, and professional insights. " +
        "Always respond in a concise yet informative manner, tailored to the user's needs. If additional details " +
        "or context are required, explain your findings in a way that is easy to understand, while maintaining a " +
        "professional tone. Your goal is to assist users effectively and reliably in understanding the content and " +
        "significance of their images.",
    });

    const prompt =
      "Analyze this image and provide a detailed and accurate description.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: image.type,
        },
      },
    ]);

    const response = await result.response;
    const description = response.text();

    if (action === "synthesize") {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY,
        process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION,
      );
      speechConfig.speechSynthesisLanguage = "en-US";
      speechConfig.speechSynthesisVoiceName =
        "en-US-AlloyTurboMultilingualNeural";

      return new Promise((resolve, reject) => {
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
        synthesizer.speakTextAsync(
          description,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              resolve(
                new NextResponse(result.audioData, {
                  headers: {
                    "Content-Type": "audio/wav",
                    "Content-Length": result.audioData.byteLength.toString(),
                  },
                }),
              );
            } else {
              reject(
                new Error(
                  `Speech synthesis canceled, reason = ${result.errorDetails}`,
                ),
              );
            }
            synthesizer.close();
          },
          (error) => {
            reject(new Error(`Error: ${error}`));
            synthesizer.close();
          },
        );
      });
    } else {
      return NextResponse.json({ description });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
