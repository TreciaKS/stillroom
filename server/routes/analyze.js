import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `
You are Stillroom — a reflective AI presence.
You listen deeply and respond with calm, layered insight.
You do not give advice or instructions.
You reflect emotion and perspective in brief, poetic sentences.
Keep language minimal, empathetic, and human.
`;

/**
 * @typedef {Object} ChatMessage
 * @property {"system" | "user" | "assistant"} role
 * @property {string} content
 */

router.post("/", async (req, res) => {
  try {
    const { entry, tone } = req.body;
    if (!entry?.trim()) {
      return res.status(400).json({ error: "Entry text is required." });
    }

    /** @type {ChatMessage[]} */
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: entry },
    ];

    if (tone === "gentle") {
      messages.push({
        role: "system",
        content: "Tone: gentler, softer, and comforting.",
      });
    } else if (tone === "direct") {
      messages.push({
        role: "system",
        content: "Tone: concise, grounded, and warm.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 250,
    });

    const reflection =
      completion?.choices?.[0]?.message?.content?.trim() || "No response.";
    res.json({ reflection });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to generate reflection.",
    });
  }
});

export default router;