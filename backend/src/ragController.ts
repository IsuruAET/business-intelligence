import OpenAI from "openai";
import { Request, Response } from "express";
import { mockData } from "./fakeDatabase";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleQuestion = async (req: Request, res: Response) => {
  const { question } = req.body;

  const context = mockData.map((item) => item.content).join("\n");

  const prompt = `
Answer the question based on the context below:
Context: ${context}
Question: ${question}
Answer:
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = completion.choices[0].message?.content;
    res.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get answer." });
  }
};
