import OpenAI from "openai";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase, getDatabase } from "./database";
import { generateMongoQuery } from "./queryGenerator";
import { getCollections } from "./collections";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return;
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();
    const db = getDatabase();
    const collections = getCollections();

    // Generate MongoDB query using OpenAI
    const {
      collection: collectionName,
      query,
      projection,
    } = await generateMongoQuery(question, collections);

    // Execute the generated query
    const collection = db.collection(collectionName);

    let results: any[] = [];

    // Check if query is an aggregation pipeline (array) or a find query (object)
    if (Array.isArray(query)) {
      // Handle aggregation pipeline
      results = await collection.aggregate(query).limit(10).toArray();
    } else {
      // Handle find query
      results = await collection.find(query, projection).limit(10).toArray();
    }

    if (results.length === 0) {
      res.json({
        answer:
          "I couldn't find any relevant information in the database to answer your question.",
        query: { collection: collectionName, query, projection },
        results: [],
      });
      return;
    }

    // Create context from retrieved data
    const context = results
      .map((item) => JSON.stringify(item, null, 2))
      .join("\n\n");

    // Generate answer using OpenAI with retrieved context
    const prompt = `
Answer the question based on the following data retrieved from the database:

Database Results:
${context}

Question: ${question}

Provide a clear and accurate answer based on the data above. If the data doesn't contain enough information to fully answer the question, say so.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const answer = completion.choices[0].message?.content;

    res.json({
      answer,
      query: { collection: collectionName, query, projection },
      results: results.slice(0, 3), // Return first 3 results for debugging
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to process question.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
