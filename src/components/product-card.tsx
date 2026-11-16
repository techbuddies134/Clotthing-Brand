"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { formatPrice, type ProductDTO } from "@/lib/types";

export function ProductCard({
  product,
  index = 0,
  tilt = true,
}: {
  product: ProductDTO;
  index?: number;
  tilt?: boolean;
}) {
  const add = useCart((state) => state.add);
  const showToast = useToast((state) => state.show);
  const defaultSize = product.sizes[1] ?? product.sizes[0] ?? "M";
  const defaultColor = product.colors[0]?.name ?? "Natural";

  function quickAdd() {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      size: defaultSize,
      color: defaultColor,
      quantity: 1,
    });
    showToast("Added to bag", `${product.name} · ${defaultSize}`);
  }

  const Wrapper = tilt ? TiltCard : "div";

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Wrapper className={tilt ? "" : "group relative"}>
        <div className="product-media relative aspect-[3/4] w-full overflow-hidden bg-bone [transform:translateZ(30px)]">
          <Link href={`/product/${product.slug}`} aria-label={product.name} className="block h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.name}
              loading={index < 2 ? "eager" : "lazy"}
              className="primary absolute inset-0 h-full w-full object-cover"
            />
            {product.images[1] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[1]}
                alt=""
                loading="lazy"
                aria-hidden
                className="secondary absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </Link>

          {product.badge ? (
            <span className="absolute left-3 top-3 z-10 bg-cream/90 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.22em] text-ink backdrop-blur">
              {product.badge}
            </span>
          ) : null}

          {product.compareAtPrice ? (
            <span className="absolute right-3 top-3 z-10 bg-ink px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.2em] text-cream">
              −{Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
            </span>
          ) : null}

          <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={quickAdd}
              className="flex flex-1 items-center justify-center gap-2 bg-cream/95 py-2.5 text-[0.58rem] uppercase tracking-[0.22em] text-ink backdrop-blur transition hover:bg-ink hover:text-cream"
            >
              <Plus className="size-3" /> Quick add
            </button>
            <Link
              href={`/product/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="grid size-9 place-items-center bg-cream/95 text-ink backdrop-blur transition hover:bg-ink hover:text-cream"
            >
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.52rem] uppercase tracking-[0.24em] text-muted">{product.category}</p>
            <Link href={`/product/${product.slug}`} className="mt-1 block">
              <h3 className="font-display text-[1.18rem] leading-tight transition-colors group-hover:text-bronze">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <p className="text-sm">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-[0.68rem] text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
            ) : (
              <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                ★ {product.rating.toFixed(1)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="size-2.5 rounded-full border border-ink/15"
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <span className="ml-1 text-[0.55rem] uppercase tracking-[0.16em] text-muted">
            {product.sizes.length} sizes
          </span>
        </div>
      </Wrapper>
    </motion.article>
  );
}
