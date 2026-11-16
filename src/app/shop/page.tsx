import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { ShopToolbar } from "@/components/shop-toolbar";
import { Reveal, SplitWords } from "@/components/reveal";
import { getCategoryCounts, getProducts } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop the atelier",
  description:
    "Browse the full VESTRA atelier collection — sculpted outerwear, cashmere knitwear, tailored sets, denim and resort pieces cut in small runs.",
};

type SearchParams = Promise<{ category?: string; sort?: string; q?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, sort, q } = await searchParams;
  const [products, counts, all] = await Promise.all([
    getProducts({ category, sort, q }),
    getCategoryCounts(),
    getProducts(),
  ]);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-ink/10 pb-10 pt-[132px] md:pb-14 md:pt-[180px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(201,166,120,0.28),transparent_68%)] blur-2xl"
        />
        <div className="shell relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-bronze">Spring / Summer 26</p>
              </Reveal>
              <SplitWords
                as="h1"
                text="Shop the atelier."
                className="mt-4 font-display text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.92]"
              />
            </div>
            <Reveal delay={0.15} className="max-w-sm">
              <p className="text-sm leading-relaxed text-ink/60">
                Twelve pieces in the current volume. Cut in small numbered runs, made to be worn for
                years — not seasons. Complimentary shipping over $200.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 md:mt-14">
            <ShopToolbar counts={counts} total={all.length} />
          </div>
        </div>
      </section>

      <section className="shell pt-10 md:pt-14">
        <div className="mb-6 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-muted">
          <span>
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {category ? ` · ${category}` : ""}
            {q ? ` · “${q}”` : ""}
          </span>
          <span className="hidden sm:block">Hand-finished in small runs</span>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-ink/20 px-6 py-24 text-center">
            <p className="font-display text-3xl">Nothing in this room yet.</p>
            <p className="mt-3 max-w-sm text-sm text-ink/60">
              Try another category, or clear your search and browse the full volume.
            </p>
            <Link href="/shop" className="btn-lux btn-ink mt-7">
              <span>View everything</span>
            </Link>
          </div>
        )}

        <div className="mt-16 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-3">
          {[
            { title: "Complimentary shipping", copy: "On all orders above $200, worldwide, tracked." },
            { title: "30-day returns", copy: "Changed your mind? Send it back — no questions." },
            { title: "Lifetime repairs", copy: "Our atelier will mend your piece, for as long as you wear it." },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-bronze">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border border-ink/10 bg-bone/60 p-7 sm:flex-row sm:items-center md:p-10">
          <div>
            <p className="eyebrow text-bronze">Client services</p>
            <p className="mt-3 max-w-md font-display text-2xl leading-tight md:text-3xl">
              Not sure about sizing? Book a 20-minute virtual fitting with the studio.
            </p>
          </div>
          <Link href="/contact" className="btn-lux btn-ink shrink-0">
            <span>
              Book a fitting <ArrowUpRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
