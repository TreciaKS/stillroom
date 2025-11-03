import { motion } from "framer-motion";

const Features = () => {
  return (
    <section
      id="features"
      className="relative z-10 w-full mx-auto px-8 max-md:min-h-dvh text-center bg-(--pure-white) text-(--pure-graphite) lg:py-22 md:py-5 max-md:-mb-14"
    >
      <h2 className="text-3xl font-semibold mb-12 lg:text-6xl max-md:pb-3">
        What Stillroom Does
      </h2>
      <div className="grid md:grid-cols-3 gap-10 h-60 text-center">
        {[
          {
            title: "Explain Code",
            desc: "Paste any snippet — JavaScript, C#, Python — and get a calm, human-like explanation of what it does.",
          },
          {
            title: "Code Suggestions",
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
            className="bg-(--pure-graphite) rounded-2xl flex flex-col justify-center hover:translate-0.5 transition px-8 max-md:py-5"
          >
            <h3 className="text-2xl font-medium text-(--solar-sky) mb-3">
              {f.title}
            </h3>
            <p className="text-(--pure-silver) leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;