# Business Intelligence Platform

A full-stack business intelligence platform with RAG (Retrieval-Augmented Generation) capabilities for intelligent data querying and analysis.

## 🚀 Live Demo

**Test the application here:** [https://business-intelligence-frontend.vercel.app/](https://business-intelligence-frontend.vercel.app/)

## 📋 Project Overview

This project consists of a React frontend and Node.js backend that provides intelligent data querying capabilities using RAG (Retrieval-Augmented Generation) technology. Users can ask natural language questions about business data and receive intelligent responses.

## 🏗️ Architecture

```
business-intelligence/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + TypeScript backend
├── scripts/           # Deployment and setup scripts
└── docs/             # Documentation
```

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management

### Backend

- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** for data storage
- **RAG (Retrieval-Augmented Generation)** for intelligent querying

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance

### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp env.example .env
# Configure your environment variables
npm run dev
```

## 📁 Project Structure

### Backend (`/backend`)

- `src/index.ts` - Main server entry point
- `src/ragController.ts` - RAG implementation
- `src/queryGenerator.ts` - Query generation logic
- `src/database.ts` - Database connection and operations
- `src/collections.ts` - Data collection definitions

### Frontend (`/frontend`)

- `src/App.tsx` - Main application component
- `src/features/rag/` - RAG-related components and API
- `src/app/store.ts` - Redux store configuration

## 🔧 Environment Variables

### Backend (.env)

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001
```

## 🚀 Deployment

The application is deployed on Vercel:

- **Frontend**: https://business-intelligence-frontend.vercel.app/
- **Backend**: Configured for Vercel deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📖 Usage

1. Navigate to the [live demo](https://business-intelligence-frontend.vercel.app/)
2. Enter your business intelligence questions in natural language
3. The system will use RAG to provide intelligent responses based on your data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://business-intelligence-frontend.vercel.app/)
- [API Documentation](backend/Business_Intelligence_API.postman_collection.json)
- [Sample Questions](SAMPLE_QUESTIONS.md)
