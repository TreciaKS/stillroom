import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const AI_API_URL = process.env.AI_API_URL; // e.g. https://api.groq.com/openai/v1/chat/completions
const AI_API_KEY = process.env.AI_API_KEY;
const MODEL = process.env.MODEL || "gpt-4o-mini"; // default if not provided

if (!AI_API_URL || !AI_API_KEY) {
  console.warn(
    "AI_API_URL or AI_API_KEY not set — /analyze will fail until set."
  );
}

// The controlled system prompt for Stillroom's voice
const SYSTEM_PROMPT = `You are Stillroom, a reflective AI presence. You listen deeply and respond with calm, layered insight. You do not give direct advice or prescriptive steps. Respond in brief, deliberate sentences that are poetic but clear. Keep lines short and empathetic.`;

router.post("/", async (req, res) => {
  try {
    const { entry, tone } = req.body;
    if (!entry || entry.trim().length === 0) {
      return res.status(400).json({ error: "Entry text is required." });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Entry: ${entry}` },
    ];

    // optionally alter prompt by tone
    if (tone === "gentle") {
      messages.push({
        role: "system",
        content: "Tone: gentler, softer language.",
      });
    } else if (tone === "direct") {
      messages.push({
        role: "system",
        content: "Tone: slightly more direct, concise.",
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

    const aiRes = await axios.post(AI_API_URL, payload, {
      headers,
      timeout: 30000,
    });

    // Try to handle both OpenAI-style and some provider differences
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

    return res.json({ reflection: reflection.trim() });
  } catch (err) {
    console.error("Analyze error:", err?.response?.data || err.message || err);
    const message = err?.response?.data?.error?.message || "AI service error";
    return res.status(500).json({ error: message });
  }
});

export default router;