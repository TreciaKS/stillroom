import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Stillroom — Code Explainer",
  description: "Paste code. Understand code. Stillroom explains it gently.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <div className="absolute inset-0 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}