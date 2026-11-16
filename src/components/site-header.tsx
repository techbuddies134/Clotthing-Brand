"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { useMounted } from "@/hooks/use-mounted";
import { NAV_LINKS } from "@/lib/site";
import { CATEGORIES } from "@/lib/types";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const lines = useCart((state) => state.lines);
  const mounted = useMounted();
  const openDrawer = useCart((state) => state.openDrawer);
  const count = mounted ? cartCount(lines) : 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[90]">
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 34, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden bg-ink text-cream"
        >
          <div className="shell flex h-[34px] items-center justify-between text-[0.6rem] uppercase tracking-[0.28em] text-cream/70">
            <span>Complimentary worldwide shipping over $200</span>
            <span className="hidden sm:block">Vol. 04 · Spring / Summer 26</span>
            <Link href="/contact" className="link-line hidden text-cream/80 md:inline-block">
              Client care
            </Link>
          </div>
        </motion.div>

        <motion.header
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(246,241,231,0.86)" : "rgba(246,241,231,0)",
            borderColor: scrolled ? "rgba(20,17,15,0.1)" : "rgba(20,17,15,0)",
            backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5 }}
          className="border-b"
        >
          <div className="shell flex h-[68px] items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-8">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="grid size-9 place-items-center rounded-full border border-ink/15 transition hover:border-ink/40 lg:hidden"
              >
                <Menu className="size-4" />
              </button>

              <Link href="/" className="group flex items-baseline gap-2">
                <span className="font-display text-[1.7rem] leading-none tracking-[0.24em]">VESTRA</span>
                <span className="hidden text-[0.5rem] uppercase tracking-[0.34em] text-muted sm:block">
                  Atelier
                </span>
              </Link>
            </div>

            <nav className="hidden items-center gap-9 text-[0.68rem] uppercase tracking-[0.2em] lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  href="/shop"
                  data-active={pathname === "/shop"}
                  className={`link-line ${pathname === "/shop" ? "text-ink" : "text-ink/70 hover:text-ink"}`}
                >
                  Shop
                </Link>
                <AnimatePresence>
                  {shopOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -left-8 top-full w-[30rem] pt-6"
                    >
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 border border-ink/10 bg-cream p-6 shadow-[0_30px_80px_rgba(20,17,15,0.14)]">
                        <p className="col-span-2 mb-2 text-[0.55rem] uppercase tracking-[0.34em] text-muted">
                          Browse the atelier
                        </p>
                        {CATEGORIES.map((category) => (
                          <Link
                            key={category}
                            href={`/shop?category=${category}`}
                            className="group flex items-center justify-between py-1.5 text-[0.72rem] normal-case tracking-normal text-ink/75 transition hover:text-ink"
                          >
                            {category}
                            <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        ))}
                        <Link
                          href="/shop"
                          className="col-span-2 mt-3 flex items-center justify-between border-t border-ink/10 pt-3 text-[0.62rem] uppercase tracking-[0.24em] text-bronze"
                        >
                          View everything
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={pathname === link.href}
                  className={`link-line ${pathname === link.href ? "text-ink" : "text-ink/70 hover:text-ink"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden text-[0.6rem] uppercase tracking-[0.24em] text-muted xl:block">
                USD / EN
              </span>
              <button
                type="button"
                onClick={openDrawer}
                aria-label={`Open bag, ${count} items`}
                className="group relative flex items-center gap-2 rounded-full border border-ink/15 py-2 pl-3 pr-4 transition hover:border-ink/40"
              >
                <ShoppingBag className="size-4" />
                <span className="text-[0.62rem] uppercase tracking-[0.2em]">Bag</span>
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="grid size-5 place-items-center rounded-full bg-ink text-[0.6rem] text-cream"
                >
                  {count}
                </motion.span>
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-ink text-cream lg:hidden"
          >
            <div className="shell flex h-[68px] items-center justify-between">
              <span className="font-display text-xl tracking-[0.24em]">VESTRA</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-cream/25"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="shell mt-6 flex flex-col">
              {[...NAV_LINKS, { href: "/cart", label: "Your bag" }].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-cream/10"
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-5 font-display text-[2.6rem] leading-none"
                  >
                    {link.label}
                    <ArrowRight className="size-5 text-bronze-light" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="shell mt-8">
              <p className="eyebrow text-cream/40">Collections</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={`/shop?category=${category}`}
                    className="rounded-full border border-cream/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-cream/75"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <p className="mt-10 text-[0.65rem] uppercase tracking-[0.28em] text-cream/40">
                studio@vestra.atelier · +92 21 3456 7890
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
