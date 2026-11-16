import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";
import { Reveal, SplitWords } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your VESTRA order with complimentary shipping over $200.",
};

export default function CheckoutPage() {
  return (
    <div className="pb-24 pt-[132px] md:pt-[172px]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Step 02 — Checkout</p>
            </Reveal>
            <SplitWords
              as="h1"
              text="Almost yours."
              className="mt-4 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-none"
            />
          </div>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4 text-[0.58rem] uppercase tracking-[0.2em] text-muted">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-bronze" /> Bag
              </span>
              <span className="h-px w-6 bg-ink/20" />
              <span className="flex items-center gap-2 text-ink">
                <span className="size-1.5 rounded-full bg-bronze" /> Details
              </span>
              <span className="h-px w-6 bg-ink/20" />
              <span>Confirmed</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-14">
          <CheckoutForm />
        </div>

        <p className="mt-10 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
          Need help?{" "}
          <Link href="/contact" className="link-line text-ink">
            Talk to client care
          </Link>
        </p>
      </div>
    </div>
  );
}
