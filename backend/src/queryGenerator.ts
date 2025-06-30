import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CollectionInfo {
  name: string;
  fields: string[];
  sampleDocuments?: any[];
}

export const generateMongoQuery = async (
  question: string,
  collections: CollectionInfo[]
): Promise<{ collection: string; query: any; projection?: any }> => {
  const collectionsInfo = collections
    .map(
      (col) =>
        `Collection: ${col.name}\nFields: ${col.fields.join(", ")}\n${
          col.sampleDocuments
            ? `Sample documents: ${JSON.stringify(
                col.sampleDocuments,
                null,
                2
              )}`
            : ""
        }`
    )
    .join("\n\n");

  const prompt = `
You are a MongoDB query generator. Based on the user's question and the available collections, generate a MongoDB query to retrieve relevant data.

Available collections:
${collectionsInfo}

User question: "${question}"

Generate a MongoDB query that will retrieve the most relevant data to answer this question. Return your response as a JSON object with the following structure:
{
  "collection": "collection_name",
  "query": { /* MongoDB query object */ },
  "projection": { /* MongoDB projection object - optional */ }
}

Focus on:
1. Choosing the most relevant collection
2. Creating a query that filters for relevant data
3. Using appropriate MongoDB operators like $text, $regex, $in, etc. for text search
4. Limiting results if needed

Response (JSON only):
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const response = completion.choices[0].message?.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const queryData = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    if (!queryData.collection || !queryData.query) {
      throw new Error("Invalid query structure returned from OpenAI");
    }

    return {
      collection: queryData.collection,
      query: queryData.query,
      projection: queryData.projection || {},
    };
  } catch (error) {
    console.error("Error generating MongoDB query:", error);
    throw new Error("Failed to generate MongoDB query");
  }
};
