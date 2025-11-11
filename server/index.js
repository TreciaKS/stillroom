import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "https://stillroom-red.vercel.app",
  "http://localhost:3000",
];

app.get("/", (req, res) => {
  res.json({
    status: "Stillroom server running",
    envLoaded: !!process.env.GROQ_API_KEY,
  });
});

app.use("/analyze", analyzeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Stillroom server listening on port ${PORT}`);
});