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

Generate a MongoDB query that will retrieve the most relevant data to answer this question. 

IMPORTANT RULES:
1. For simple filtering and searching, use a find query (object with filter conditions)
2. For complex operations like grouping, joining, or data transformation, use an aggregation pipeline (array of stages)
3. Use $text search for text-based queries when text indexes are available
4. Use $regex for pattern matching when $text is not suitable
5. For find queries, return: { "query": { filter_object }, "projection": { field_selection } }
6. For aggregation, return: { "query": [ { $match: {...} }, { $project: {...} }, ... ] }

DATE HANDLING:
- For date fields stored as strings (like "2023-01-01"), use $regex to filter by year: { "joinDate": { "$regex": "^2023" } }
- For date range queries, use $gte and $lt: { "joinDate": { "$gte": "2023-01-01", "$lt": "2024-01-01" } }
- For counting by date ranges, use aggregation with $match and $count

SPECIAL HANDLING FOR SALES ANALYSIS:
- For questions about "best selling", "top products", "sales by category", use aggregation pipelines
- Join orders with products using $lookup when you need product details
- Use $unwind to flatten arrays (like products array in orders)
- Use $group to aggregate by category, product, etc.
- Use $sort to order by sales metrics
- Use $limit to get top results

Return your response as a JSON object with the following structure:
{
  "collection": "collection_name",
  "query": { /* MongoDB query object for find() OR array for aggregate() */ },
  "projection": { /* MongoDB projection object - only for find() queries */ }
}

Examples:
- Simple find: { "query": { "category": "electronics" } }
- Text search: { "query": { "$text": { "$search": "laptop" } } }
- Date filtering by year: { "query": { "joinDate": { "$regex": "^2023" } } }
- Count customers by year: { "query": [ { "$match": { "joinDate": { "$regex": "^2023" } } }, { "$count": "total" } ] }
- Sales aggregation: { "query": [ { "$unwind": "$products" }, { "$lookup": { "from": "products", "localField": "products.productId", "foreignField": "_id", "as": "productDetails" } }, { "$group": { "_id": "$productDetails.category", "totalSales": { "$sum": { "$multiply": ["$products.quantity", "$products.price"] } } } }, { "$sort": { "totalSales": -1 } } ] }

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
