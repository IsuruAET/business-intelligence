import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleQuestion } from "./ragController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/ask", handleQuestion);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
