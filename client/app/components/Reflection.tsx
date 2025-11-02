"use client";
export default function Reflection({ text }: { text: string }) {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto bg-neutral-950 border border-neutral-800 p-5 rounded-2xl animate-fadeIn">
      <div className="prose prose-invert text-neutral-300 whitespace-pre-wrap">
        {/* The model returns markdown; we display plain formatted text */}
        {text}
      </div>
    </div>
  );
}