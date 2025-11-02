import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 mt-32 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-5 text-6xl font-light tracking-tight md:text-7xl text-amberish"
      >
        Understand Code. <br className="hidden sm:block" />
        <span className="text-neutral-200">Beautifully.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-xl mx-auto mb-10 text-lg text-neutral-400"
      >
        A calm, free AI tool for developers who want to learn through clarity —
        not chaos.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex gap-4"
      >
        <Link href="/app">
          <button className="px-8 py-3 font-medium text-black transition rounded-xl bg-amberish hover:opacity-90">
            Launch Stillroom
          </button>
        </Link>
        <a
          href="https://github.com/TreciaKS/stillroom"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 transition border rounded-xl border-neutral-700 text-neutral-300 hover:text-amberish hover:border-amberish"
        >
          View Source
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;