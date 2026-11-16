"use client";

import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ author: "", title: "", body: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, ...form }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Could not post review");
      setStatus("success");
      setMessage("Thank you — your review is live.");
      setForm({ author: "", title: "", body: "" });
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-ink/10 bg-bone/40 p-5 md:p-7">
      <p className="eyebrow text-bronze">Write a review</p>
      <h3 className="mt-2 font-display text-2xl">How does it wear?</h3>

      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="p-0.5"
          >
            <Star
              className={`size-5 transition ${
                star <= (hovered || rating) ? "fill-bronze text-bronze" : "text-ink/20"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          {rating} / 5
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.author}
          onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
          placeholder="Your name"
          aria-label="Your name"
          className="field"
        />
        <input
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Headline (optional)"
          aria-label="Review headline"
          className="field"
        />
      </div>
      <textarea
        required
        rows={3}
        value={form.body}
        onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
        placeholder="Tell us about the fit, the fabric, the way it moves…"
        aria-label="Your review"
        className="field mt-4 resize-none"
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <motion.p
          key={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-[0.68rem] ${status === "error" ? "text-red-600" : "text-olive"}`}
        >
          {message || "Reviews are published instantly."}
        </motion.p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-lux btn-ink disabled:opacity-60"
        >
          <span>
            {status === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : null}
            {status === "success" ? "Posted" : "Publish review"}
          </span>
        </button>
      </div>
    </form>
  );
}
