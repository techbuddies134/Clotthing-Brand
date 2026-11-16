"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";

export type AccordionItem = { title: string; content: ReactNode };

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-ink/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title} className="border-b border-ink/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[0.66rem] uppercase tracking-[0.2em]">{item.title}</span>
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-ink/20 transition hover:border-ink">
                {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-sm leading-relaxed text-ink/65">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
