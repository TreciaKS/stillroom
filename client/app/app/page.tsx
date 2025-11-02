"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Reflection from "../components/Reflection";

type HistoryItem = {
  entry: string;
  language?: string;
  reflection?: string;
  ts: number;
};

export default function Home() {
  const [entry, setEntry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [reflection, setReflection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    const saved = localStorage.getItem("stillroom_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const submit = async () => {
    setError("");
    if (!entry.trim()) {
      setError("Paste a code snippet to get an explanation.");
      return;
    }
    setLoading(true);
    setReflection("");
    try {
      const res = await axios.post(`${backendUrl}/analyze`, {
        entry,
        language,
      });
      const text: string = res.data.reflection;
      setReflection(text);

      const newHist = [
        { entry, language, reflection: text, ts: Date.now() },
        ...history,
      ].slice(0, 30);
      setHistory(newHist);
      localStorage.setItem("stillroom_history", JSON.stringify(newHist));
    } catch (err: unknown) {
      console.log(err);
      if (err === "string") {
        setError(err || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-4xl font-light text-amberish">Stillroom</h1>
          <p className="text-neutral-400 italic">
            For when your code needs to make sense.
          </p>
        </header>

        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-60 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amberish"
          />

          <div className="flex gap-3 mt-4 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-3 py-2"
            >
              <option value="">Autodetect</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="C#">C#</option>
              <option value="Python">Python</option>
              <option value="SQL">SQL</option>
            </select>

            <button
              onClick={submit}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-amberish text-black font-medium disabled:opacity-60"
            >
              {loading ? "Explaining…" : "Explain"}
            </button>

            <button
              onClick={() => {
                setEntry("");
                setReflection("");
              }}
              className="px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300"
            >
              Clear
            </button>
          </div>

          {error && <p className="mt-3 text-rose-400">{error}</p>}
          {reflection && <Reflection text={reflection} />}
        </section>

        <aside className="mt-6">
          <h3 className="text-neutral-400 text-sm mb-2">History</h3>
          <div className="space-y-3">
            {history.length === 0 && (
              <p className="text-neutral-600">No saved explanations yet.</p>
            )}
            {history.map((h, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3"
              >
                <div className="text-neutral-300 text-sm italic truncate">
                  {h.entry}
                </div>
                <div className="text-neutral-500 text-xs mt-1">
                  {h.language ?? "Auto-detect"} •{" "}
                  {new Date(h.ts).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}