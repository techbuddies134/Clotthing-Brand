"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ProductDTO } from "@/lib/types";

export function ProductGallery({ product }: { product: ProductDTO }) {
  const [active, setActive] = useState(0);
  const images = product.images.length > 0 ? product.images : [""];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="group relative overflow-hidden bg-bone">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={`${product.name} — view ${active + 1}`}
              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
        </AnimatePresence>

        {product.badge ? (
          <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.24em] backdrop-blur">
            {product.badge}
          </span>
        ) : null}

        <span className="absolute bottom-4 right-4 bg-ink/70 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.2em] text-cream backdrop-blur">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              className={`relative h-20 w-16 overflow-hidden border transition ${
                active === index ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2 text-[0.55rem] uppercase tracking-[0.18em] text-muted">
        <span className="border border-ink/10 px-3 py-2.5 text-center">Free shipping over $200</span>
        <span className="border border-ink/10 px-3 py-2.5 text-center">30-day returns</span>
      </div>
    </div>
  );
}
