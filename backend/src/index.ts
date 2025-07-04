import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleQuestion } from "./ragController";
import { connectToDatabase } from "./database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/ask", handleQuestion);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Initialize database connection for local development
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectToDatabase();

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}

// For Vercel serverless deployment
export default app;
