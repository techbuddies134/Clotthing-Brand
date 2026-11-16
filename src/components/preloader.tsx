"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = ["V", "E", "S", "T", "R", "A"];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const started = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - started;
      setProgress(Math.min(100, Math.round((elapsed / 1750) * 100)));
    }, 40);
    const done = setTimeout(() => setVisible(false), 1950);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink text-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow text-bronze-light"
          >
            Atelier · Vol. 04
          </motion.div>

          <div className="mt-6 flex overflow-hidden">
            {LETTERS.map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[13vw] leading-none tracking-[0.06em] sm:text-[9vw] lg:text-[7.5rem]"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 flex w-[min(78vw,22rem)] items-center justify-between text-[0.62rem] uppercase tracking-[0.3em] text-cream/55">
            <span>Dressing the modern</span>
            <span>{String(progress).padStart(3, "0")}</span>
          </div>
          <div className="mt-3 h-px w-[min(78vw,22rem)] bg-cream/15">
            <motion.div
              className="h-px bg-bronze-light"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
