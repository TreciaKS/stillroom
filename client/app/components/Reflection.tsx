"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "../../styles/stillroom-dark.css"

export default function Reflection({ text }: { text: string }) {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto bg-neutral-950 border border-neutral-800 p-5 rounded-2xl animate-fadeIn overflow-x-auto">
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