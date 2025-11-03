import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
    return (
      <section
        id="cta"
        className="relative z-10 flex flex-col items-center text-center py-32 bg-(--pure-white) w-full"
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
    );
}

export default CTA;