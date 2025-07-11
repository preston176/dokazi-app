import { GoogleGenAI } from "@google/genai";

export async function genAIModel(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.5-flash-lite-preview-06-17";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Based on this ${prompt} I want you to improve and return a similar string.Don't use markdown. Don't add fluff just the response and preserve the stuff in the prompt like names, email, dates etc. for placeholders retain the placeholders`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text;
    }
  }
  return fullText.trim();
}
