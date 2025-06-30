# Business Intelligence RAG API

A RAG (Retrieval-Augmented Generation) system that uses OpenAI to generate MongoDB queries and retrieve relevant data to answer questions.

## Features

- **AI-Generated Queries**: Uses OpenAI to automatically generate MongoDB queries based on user questions
- **MongoDB Integration**: Retrieves data from MongoDB collections
- **Smart Context Retrieval**: Finds the most relevant data to answer questions
- **Multiple Collections**: Supports queries across different data collections

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp env.example .env
```

3. Configure environment variables in `.env`:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017
DB_NAME=business_intelligence
```

4. Seed the database with sample data:

```bash
npm run seed
```

5. Start the development server:

```bash
npm run dev
```

## API Usage

### Ask a Question

**POST** `/api/ask`

Request body:

```json
{
  "question": "What products are available in the electronics category?"
}
```

Response:

```json
{
  "answer": "Based on the database, there are 2 electronics products available: Laptop Pro ($1299.99) and Wireless Mouse ($29.99).",
  "query": {
    "collection": "products",
    "query": { "category": "electronics" },
    "projection": {}
  },
  "results": [
    {
      "_id": "...",
      "name": "Laptop Pro",
      "category": "electronics",
      "price": 1299.99,
      "description": "High-performance laptop for professionals",
      "inStock": true,
      "brand": "TechCorp",
      "tags": ["laptop", "professional", "high-performance"]
    }
  ]
}
```

## Available Collections

The system supports queries on the following collections:

- **products**: Product catalog with name, category, price, description, etc.
- **customers**: Customer information including contact details and preferences
- **orders**: Order history with customer references and order details
- **support_tickets**: Customer support tickets and their status

## How It Works

1. **Question Analysis**: The system receives a user question
2. **Query Generation**: OpenAI analyzes the question and generates an appropriate MongoDB query
3. **Data Retrieval**: The generated query is executed against MongoDB
4. **Context Creation**: Retrieved data is formatted as context
5. **Answer Generation**: OpenAI generates a final answer based on the retrieved context

## Development

### Project Structure

```
src/
├── index.ts              # Server entry point
├── ragController.ts      # Main RAG logic
├── database.ts          # MongoDB connection
├── queryGenerator.ts    # OpenAI query generation
├── collections.ts       # Collection schemas
└── seedDatabase.ts      # Database seeding
```

### Adding New Collections

1. Update `collections.ts` with the new collection schema
2. Add sample data to `seedDatabase.ts`
3. The system will automatically support queries on the new collection

### Customizing Query Generation

Modify the prompt in `queryGenerator.ts` to change how OpenAI generates MongoDB queries.
