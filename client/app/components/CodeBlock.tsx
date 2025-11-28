"use client";

import { useState } from "react";
import { CodeBlockProps } from "../../types/types"

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
  ...props
}: {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);

  const code = String(children).replace(/\n$/, "");

  if (inline) {
    return (
      <code>
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group my-4">
      <pre
        className={className}
      >
        <code {...props}>{code}</code>
      </pre>

      <button
        onClick={handleCopy}
        className="
          absolute top-2 right-2
          text-xs px-2 py-1 rounded
          bg-(--pure-graphite) text-(--pure-white)
          opacity-0 group-hover:opacity-100 transition
        "
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default CodeBlock;