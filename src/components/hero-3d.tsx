"use client";

import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { EASE } from "@/components/reveal";
import { formatPrice, type ProductDTO } from "@/lib/types";

export function Hero3D({ products }: { products: ProductDTO[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 90, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 90, damping: 18, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  function onSceneMove(event: MouseEvent<HTMLDivElement>) {
    const node = sceneRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 18);
    rotateX.set(-py * 14);
  }

  const ring = products.slice(0, 5);
  const total = ring.length || 1;

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-cream pb-10 pt-[112px] sm:pt-[124px] lg:pb-0"
    >
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,166,120,0.32),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 top-1/4 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(110,115,85,0.22),transparent_68%)] blur-3xl" />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(169,124,78,0.28),transparent_70%)] blur-3xl"
        />
        <div className="absolute inset-y-0 left-[8%] w-px bg-ink/[0.06]" />
        <div className="absolute inset-y-0 right-[8%] w-px bg-ink/[0.06]" />
      </div>

      <div className="shell relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-4">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="relative grid size-2 place-items-center rounded-full bg-bronze text-bronze pulse-ring" />
            <span className="eyebrow text-ink/60">Spring / Summer 26 — Vol. 04</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.95 } } }}
            className="mt-5 font-display text-[clamp(3.2rem,8.4vw,7rem)] leading-[0.9] tracking-[-0.02em]"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "108%" }, show: { y: 0 } }}
                transition={{ duration: 1.1, ease: EASE }}
                className="block"
              >
                Wear the
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "108%" }, show: { y: 0 } }}
                transition={{ duration: 1.1, ease: EASE }}
                className="block"
              >
                quiet <span className="italic text-bronze">noise.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.45, duration: 0.9, ease: EASE }}
            className="mt-6 max-w-[27rem] text-[0.95rem] leading-relaxed text-ink/65"
          >
            Considered essentials, cut in small runs from fabrics that age beautifully. Designed in
            Karachi, made in family-run ateliers across Portugal and Pakistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.9, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/shop" className="btn-lux btn-ink">
              <span>
                Shop the collection
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
            <Link href="/about" className="btn-lux btn-outline">
              <span>Our atelier</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-5"
          >
            {[
              { value: "12", label: "New pieces" },
              { value: "4.9", label: "Avg. rating" },
              { value: "38", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl leading-none">{stat.value}</p>
                <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- 3D wardrobe ---------- */}
        <motion.div
          style={{ scale: sceneScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 1.2 }}
          className="relative"
        >
          <div
            ref={sceneRef}
            onMouseMove={onSceneMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              rotateX.set(0);
              rotateY.set(0);
            }}
            className="scene-3d relative mx-auto h-[clamp(22rem,52vw,34rem)] w-full max-w-[34rem] select-none"
            style={{ "--radius": "clamp(100px, 15vw, 196px)" } as React.CSSProperties}
          >
            {/* orbit rings */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
              <div className="orbit orbit-a size-[clamp(20rem,44vw,29rem)]" />
              <div className="orbit orbit-b size-[clamp(14rem,32vw,21rem)]" />
            </div>

            <motion.div
              style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              <div className={`ring-3d h-full w-full ${hovering ? "paused" : ""}`}>
                {ring.map((product, index) => (
                  <div
                    key={product.id}
                    className="ring-item"
                    style={{
                      transform: `rotateY(${(360 / total) * index}deg) translateZ(var(--radius))`,
                    }}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="group absolute left-1/2 top-1/2 block w-[clamp(8.2rem,15vw,11.5rem)] -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="relative overflow-hidden border border-ink/10 bg-bone shadow-[0_30px_60px_-30px_rgba(20,17,15,0.5)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-3 pt-8 text-cream">
                          <p className="text-[0.5rem] uppercase tracking-[0.2em] text-cream/70">
                            {product.category}
                          </p>
                          <p className="mt-0.5 font-display text-sm leading-tight">{product.name}</p>
                          <p className="mt-1 text-[0.6rem] tracking-wide">{formatPrice(product.price)}</p>
                        </div>
                        <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-cream/85 text-ink opacity-0 transition group-hover:opacity-100">
                          <ArrowUpRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* center emblem */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid size-[clamp(6rem,12vw,9rem)] place-items-center rounded-full border border-bronze/30 bg-cream/70 backdrop-blur-sm">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dashed border-bronze/40"
                  />
                  <div className="text-center">
                    <Sparkles className="mx-auto size-3 text-bronze" />
                    <p className="mt-1 font-display text-lg leading-none">SS/26</p>
                    <p className="mt-1 text-[0.42rem] uppercase tracking-[0.24em] text-muted">Atelier</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* floating glass chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-1 top-6 z-20 border border-ink/10 bg-cream/85 px-3 py-2 backdrop-blur-md sm:left-2"
            >
              <p className="text-[0.5rem] uppercase tracking-[0.2em] text-muted">Fabric</p>
              <p className="font-display text-sm leading-tight">Grade-A cashmere</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 bottom-8 z-20 border border-ink/10 bg-ink/90 px-3 py-2 text-cream backdrop-blur-md sm:right-2"
            >
              <p className="text-[0.5rem] uppercase tracking-[0.2em] text-cream/50">Made in</p>
              <p className="font-display text-sm leading-tight">Small runs · 38 nations</p>
            </motion.div>

            <div
              aria-hidden
              className="absolute inset-x-8 bottom-2 h-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(20,17,15,0.24),transparent_70%)] blur-md"
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
            <p className="text-[0.55rem] uppercase tracking-[0.24em] text-muted">
              Drag your eye across the rail
            </p>
            <p className="hidden text-[0.55rem] uppercase tracking-[0.24em] text-muted sm:block">
              05 / {String(products.length).padStart(2, "0")} pieces
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.52rem] uppercase tracking-[0.34em] text-muted">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5 text-bronze" />
        </motion.span>
      </motion.div>
    </section>
  );
}
