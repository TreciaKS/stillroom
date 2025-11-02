// @ts-expect-error because it is a default import
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Stillroom — Code Explainer",
  description: "Paste code. Understand code. Stillroom explains it gently."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}