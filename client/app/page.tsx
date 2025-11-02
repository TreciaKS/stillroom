"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 🌫️ Floating particles for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
    }[] = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.5,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 124, 0.25)"; // brighter amber
        ctx.shadowColor = "rgba(255, 200, 124, 0.15)";
        ctx.shadowBlur = 12;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#070707] text-neutral-100">
      {/* Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0b0b0d,#060607_60%)]z-0" />

      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full backdrop-blur-md bg-black/10 border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-lg font-medium text-amberish tracking-tight">
            Stillroom
          </h1>
          <nav className="flex gap-6 text-sm text-neutral-400">
            <a href="#features" className="hover:text-amberish transition">
              Features
            </a>
            <a href="#mission" className="hover:text-amberish transition">
              Mission
            </a>
            <a href="#cta" className="hover:text-amberish transition">
              Start
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 mt-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-light text-amberish mb-5 tracking-tight"
        >
          Understand Code. <br className="hidden sm:block" />
          <span className="text-neutral-200">Beautifully.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-neutral-400 max-w-xl mx-auto text-lg mb-10"
        >
          A calm, free AI tool for developers who want to learn through clarity
          — not chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex gap-4"
        >
          <Link href="/app">
            <button className="px-8 py-3 rounded-xl bg-amberish text-black font-medium hover:opacity-90 transition">
              Launch Stillroom
            </button>
          </Link>
          <a
            href="https://github.com/TreciaKS/stillroom"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl border border-neutral-700 text-neutral-300 hover:text-amberish hover:border-amberish transition"
          >
            View Source
          </a>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b0b0d,#050506)] opacity-90" />
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[600px] h-[600px] bg-amberish/5 blur-3xl rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl backdrop-blur-lg shadow-lg shadow-black/20 p-8 text-left"
        >
          <h3 className="text-neutral-300 font-medium mb-4 text-sm uppercase tracking-widest">
            See Stillroom in Action
          </h3>

          {/* Code Input Simulation */}
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="bg-neutral-900 rounded-xl p-5 text-sm font-mono text-neutral-200 mb-6 border border-neutral-800 overflow-x-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <span className="text-amberish">function</span> greet(name) {"{"}
              {"\n"}
              &nbsp;&nbsp;console.log(
              <span className="text-[#bdb2ff]">`Hello, ${"{name}"}`</span>);
              {"\n"}
              {"}"}
              {"\n"}
              greet(<span className="text-[#bdb2ff]">&quot;World&quot;</span>);
            </motion.div>
          </motion.pre>

          {/* AI Reflection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="text-neutral-400 text-base leading-relaxed"
          >
            <p className="mb-2">
              <strong className="text-amberish">Stillroom:</strong> This
              function defines a simple greeting routine.
            </p>
            <p className="text-neutral-500">
              It prints{" "}
              <code className="bg-neutral-900 text-amberish px-1 py-0.5 rounded">
                Hello, World!
              </code>{" "}
              — demonstrating how template literals inject variables in
              JavaScript.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-8 py-32 text-center"
      >
        <h2 className="text-3xl font-light text-amberish mb-12">
          What Stillroom Does
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {[
            {
              title: "Explain Code",
              desc: "Paste any snippet — JavaScript, C#, Python — and get a calm, human-like explanation of what it does.",
            },
            {
              title: "Refactor Intelligently",
              desc: "Receive cleaner, more readable versions of your code without losing its original intent.",
            },
            {
              title: "Learn in Layers",
              desc: "Stillroom explains not just *what* happens, but *why* — helping you truly internalize each concept.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-amberish/40 transition"
            >
              <h3 className="text-xl font-medium text-neutral-200 mb-3">
                {f.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="relative z-10 text-center px-8 py-28 border-t border-neutral-800"
      >
        <h2 className="text-3xl font-light text-amberish mb-4">
          Free. Forever.
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Stillroom isn’t here to monetize curiosity. It’s here to keep the
          light on — to make understanding code accessible, quiet, and
          permanent.
        </p>
      </section>

      {/* CTA Footer */}
      <section
        id="cta"
        className="relative z-10 flex flex-col items-center text-center py-32 border-t border-neutral-800"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-light text-neutral-100 mb-6"
        >
          Step into Stillroom
        </motion.h2>
        <p className="text-neutral-400 mb-10">
          Your free space to explore and explain code — with calm precision.
        </p>
        <Link href="/app">
          <button className="px-10 py-4 rounded-xl bg-amberish text-black font-medium hover:opacity-90 transition shadow-lg shadow-amberish/10">
            Launch Now — It’s Free
          </button>
        </Link>
      </section>

      <footer className="absolute bottom-0 w-full text-center py-6 text-xs text-white border-t border-gray-700 ">
        © {new Date().getFullYear()} Stillroom. Made with calm in South Africa
        🌍
      </footer>
    </main>
  );
}