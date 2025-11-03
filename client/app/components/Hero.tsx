import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center px-6 md:mt-44 mt-32 text-center text-(--pure-silver) max-lg:py-3 bg-(--pure-black)">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mb-5 text-6xl font-light tracking-widest md:text-7xl max-md:tracking-wide"
      >
        Understand Code <br />
        <span className="text-(--pure-silver)">Beautifully</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-xl mx-auto mb-10 text-lg text-neutral-400 tracking-wider"
      >
        Because there&apos;s{" "}
        <span className="text-(--pure-white)">still room</span> to learn
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex gap-4 max-md:flex-col max-md:gap-y-5"
      >
        <Link href="/app">
          <button className="px-8 py-3 font-medium text-(--pure-silver) transition rounded-xl border border-(--solar-ocean) hover:opacity-90 cursor-pointer">
            Launch Stillroom
          </button>
        </Link>
        <a
          href="https://github.com/TreciaKS/stillroom"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 transition border border-(--pure-gray) rounded-xl hover:border-(--solar-sky) hover:opacity-90"
        >
          View Source
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;