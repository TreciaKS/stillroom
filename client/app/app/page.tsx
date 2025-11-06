"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Reflection from "../components/Reflection";
import { HistoryItem } from "../../types/types";
import Loader from "../components/loader";

export default function Home() {
  const [entry, setEntry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [reflection, setReflection] = useState<string>(
    "Your explanation will appear here"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const saved = localStorage.getItem("stillroom_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain"); // plain text only
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const newValue = entry.slice(0, start) + text + entry.slice(end);
    setEntry(newValue);
  };

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
    <main className="bg-(--pure-black) overflow-hidden">
      <section className="flex relative h-screen max-md:flex-col-reverse max-md:overflow-y-auto">
        <div className="lg:w-110 flex flex-col-reverse md:w-120">
          <div className="py-6 px-4 bg-(--pure-graphite) max-md:py-4 max-md:bg-(--pure-black)">
            <textarea
              value={entry}
              onPaste={handlePaste}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full mb-2 font-mono text-sm border h-60 max-md:h-30"
            />

            <div className="flex justify-between gap-x-4 max-md:text-sm max-md:">
              <button
                onClick={() => {
                  setEntry("");
                  setReflection("");
                }}
                className="px-8 py-3 transition text-(--pure-silver) border border-(--pure-charcoal) rounded-xl hover:opacity-60 cursor-pointer max-lg:py-2 max-lg:px-5"
              >
                Clear
              </button>
              <div className="flex justify-between gap-x-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-5 py-2 border rounded-lg bg-(--pure-charcoal) border-(--pure-charcoal) text-(--pure-white)"
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
                  className="px-8 py-3 font-medium text-(--solar-sky) transition rounded-xl border border-(--solar-sky) hover:opacity-60 cursor-pointer"
                >
                  {loading ? "Explaining…" : "Explain"}
                </button>
              </div>
            </div>
          </div>

          <aside className="bg-(--pure-graphite) overflow-y-auto px-6 pb-5 max-md:hidden h-full">
            <h3 className="pl-2 text-center text-lg tracking-wider font-semibold text-(--pure-white) bg-(--pure-graphite) sticky top-0 py-4">
              History
            </h3>
            <div className="space-y-3 w-95">
              {history.length === 0 && (
                <p className="text-neutral-600">
                  No remembered explanations yet
                </p>
              )}
              {history.map((h, i) => (
                <div
                  key={i}
                  className="p-3 border bg-(--pure-graphite) border-(--pure-gray)/20 rounded-xl shadow-md"
                >
                  <div className="text-sm italic truncate text-(--pure-silver)">
                    {h.entry}
                  </div>
                  <div className="mt-1 text-xs text-(--pure-gray)">
                    {h.language ?? "Auto-detect"} •{" "}
                    {new Date(h.ts).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
        {error && (
          <p className="mt-3 text-(--pure-white) bg-(--solar-ocean) px-5 py-4 z-50 rounded-lg absolute right-8 top-4">
            {error}
          </p>
        )}
        {loading && <Loader />}
        {reflection && <Reflection text={reflection} />}
      </section>
    </main>
  );
}