
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface HabitRecommendation {
  habit: string;
  reason: string;
}

export const getHabitRecommendations = async (goal: string): Promise<HabitRecommendation[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 small, atomic habits for someone with the goal: "${goal}". Focus on daily, consistent actions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              habit: { type: Type.STRING },
              reason: { type: Type.STRING },
            },
            required: ["habit", "reason"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
