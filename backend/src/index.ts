import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleQuestion } from "./ragController";
import { connectToDatabase } from "./database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  // Add both with and without trailing slash for Vercel
  "https://business-intelligence-frontend.vercel.app",
  "https://business-intelligence-frontend.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Also check normalized versions (without trailing slash)
      const normalizedOrigin = origin.endsWith("/")
        ? origin.slice(0, -1)
        : origin;
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
