"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { cartSubtotal, shippingFor, useCart } from "@/lib/cart";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/types";

const FIELDS = [
  { name: "name", label: "Full name", placeholder: "Ayesha Rahman", required: true, span: 2, type: "text" },
  { name: "email", label: "Email", placeholder: "you@example.com", required: true, span: 1, type: "email" },
  { name: "phone", label: "Phone", placeholder: "+92 300 000 0000", required: false, span: 1, type: "tel" },
  { name: "address", label: "Address", placeholder: "House / street", required: true, span: 2, type: "text" },
  { name: "city", label: "City", placeholder: "Karachi", required: true, span: 1, type: "text" },
  { name: "postalCode", label: "Postal code", placeholder: "75600", required: false, span: 1, type: "text" },
  { name: "country", label: "Country", placeholder: "Pakistan", required: true, span: 2, type: "text" },
] as const;

export function CheckoutForm() {
  const router = useRouter();
  const { lines, clear } = useCart();
  const mounted = useMounted();
  const [form, setForm] = useState<Record<string, string>>({ country: "Pakistan" });
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lines.length === 0) return;
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { ...form, notes },
          items: lines.map((line) => ({
            slug: line.slug,
            size: line.size,
            color: line.color,
            quantity: line.quantity,
          })),
        }),
      });
      const data = (await response.json()) as { ok?: boolean; orderNumber?: string; error?: string };
      if (!response.ok || !data.ok || !data.orderNumber) {
        throw new Error(data.error ?? "Could not place your order.");
      }
      clear();
      router.push(`/order/${data.orderNumber}`);
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    }
  }

  if (!mounted) {
    return <div className="shimmer h-96 w-full" />;
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-ink/20 px-6 py-24 text-center">
        <ShoppingBag className="size-8 text-muted" />
        <p className="mt-5 font-display text-3xl">Nothing to check out.</p>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          Add a piece to your bag and the studio will take it from there.
        </p>
        <Link href="/shop" className="btn-lux btn-ink mt-7">
          <span>Shop the collection</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div>
        <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
          <span className="grid size-7 place-items-center rounded-full bg-ink text-[0.6rem] text-cream">01</span>
          <p className="text-[0.66rem] uppercase tracking-[0.22em]">Delivery details</p>
        </div>

        <div className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <label
              key={field.name}
              className={`block ${field.span === 2 ? "sm:col-span-2" : ""}`}
            >
              <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                {field.label}
                {field.required ? " *" : ""}
              </span>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={form[field.name] ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, [field.name]: event.target.value }))
                }
                className="field"
              />
            </label>
          ))}
          <label className="mt-2 block sm:col-span-2">
            <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">
              Notes for the atelier (optional)
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Gift wrapping, delivery instructions, a note…"
              className="field resize-none"
            />
          </label>
        </div>

        <div className="mt-8 border border-ink/10 bg-bone/40 p-5">
          <p className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            <Lock className="size-3.5 text-bronze" /> Payment
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            This atelier preview confirms orders without charging a card. A client advisor will
            email you a secure payment link within one business hour.
          </p>
        </div>

        {error ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-red-600"
          >
            {error}
          </motion.p>
        ) : null}

        <button type="submit" disabled={status === "loading"} className="btn-lux btn-ink mt-6 w-full disabled:opacity-70">
          <span>
            {status === "loading" ? (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Confirming with the studio
              </>
            ) : (
              <>
                Place order · {formatPrice(total)} <ArrowRight className="size-3.5" />
              </>
            )}
          </span>
        </button>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-ink/10 bg-bone/40 p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-muted">In the bag</p>
            <Link href="/cart" className="text-[0.58rem] uppercase tracking-[0.18em] underline underline-offset-4">
              Edit
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-ink/10">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-3 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={line.image} alt={line.name} className="h-20 w-16 object-cover" />
                <div className="flex-1">
                  <p className="font-display text-base leading-tight">{line.name}</p>
                  <p className="mt-0.5 text-[0.56rem] uppercase tracking-[0.16em] text-muted">
                    {line.color} · {line.size} · ×{line.quantity}
                  </p>
                </div>
                <p className="text-xs">{formatPrice(line.price * line.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3">
              <span className="eyebrow">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
