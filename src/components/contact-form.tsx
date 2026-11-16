"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

const SUBJECTS = ["General enquiry", "Sizing & fit", "Order status", "Repairs", "Press", "Studio visit"];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], body: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Could not send your message.");
      setStatus("success");
      setMessage("Thank you — a client advisor will reply within one business day.");
      setForm({ name: "", email: "", subject: SUBJECTS[0], body: "" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-ink/10 bg-bone/40 p-6 md:p-8">
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">Your name *</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Ayesha Rahman"
            className="field"
          />
        </label>
        <label className="block">
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">Email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="you@example.com"
            className="field"
          />
        </label>
        <label className="mt-2 block sm:col-span-2">
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">Subject</span>
          <select
            value={form.subject}
            onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
            className="field"
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-2 block sm:col-span-2">
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">Message *</span>
          <textarea
            required
            rows={5}
            value={form.body}
            onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
            placeholder="How can the studio help?"
            className="field resize-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-xs text-[0.7rem] leading-relaxed ${
            status === "error" ? "text-red-600" : "text-ink/55"
          }`}
        >
          {message || "We reply to every message ourselves, usually within one business day."}
        </motion.p>
        <button type="submit" disabled={status === "loading"} className="btn-lux btn-ink disabled:opacity-60">
          <span>
            {status === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : null}
            {status === "success" ? (
              <>
                <Check className="size-3.5" /> Sent
              </>
            ) : (
              <>
                Send message <ArrowRight className="size-3.5" />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
