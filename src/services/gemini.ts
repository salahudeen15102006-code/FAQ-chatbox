import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are a helpful FAQ assistant for a modern web application. 
Your goal is to provide concise, accurate, and friendly answers to user questions.
If you don't know the answer, politely suggest they contact support at support@example.com.
Keep your responses brief and helpful.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}
