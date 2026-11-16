import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { Reveal, SplitWords } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review your VESTRA selection before checkout.",
};

export default function CartPage() {
  return (
    <div className="pb-24 pt-[132px] md:pt-[172px]">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-bronze">Step 01 — Selection</p>
        </Reveal>
        <SplitWords
          as="h1"
          text="Your bag."
          className="mt-4 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-none"
        />
        <div className="mt-10 md:mt-14">
          <CartView />
        </div>
      </div>
    </div>
  );
}
