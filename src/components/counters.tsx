"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  suffix = "",
  decimals = 0,
  duration = 2,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatRow({
  stats,
  dark = false,
}: {
  stats: { value: number; suffix?: string; label: string; decimals?: number }[];
  dark?: boolean;
}) {
  return (
    <div className={`grid grid-cols-2 gap-6 sm:grid-cols-4 ${dark ? "text-cream" : "text-ink"}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.08 }}
          className={`border-t pt-4 ${dark ? "border-cream/15" : "border-ink/15"}`}
        >
          <p className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none">
            <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
          </p>
          <p
            className={`mt-2 text-[0.56rem] uppercase tracking-[0.22em] ${
              dark ? "text-cream/45" : "text-muted"
            }`}
          >
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
