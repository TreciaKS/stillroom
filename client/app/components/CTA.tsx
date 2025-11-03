import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
    return (
      <section
        id="cta"
        className="relative z-10 flex flex-col items-center text-center py-32 bg-(--pure-white) w-full mt-10 border"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl lg:text-6xl font-semibold text-(--pure-graphite) mb-6"
        >
          Step into Stillroom
        </motion.h2>
        <p className="text-(--pure-gray) mb-10">
          Your free space to explore explained code — with calm precision.
        </p>
        <Link href="/app">
          <button className="px-10 py-4 rounded-xl hover:text-(--solar-sky) cursor-pointer font-medium transition shadow-lg/20 bg-(--pure-graphite) text-(--pure-white)">
            Launch Now — It&apos;s Free
          </button>
        </Link>
      </section>
    );
}

export default CTA;