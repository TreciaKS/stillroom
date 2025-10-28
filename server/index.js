import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// constants
const PORT = process.env.PORT || 4000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.MODEL || "llama-3.3-70b-versatile";

// POST /analyze endpoint
app.post("/analyze", async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({ error: "Entry is required." });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are Stillroom, a reflective AI presence. You listen deeply and respond with calm, layered insight. You do not give advice. You reflect emotion and essence. Respond briefly and poetically.",
          },
          {
            role: "user",
            content: entry,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reflection = response.data.choices[0].message.content;
    res.json({ reflection });
  } catch (error) {
    console.error("Groq API error:", error?.response?.data || error.message);
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        "Failed to generate reflection.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Stillroom server running on port ${PORT}`);
});