import { GoogleGenerativeAI } from "@google/generative-ai";

export async function callAI(prompt: string): Promise<any> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // If no API key, use fallback mock data for development
  if (!apiKey) {
    console.warn("No VITE_GEMINI_API_KEY found, using mock data");
    return {
      questions: [
        {
          id: "mock-1",
          text: "What is the capital of France?",
          options: [
            { id: "o1", text: "London" },
            { id: "o2", text: "Paris" },
            { id: "o3", text: "Berlin" },
            { id: "o4", text: "Madrid" }
          ],
          correctOptionId: "o2"
        },
        {
          id: "mock-2", 
          text: "Which planet is known as the Red Planet?",
          options: [
            { id: "o1", text: "Venus" },
            { id: "o2", text: "Mars" },
            { id: "o3", text: "Jupiter" },
            { id: "o4", text: "Saturn" }
          ],
          correctOptionId: "o2"
        }
      ]
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


  const result = await model.generateContent(prompt);
  const content = result.response.text();

  try {
    // Remove markdown code block wrappers if present
    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  
    return JSON.parse(clean);
  } catch (err) {
    throw new Error("AI response was not valid JSON: " + content);
  }
}
