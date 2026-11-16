"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    quote:
      "VESTRA makes clothes that make me look like I know exactly what I am doing — even on the days I absolutely do not.",
    name: "Amara Siddiqui",
    role: "Architect, Lahore",
  },
  {
    quote:
      "The trench is the single best thing in my wardrobe. The cut, the weight, the way it moves — nothing else comes close.",
    name: "Elena Voss",
    role: "Creative director, Berlin",
  },
  {
    quote:
      "I bought one cashmere knit to test them. Two months later I own four pieces and I have stopped shopping anywhere else.",
    name: "Rehan Malik",
    role: "Product designer, Dubai",
  },
  {
    quote:
      "The attention to the inside of the garment — French seams, the fineness of the finish — that is where the price makes sense.",
    name: "Yuki Tanaka",
    role: "Textile editor, Tokyo",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((prev) => (prev + 1) % QUOTES.length), 6200);
    return () => clearInterval(timer);
  }, [paused]);

  const current = QUOTES[active];

  return (
    <section
      className="relative overflow-hidden bg-cream py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-bronze">In their words</p>
            <h2 className="mt-4 max-w-md font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1]">
              Worn by people with <span className="italic">opinions.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setActive((prev) => (prev - 1 + QUOTES.length) % QUOTES.length)}
              className="grid size-10 place-items-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setActive((prev) => (prev + 1) % QUOTES.length)}
              className="grid size-10 place-items-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-12 min-h-[16rem] border-t border-ink/10 pt-10 md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3 fill-bronze text-bronze" />
                ))}
              </div>
              <p className="max-w-4xl font-display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.18]">
                “{current.quote}”
              </p>
              <footer className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-ink/30" />
                <span className="text-[0.66rem] uppercase tracking-[0.22em]">{current.name}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  {current.role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2">
            {QUOTES.map((quote, index) => (
              <button
                key={quote.name}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-[2px] transition-all duration-500 ${
                  index === active ? "w-12 bg-bronze" : "w-6 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
            <span className="ml-auto text-[0.55rem] uppercase tracking-[0.26em] text-muted">
              {String(active + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
