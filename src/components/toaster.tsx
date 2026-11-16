"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useToast } from "@/lib/toast";

export function Toaster() {
  const { message, detail, hide } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[150] flex justify-center px-5">
      <AnimatePresence>
        {message ? (
          <motion.div
            key={message}
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={hide}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-ink/10 bg-ink/95 py-3 pl-4 pr-6 text-cream shadow-[0_18px_50px_rgba(20,17,15,0.35)] backdrop-blur"
          >
            <span className="grid size-7 place-items-center rounded-full bg-bronze text-ink">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-[0.72rem] uppercase tracking-[0.2em]">{message}</span>
            {detail ? (
              <span className="hidden text-xs tracking-wide text-cream/60 sm:block">{detail}</span>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
