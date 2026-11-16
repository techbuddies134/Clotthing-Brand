import Link from "next/link";
import { ArrowUpRight, Leaf, Ruler, Scissors, Truck } from "lucide-react";
import { Hero3D } from "@/components/hero-3d";
import { PressStrip } from "@/components/press-strip";
import { ProductGrid } from "@/components/product-grid";
import { ParallaxImage } from "@/components/parallax-image";
import { LookbookScroll } from "@/components/lookbook-scroll";
import { Testimonials } from "@/components/testimonials";
import { StatRow } from "@/components/counters";
import { TiltCard } from "@/components/tilt-card";
import { Reveal, SplitWords } from "@/components/reveal";
import { getFeaturedProducts, getProducts } from "@/db/queries";

export const dynamic = "force-dynamic";

const COLLECTIONS = [
  {
    title: "The Atelier",
    copy: "Sculpted outerwear and half-canvassed tailoring. The pieces we build a wardrobe around.",
    href: "/shop?category=Outerwear",
    image:
      "https://images.pexels.com/photos/4456720/pexels-photo-4456720.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100",
    span: "lg:col-span-7",
    height: "h-[26rem] lg:h-[34rem]",
  },
  {
    title: "Off Duty",
    copy: "Heavyweight cotton, soft knits, nothing to prove.",
    href: "/shop?category=Essentials",
    image:
      "https://images.pexels.com/photos/4356112/pexels-photo-4356112.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100",
    span: "lg:col-span-5",
    height: "h-[22rem] lg:h-[34rem]",
  },
  {
    title: "Resort",
    copy: "Bias-cut silk and washed linen for the long, slow months.",
    href: "/shop?category=Dresses",
    image:
      "https://images.pexels.com/photos/20620137/pexels-photo-20620137.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100",
    span: "lg:col-span-5",
    height: "h-[22rem] lg:h-[30rem]",
  },
  {
    title: "The Knit Room",
    copy: "Grade-A cashmere and extra-fine merino, spun for a decade of wear.",
    href: "/shop?category=Knitwear",
    image:
      "https://images.pexels.com/photos/19119434/pexels-photo-19119434.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100",
    span: "lg:col-span-7",
    height: "h-[26rem] lg:h-[30rem]",
  },
];

const VALUES = [
  {
    n: "01",
    title: "Fabric first",
    copy: "We begin with the mill, not the sketch. Grade-A cashmere, European flax, Japanese selvedge — the cloth decides the garment.",
    icon: Leaf,
  },
  {
    n: "02",
    title: "Small runs, no waste",
    copy: "Every piece is cut in numbered runs of under 300. Nothing is over-produced, nothing is destroyed at the end of a season.",
    icon: Scissors,
  },
  {
    n: "03",
    title: "Fit, obsessed over",
    copy: "Two fittings per silhouette, on real bodies. We adjust the armhole, the rise, the drape — the things you feel but never see.",
    icon: Ruler,
  },
  {
    n: "04",
    title: "Delivered with care",
    copy: "Plastic-free packaging, carbon-neutral shipping worldwide, and a repair service for the life of every garment.",
    icon: Truck,
  },
];

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedProducts(4), getProducts()]);
  const heroProducts = featured.length >= 4 ? [...featured, all.find((p) => !p.featured) ?? all[0]] : all.slice(0, 5);

  return (
    <>
      <Hero3D products={heroProducts.filter(Boolean)} />
      <PressStrip />

      {/* ---------- The new edit ---------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-bronze">Volume 04 — just landed</p>
              </Reveal>
              <SplitWords
                as="h2"
                text="The new edit."
                className="mt-4 font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[0.94]"
              />
            </div>
            <Reveal delay={0.15} className="max-w-sm">
              <p className="text-sm leading-relaxed text-ink/60">
                Twelve pieces designed to work with what you already own. Cut once, cut well, and
                keep it out of the landfill.
              </p>
              <Link href="/shop" className="btn-lux btn-outline mt-5">
                <span>
                  View all pieces <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-16">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      {/* ---------- Editorial split ---------- */}
      <section className="relative overflow-hidden bg-bone/70 py-16 md:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <ParallaxImage
              src="https://www.newportworldresorts.com/sites/default/files/inline-images/image7_12.jpg"
              alt="Folded knitwear and atelier tools on limestone"
              className="aspect-[4/5] w-full"
              strength={40}
            />
            <Reveal
              delay={0.2}
              className="absolute -bottom-6 -right-4 w-[13rem] border border-ink/10 bg-cream p-4 shadow-[0_24px_60px_-24px_rgba(20,17,15,0.35)] sm:-right-8 sm:w-[15rem]"
            >
              <p className="eyebrow text-muted">House note</p>
              <p className="mt-2 font-display text-xl leading-tight">
                “Make it last longer than it stays in fashion.”
              </p>
              <p className="mt-3 text-[0.58rem] uppercase tracking-[0.2em] text-bronze">
                — Naila Farooq, founder
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Inside the atelier</p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Considered, from the seam out."
              className="mt-5 max-w-lg font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[0.98]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65">
                VESTRA began in 2016 with eleven trench coats and a stubborn idea: that clothing
                should be quiet, well made, and worn until it falls apart. A decade later we still
                cut in small runs, still fit on real bodies, and still answer the studio phone
                ourselves.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-lux btn-ink">
                  <span>
                    Read our story <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
                <Link href="/journal" className="btn-lux btn-outline">
                  <span>The journal</span>
                </Link>
              </div>
            </Reveal>
            <div className="mt-12">
              <StatRow
                stats={[
                  { value: 10, suffix: "yrs", label: "Of cutting cloth" },
                  { value: 32, suffix: "k", label: "Pieces worn" },
                  { value: 4.9, decimals: 1, label: "Average rating" },
                  { value: 100, suffix: "%", label: "Traceable mills" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Collections ---------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-bronze">Four rooms, one wardrobe</p>
              </Reveal>
              <SplitWords
                as="h2"
                text="The collections."
                className="mt-4 font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[0.94]"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-sm leading-relaxed text-ink/60">
                Explore by mood rather than category. Every room is designed to be worn with the
                others.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
            {COLLECTIONS.map((collection, index) => (
              <Reveal
                key={collection.title}
                delay={index * 0.08}
                className={collection.span}
              >
                <TiltCard strength={5} className="h-full">
                  <Link
                    href={collection.href}
                    className={`group relative block overflow-hidden bg-ink ${collection.height}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={collection.image}
                      alt={collection.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-[1.4s] ease-out group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-cream md:p-7">
                      <div>
                        <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-none">
                          {collection.title}
                        </h3>
                        <p className="mt-2 max-w-xs text-xs leading-relaxed text-cream/65">
                          {collection.copy}
                        </p>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/40 transition duration-500 group-hover:bg-cream group-hover:text-ink">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <span className="absolute left-5 top-5 text-[0.55rem] uppercase tracking-[0.28em] text-cream/60">
                      0{index + 1}
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LookbookScroll />

      {/* ---------- Values ---------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="eyebrow text-bronze">How we make things</p>
              </Reveal>
              <SplitWords
                as="h2"
                text="Slower by design."
                className="mt-5 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.94]"
              />
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
                  Four commitments that shape every decision in the studio — from the mill we call
                  to the box that arrives at your door.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Link href="/about" className="btn-lux btn-ink mt-7">
                  <span>Inside the studio</span>
                </Link>
              </Reveal>
            </div>

            <div className="flex flex-col">
              {VALUES.map((value, index) => (
                <Reveal key={value.n} delay={index * 0.06}>
                  <div className="group flex items-start gap-5 border-t border-ink/10 py-7 transition-colors last:border-b hover:border-bronze/50">
                    <span className="mt-1 font-display text-sm text-bronze">{value.n}</span>
                    <value.icon className="mt-0.5 size-4 shrink-0 text-ink/45 transition-colors group-hover:text-bronze" />
                    <div>
                      <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-1">
                        {value.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                        {value.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ---------- Closing CTA ---------- */}
      <section className="relative overflow-hidden">
        <div className="relative isolate overflow-hidden bg-ink px-6 py-20 text-cream md:py-28">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 opacity-45"
            style={{
              backgroundImage: "url('/images/texture-bronze.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
          <div className="shell relative">
            <Reveal>
              <p className="eyebrow text-bronze-light">The studio is open</p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Find the piece you keep."
              className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.92]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
                Free worldwide shipping over $200, 30-day returns, and a repair atelier that will
                look after your pieces for life.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-lux btn-cream">
                  <span>
                    Shop the collection <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
                <Link href="/contact" className="btn-lux btn-cream">
                  <span>Book a fitting</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
