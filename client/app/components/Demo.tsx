import { motion } from "framer-motion";

const Demo = () => {
    return (
      <section
        id="demo"
        className="relative z-10 flex flex-col items-center justify-center px-4 py-32 overflow-hidden text-center"
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
          className="relative z-10 w-full max-w-3xl p-8 text-left border shadow-lg bg-neutral-950/50 border-neutral-800 rounded-2xl backdrop-blur-lg shadow-black/20"
        >
          <h3 className="mb-4 text-sm font-medium tracking-widest uppercase text-neutral-300">
            See Stillroom in Action
          </h3>

          {/* Code Input Simulation */}
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="p-5 mb-6 overflow-x-auto font-mono text-sm border bg-neutral-900 rounded-xl text-neutral-200 border-neutral-800"
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
            className="text-base leading-relaxed text-neutral-400"
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
    );
}

export default Demo;