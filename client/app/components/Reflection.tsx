"use client";
interface ReflectionProps {
  text: string;
}

export default function Reflection({ text }: ReflectionProps) {
  return (
    <div className="mt-6 w-full max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 p-5 rounded-2xl animate-fadeIn">
      <div className="text-left text-neutral-300 italic leading-relaxed whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}