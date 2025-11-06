"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "../../styles/stillroom-dark.css";
import { ReflectionProps } from "../../types/types";

export default function Reflection({ text } : ReflectionProps) {
  return (
    <div className="w-full px-10 py-6 rounded-2xl animate-fadeIn overflow-y-auto max-md:px-5 bg-(--pure-black) opacity-85">
      <div className="prose prose-invert prose-pre:bg-(--pure-black) prose-pre:text-(--solar-sunlight) prose-code:text-(--solar-skin) prose-headings:text-(--solar-skin) max-w-none">
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