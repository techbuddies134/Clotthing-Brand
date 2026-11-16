"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { formatPrice, type ProductDTO } from "@/lib/types";

export function ProductPurchase({ product }: { product: ProductDTO }) {
  const router = useRouter();
  const add = useCart((state) => state.add);
  const showToast = useToast((state) => state.show);
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [color, setColor] = useState(product.colors[0]?.name ?? "Natural");
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd(goToCheckout = false) {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      size,
      color,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    showToast("Added to bag", `${product.name} · ${color} · ${size}`);
    if (goToCheckout) router.push("/checkout");
  }

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between gap-4">
        <p className="font-display text-3xl">{formatPrice(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
        ) : null}
      </div>

      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted">
        Tax included · {product.stock > 12 ? "In stock" : `Only ${product.stock} left`}
      </p>

      {/* colour */}
      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">Colour</p>
          <p className="text-[0.66rem] tracking-wide">{color}</p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              aria-label={option.name}
              aria-pressed={color === option.name}
              onClick={() => setColor(option.name)}
              className={`relative size-8 rounded-full border transition ${
                color === option.name ? "border-ink" : "border-ink/15 hover:border-ink/40"
              }`}
            >
              <span
                className="absolute inset-1 rounded-full"
                style={{ backgroundColor: option.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* size */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">Size</p>
          <span className="text-[0.6rem] uppercase tracking-[0.18em] text-bronze underline underline-offset-4">
            Size guide
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`relative min-w-[3rem] overflow-hidden border px-3 py-2.5 text-[0.66rem] uppercase tracking-[0.12em] transition ${
                size === option
                  ? "border-ink text-cream"
                  : "border-ink/20 text-ink/70 hover:border-ink/60"
              }`}
            >
              {size === option ? (
                <motion.span
                  layoutId="size-fill"
                  className="absolute inset-0 bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* qty + add */}
      <div className="mt-7 flex items-stretch gap-2">
        <div className="flex items-center border border-ink/20">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="grid size-11 place-items-center transition hover:bg-ink hover:text-cream"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
            className="grid size-11 place-items-center transition hover:bg-ink hover:text-cream"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        <button type="button" onClick={() => handleAdd(false)} className="btn-lux btn-ink flex-1">
          <span>
            {added ? (
              <>
                <Check className="size-3.5" /> Added to bag
              </>
            ) : (
              <>
                <ShoppingBag className="size-3.5" /> Add to bag
              </>
            )}
          </span>
        </button>

        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={() => setSaved((prev) => !prev)}
          className={`grid w-12 place-items-center border transition ${
            saved ? "border-bronze bg-bronze/10 text-bronze" : "border-ink/20 hover:border-ink/50"
          }`}
        >
          <Heart className={`size-4 ${saved ? "fill-bronze" : ""}`} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => handleAdd(true)}
        className="btn-lux btn-outline mt-2 w-full"
      >
        <span>
          Buy it now <ArrowUpRight className="size-3.5" />
        </span>
      </button>

      <div className="mt-5 flex items-start gap-3 border border-ink/10 bg-bone/40 p-4">
        <Truck className="mt-0.5 size-4 shrink-0 text-bronze" />
        <div className="text-[0.72rem] leading-relaxed text-ink/65">
          <p className="font-medium text-ink">Free worldwide shipping over $200</p>
          <p className="mt-0.5">
            Dispatched in 1–2 business days from the studio. Carbon-neutral delivery, plastic-free
            packaging.
          </p>
        </div>
      </div>
    </div>
  );
}
