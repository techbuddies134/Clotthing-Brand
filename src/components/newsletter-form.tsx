"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export function NewsletterForm({ dark = true, compact = false }: { dark?: boolean; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setMessage("Welcome to the quiet list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className={`field pr-14 ${dark ? "field-dark" : ""} ${compact ? "text-sm" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className={`absolute right-0 grid size-10 place-items-center rounded-full border transition duration-500 ${
            dark
              ? "border-cream/25 text-cream hover:border-bronze-light hover:bg-bronze-light hover:text-ink"
              : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream"
          }`}
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-3 min-h-[1rem] text-[0.68rem] tracking-wide ${
          status === "error"
            ? "text-red-400"
            : dark
              ? "text-cream/55"
              : "text-muted"
        }`}
      >
        {message || "No noise. Only new arrivals, atelier notes and private previews."}
      </motion.p>
    </form>
  );
}
