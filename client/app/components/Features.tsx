import { motion } from "framer-motion";

const Features = () => {
  return (
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
  );
};

export default Features;