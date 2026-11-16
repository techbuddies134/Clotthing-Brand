"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { cartSubtotal, shippingFor, useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { lines, drawerOpen, closeDrawer, setQuantity, remove } = useCart();
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <motion.div className="fixed inset-0 z-[160]" initial={false}>
          <motion.button
            aria-label="Close bag"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full bg-ink/45 backdrop-blur-[3px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col bg-cream shadow-[-30px_0_80px_rgba(20,17,15,0.2)]"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="eyebrow text-muted">Your selection</p>
                <h2 className="mt-1 font-display text-2xl">
                  The Bag <span className="text-sm text-muted">({lines.length})</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="grid size-9 place-items-center rounded-full border border-ink/15 transition hover:rotate-90 hover:border-ink/40"
              >
                <X className="size-4" />
              </button>
            </header>

            {lines.length > 0 ? (
              <div className="border-b border-ink/10 px-6 py-4">
                <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  <span>
                    {remaining === 0 ? "Complimentary shipping unlocked" : `${formatPrice(remaining)} to free shipping`}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="h-full rounded-full bg-bronze"
                  />
                </div>
              </div>
            ) : null}

            <div className="hide-scrollbar flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <span className="grid size-16 place-items-center rounded-full border border-ink/15">
                    <ShoppingBag className="size-6 text-muted" />
                  </span>
                  <p className="mt-5 font-display text-2xl">Your bag is quiet.</p>
                  <p className="mt-2 max-w-[16rem] text-sm text-muted">
                    Add a piece or two — the atelier is open.
                  </p>
                  <Link href="/shop" onClick={closeDrawer} className="btn-lux btn-ink mt-7">
                    <span>Explore the collection</span>
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex gap-4 py-5"
                      >
                        <Link href={`/product/${line.slug}`} onClick={closeDrawer} className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={line.image}
                            alt={line.name}
                            className="h-28 w-20 object-cover"
                            loading="lazy"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeDrawer}
                              className="font-display text-lg leading-tight"
                            >
                              {line.name}
                            </Link>
                            <span className="text-sm">{formatPrice(line.price * line.quantity)}</span>
                          </div>
                          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                            {line.color} · Size {line.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-ink/15">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => setQuantity(line.key, line.quantity - 1)}
                                className="grid size-7 place-items-center transition hover:bg-ink hover:text-cream"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-7 text-center text-xs">{line.quantity}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => setQuantity(line.key, line.quantity + 1)}
                                className="grid size-7 place-items-center transition hover:bg-ink hover:text-cream"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(line.key)}
                              className="text-[0.6rem] uppercase tracking-[0.18em] text-muted underline-offset-4 hover:text-ink hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <footer className="border-t border-ink/10 bg-bone/50 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-base">{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-base">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="eyebrow text-muted">Total</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal + shipping)}</span>
                </div>
                <Link href="/checkout" onClick={closeDrawer} className="btn-lux btn-ink mt-5 w-full">
                  <span>Proceed to checkout</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="mt-3 block text-center text-[0.62rem] uppercase tracking-[0.22em] text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  View full bag
                </Link>
              </footer>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
