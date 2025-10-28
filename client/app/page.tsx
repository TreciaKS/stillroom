"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Reflection from "./components/Reflection";

interface HistoryItem {
  entry: string;
  reflection: string;
  ts: number;
}

export default function Home() {
  const [entry, setEntry] = useState<string>("");
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
      setError("Write something — even a line.");
      return;
    }
    setLoading(true);
    setReflection("");
    try {
      const res = await axios.post(`${backendUrl}/analyze`, { entry });
      const reflectionText: string = res.data.reflection;

      setReflection(reflectionText);
      const newHistory: HistoryItem[] = [
        { entry, reflection: reflectionText, ts: Date.now() },
        ...history,
      ].slice(0, 30);

      setHistory(newHistory);
      localStorage.setItem("stillroom_history", JSON.stringify(newHistory));
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-light tracking-tight text-amberish">
            Stillroom
          </h1>
          <p className="mt-2 text-neutral-400 italic">
            For thoughts that need time to breathe.
          </p>
        </header>

        <section className="bg-neutral-950 border border-neutral-800 p-6 rounded-3xl">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write what’s on your mind..."
            className="w-full h-40 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amberish"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={submit}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-amberish text-black font-medium hover:opacity-95 transition disabled:opacity-60"
            >
              {loading ? "Reflecting…" : "Reflect"}
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

          {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
          {reflection && <Reflection text={reflection} />}
        </section>

        <aside className="mt-8">
          <h3 className="text-neutral-400 text-sm mb-2">Past Sessions</h3>
          <div className="space-y-3">
            {history.length === 0 && (
              <p className="text-neutral-600">No saved sessions yet.</p>
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