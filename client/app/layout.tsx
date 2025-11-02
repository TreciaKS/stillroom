import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Stillroom — Code Explainer",
  description: "Paste code. Understand code. Stillroom explains it gently."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-neutral-950 text-neutral-100 overflow-x-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-[#330b0d]/20 to-[#93220d]/60 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}