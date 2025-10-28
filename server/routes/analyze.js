import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Using Groq&apos;s OpenAI-compatible endpoint
const AI_API_URL =
  process.env.AI_API_URL || "https://api.groq.com/openai/v1/chat/completions";
const AI_API_KEY = process.env.GROQ_API_KEY || process.env.AI_API_KEY;
const MODEL = process.env.MODEL || "llama-3.3-70b-versatile"; // Groq model

if (!AI_API_URL || !AI_API_KEY) {
  console.warn("⚠️  AI_API_URL or GROQ_API_KEY not set — /analyze will fail.");
}

// The Stillroom voice prompt
const SYSTEM_PROMPT = `
You are Stillroom — a reflective AI presence. 
You listen deeply and respond with calm, layered insight.
You do not give advice or instructions.
You reflect emotion, tone, and perspective in brief, poetic sentences.
Keep your language empathetic and minimal.
`;

router.post("/", async (req, res) => {
  try {
    const { entry, tone } = req.body;
    if (!entry || entry.trim().length === 0) {
      return res.status(400).json({ error: "Entry text is required." });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: entry },
    ];

    // Optional tone control
    if (tone === "gentle") {
      messages.push({
        role: "system",
        content: "Tone: gentler, softer, nurturing language.",
      });
    } else if (tone === "direct") {
      messages.push({
        role: "system",
        content: "Tone: more concise, minimal, yet still compassionate.",
      });
    }

    const payload = {
      model: MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 250,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    };

    const aiRes = await axios.post(AI_API_URL, payload, { headers });

    let reflection = "";
    if (aiRes.data?.choices?.[0]?.message?.content) {
      reflection = aiRes.data.choices[0].message.content;
    } else if (aiRes.data?.choices?.[0]?.text) {
      reflection = aiRes.data.choices[0].text;
    } else if (typeof aiRes.data === "string") {
      reflection = aiRes.data;
    } else {
      reflection = JSON.stringify(aiRes.data).slice(0, 1000);
    }

    res.json({ reflection: reflection.trim() });
  } catch (err) {
    console.error("Analyze error:", err?.response?.data || err.message || err);
    const message =
      err?.response?.data?.error?.message || "AI service error (Groq)";
    res.status(500).json({ error: message });
  }
});

export default router;