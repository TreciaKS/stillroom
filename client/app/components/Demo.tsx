import { motion } from "framer-motion";

const Demo = () => {
    return (
      <section
        id="demo"
        className="relative z-10 flex flex-col items-center justify-center px-4 py-25 mt-10 overflow-hidden rounded-tl-full rounded-tr-full  w-full bg-(--pure-white) *:shadow-xl max-lg:rounded-tr-[10rem] max-lg:rounded-tl-[10rem]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-3xl p-8 text-left border bg-(--pure-white) rounded-2xl shadow-(--pure-sand)"
        >
          <h3 className="mb-4 text-sm font-medium tracking-widest uppercase text-(--pure-graphite)">
            See Stillroom in Action
          </h3>

          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "circIn" }}
            className="p-5 mb-6 overflow-x-auto font-mono text-sm border bg-(--pure-graphite) rounded-xl text-(--pure-white)"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1, ease: "circIn" }}
            >
              <span className="t">function</span> greet(name) {"{"}
              {"\n"}
              &nbsp;&nbsp;console.log(
              <span className="text-(--solar-sky)">`Hello, ${"{name}"}`</span>);
              {"\n"}
              {"}"}
              {"\n"}
              greet(
              <span className="text-(--solar-sky)">&quot;Trecia&quot;</span>);
            </motion.div>
          </motion.pre>

          {/* AI Reflection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-base leading-relaxed text-neutral-400"
          >
            <p className="mb-2 text-(--pure-charcoal)">
              <strong className="text-(--pure-graphite)">Stillroom:</strong>{" "}
              This function defines a simple greeting routine.
            </p>
            <p className="text-(--pure-charcoal)">
              It prints{" "}
              <code className="bg-(--solar-ocean) text-(--pure-white) px-1 py-0.5 rounded">
                Hello, Trecia!
              </code>{" "}
              — demonstrating how template literals inject variables in
              JavaScript.
            </p>
          </motion.div>
        </motion.div>
      </section>
    );
}

export default Demo;