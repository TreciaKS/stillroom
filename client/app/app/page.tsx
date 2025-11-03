"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Reflection from "../components/Reflection";
import { HistoryItem } from "../../types/types";

export default function Home() {
  const [entry, setEntry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [reflection, setReflection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL!;

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
    <main className="flex items-start justify-center min-h-screen p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-4xl font-light text-amberish">Stillroom</h1>
          <p className="italic text-neutral-400">
            For when your code needs to make sense.
          </p>
        </header>

        <section className="p-6 border bg-neutral-900 border-neutral-800 rounded-3xl">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full p-4 font-mono text-sm border h-60 rounded-xl bg-neutral-950 border-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amberish"
          />

          <div className="flex items-center gap-3 mt-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-neutral-900 border-neutral-800 text-neutral-300"
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
              className="px-4 py-2 font-medium text-black rounded-lg bg-amberish disabled:opacity-60"
            >
              {loading ? "Explaining…" : "Explain"}
            </button>

            <button
              onClick={() => {
                setEntry("");
                setReflection("");
              }}
              className="px-3 py-2 border rounded-lg border-neutral-700 text-neutral-300"
            >
              Clear
            </button>
          </div>

          {error && <p className="mt-3 text-rose-400">{error}</p>}
          {reflection && <Reflection text={reflection} />}
        </section>

        <aside className="mt-6">
          <h3 className="mb-2 text-sm text-neutral-400">History</h3>
          <div className="space-y-3">
            {history.length === 0 && (
              <p className="text-neutral-600">No saved explanations yet.</p>
            )}
            {history.map((h, i) => (
              <div
                key={i}
                className="p-3 border bg-neutral-900 border-neutral-800 rounded-xl"
              >
                <div className="text-sm italic truncate text-neutral-300">
                  {h.entry}
                </div>
                <div className="mt-1 text-xs text-neutral-500">
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