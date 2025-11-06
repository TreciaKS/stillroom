import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
  if (process.env.GROQ_API_KEY) {
    console.log(
      `GROQ key loaded (prefix): ${process.env.GROQ_API_KEY.slice(0, 5)}...`
    );
  } else {
    console.warn("GROQ_API_KEY not set. Set GROQ_API_KEY in .env");
  }
});