import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `
You are Stillroom — a calm, intelligent code explainer.
You explain code in a way that helps people understand, not memorize.
Use clear, to-the-point, layered explanations: first a brief summary, then a short breakdown, then examples or suggestions if relevant.
If the user provides a language, tailor explanations to that language's idioms and pitfalls.
Format code blocks when showing snippets. Tone: thoughtful, patient, and quietly confident.
`;

/**
 * @typedef {Object} ChatMessage
 * @property {"system" | "user" | "assistant"} role
 * @property {string} content
 */

router.post("/", async (req, res) => {
  try {
    const { entry, language } = req.body;
    if (!entry || !entry.toString().trim()) {
      return res
        .status(400)
        .json({ error: "Code snippet (entry) is required." });
    }

    /** @type {ChatMessage[]} */
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Explain this ${
          language ? language + " code" : "code"
        }:\n\n${entry}\n\nPlease give: (1) a one-sentence summary, (2) a concise step-by-step breakdown, (3) suggestions/improvements if any. Use markdown code blocks for examples.`,
      },
    ];

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.2,
      max_tokens: 600,
    });

    const reflection = completion?.choices?.[0]?.message?.content?.trim() || "";
    return res.json({ reflection });
  } catch (err) {
    return res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to generate explanation.",
    });
  }
});

export default router;