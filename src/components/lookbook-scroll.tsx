"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/reveal";

const PANELS = [
  {
    image:
      "https://images.pexels.com/photos/4456720/pexels-photo-4456720.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
    label: "Look 01",
    title: "The trench, unbelted",
    note: "Sand gabardine over raw denim",
  },
  {
    image:
      "https://images.pexels.com/photos/11718661/pexels-photo-11718661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
    label: "Look 02",
    title: "Camel, head to toe",
    note: "Double-faced wool with a soft shoulder",
  },
  {
    image:
      "https://images.pexels.com/photos/6203797/pexels-photo-6203797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
    label: "Look 03",
    title: "Quiet tailoring",
    note: "Poplin, poplin, and one good belt",
  },
  {
    image:
      "https://images.pexels.com/photos/36771228/pexels-photo-36771228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
    label: "Look 04",
    title: "After eight",
    note: "Half-canvassed midnight blazer",
  },
  {
    image:
      "https://images.pexels.com/photos/10322183/pexels-photo-10322183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
    label: "Look 05",
    title: "Cashmere hours",
    note: "Cloud knit, nothing else",
  },
];

export function LookbookScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const padding = window.innerWidth >= 768 ? 80 : 40;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + padding));
    };
    measure();
    const timer = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink text-cream">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="grain relative flex flex-1 flex-col justify-center py-16">
          <div className="shell flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-bronze-light">The lookbook</p>
              <SplitWords
                as="h2"
                text="Studies in movement."
                className="mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95]"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cream/55">
              Photographed across one long afternoon. Five looks, no retouching, all from the SS26
              atelier collection.
            </p>
          </div>

          <motion.div ref={trackRef} style={{ x }} className="mt-10 flex w-max gap-4 px-5 md:mt-14 md:gap-6 md:px-10">
            {PANELS.map((panel, index) => (
              <article
                key={panel.label}
                className="group relative w-[74vw] shrink-0 sm:w-[46vw] lg:w-[30vw]"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={panel.image}
                    alt={panel.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 md:aspect-[3/4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 border border-cream/35 px-2 py-1 text-[0.5rem] uppercase tracking-[0.22em] text-cream/85">
                    {panel.label}
                  </span>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl leading-tight">{panel.title}</h3>
                      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-cream/60">
                        {panel.note}
                      </p>
                    </div>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-cream/40 text-cream opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
                <span className="absolute -left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[0.5rem] uppercase tracking-[0.34em] text-cream/30 lg:block">
                  {String(index + 1).padStart(2, "0")} / 05
                </span>
              </article>
            ))}

            <div className="flex w-[70vw] shrink-0 items-center sm:w-[40vw] lg:w-[26vw]">
              <div className="border-l border-cream/15 pl-6">
                <p className="eyebrow text-cream/40">See it worn</p>
                <p className="mt-4 font-display text-3xl leading-tight">
                  Every piece, in the wild.
                </p>
                <Link href="/shop" className="btn-lux btn-cream mt-6">
                  <span>
                    Shop the edit <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="shell pb-6">
          <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.26em] text-cream/40">
            <span>SS26 · Atelier lookbook</span>
            <span className="hidden sm:block">Keep scrolling</span>
          </div>
          <div className="mt-3 h-px w-full bg-cream/15">
            <motion.div style={{ width: progress }} className="h-px bg-bronze-light" />
          </div>
        </div>
      </div>
    </section>
  );
}
