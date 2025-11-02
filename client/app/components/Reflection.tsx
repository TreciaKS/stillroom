"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "../../styles/stillroom-dark.css";
import { ReflectionProps } from "../../types/types";

export default function Reflection({ text } : ReflectionProps) {
  return (
    <div className="w-full max-w-3xl p-5 mx-auto mt-6 overflow-x-auto border bg-neutral-950 border-neutral-800 rounded-2xl animate-fadeIn">
      <div className="prose prose-invert prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-code:text-amberish prose-headings:text-amberish max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}