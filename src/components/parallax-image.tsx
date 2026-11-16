"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 60,
  scaleFrom = 1.12,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  scaleFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: scaleFrom }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
