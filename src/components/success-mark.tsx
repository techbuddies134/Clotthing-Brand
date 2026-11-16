"use client";

import { motion } from "framer-motion";

export function SuccessMark() {
  return (
    <div className="relative grid size-24 place-items-center">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full border border-bronze/40"
      />
      <motion.span
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-bronze/40"
      />
      <svg viewBox="0 0 48 48" className="size-20" fill="none" aria-hidden>
        <motion.circle
          cx="24"
          cy="24"
          r="21"
          stroke="#a97c4e"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M15 25.5 21.5 32 34 18.5"
          stroke="#14110f"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
