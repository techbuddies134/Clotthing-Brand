"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { cartSubtotal, shippingFor, useCart } from "@/lib/cart";
import { useMounted } from "@/hooks/use-mounted";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/types";

export function CartView() {
  const { lines, setQuantity, remove, clear } = useCart();
  const mounted = useMounted();
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!mounted) {
    return (
      <div className="grid gap-4">
        {[0, 1].map((index) => (
          <div key={index} className="shimmer h-32 w-full" />
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-ink/20 px-6 py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full border border-ink/15">
          <ShoppingBag className="size-7 text-muted" />
        </span>
        <p className="mt-6 font-display text-4xl">The bag is quiet.</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
          Nothing in here yet. Explore the current volume — twelve pieces, cut in small runs.
        </p>
        <Link href="/shop" className="btn-lux btn-ink mt-8">
          <span>
            Start with the atelier <ArrowRight className="size-3.5" />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
      <div>
        <div className="flex items-center justify-between border-b border-ink/10 pb-3 text-[0.58rem] uppercase tracking-[0.22em] text-muted">
          <span>{lines.length} {lines.length === 1 ? "piece" : "pieces"} selected</span>
          <button type="button" onClick={clear} className="hover:text-ink">
            Clear bag
          </button>
        </div>

        <ul className="divide-y divide-ink/10">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.key}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 py-6 sm:gap-6"
              >
                <Link href={`/product/${line.slug}`} className="group shrink-0 overflow-hidden bg-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={line.image}
                    alt={line.name}
                    className="h-36 w-28 object-cover transition duration-700 group-hover:scale-105 sm:h-40 sm:w-32"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                        {line.color} · Size {line.size}
                      </p>
                      <Link
                        href={`/product/${line.slug}`}
                        className="mt-1 block font-display text-xl leading-tight hover:text-bronze"
                      >
                        {line.name}
                      </Link>
                    </div>
                    <p className="text-sm">{formatPrice(line.price * line.quantity)}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex items-center border border-ink/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(line.key, line.quantity - 1)}
                        className="grid size-9 place-items-center transition hover:bg-ink hover:text-cream"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(line.key, line.quantity + 1)}
                        className="grid size-9 place-items-center transition hover:bg-ink hover:text-cream"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      className="flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-muted transition hover:text-ink"
                    >
                      <Trash2 className="size-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-6">
          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            <span>
              {remaining === 0
                ? "Complimentary worldwide shipping unlocked"
                : `${formatPrice(remaining)} away from free shipping`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-bronze"
            />
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-ink/10 bg-bone/40 p-6">
          <p className="eyebrow text-muted">Order summary</p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Duties & tax</span>
              <span className="text-olive">Included</span>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-5">
            <span className="eyebrow">Total</span>
            <span className="font-display text-3xl">{formatPrice(subtotal + shipping)}</span>
          </div>
          <Link href="/checkout" className="btn-lux btn-ink mt-6 w-full">
            <span>
              Checkout <ArrowRight className="size-3.5" />
            </span>
          </Link>
          <Link href="/shop" className="btn-lux btn-outline mt-2 w-full">
            <span>Continue shopping</span>
          </Link>
          <ul className="mt-6 space-y-2 text-[0.66rem] leading-relaxed text-ink/55">
            <li>· 30-day returns on unworn pieces</li>
            <li>· Carbon-neutral delivery</li>
            <li>· Lifetime repairs at the atelier</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
