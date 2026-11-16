import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star } from "lucide-react";
import { Accordion } from "@/components/accordion";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductGrid } from "@/components/product-grid";
import { ReviewForm } from "@/components/review-form";
import { ReviewList, ReviewSummary } from "@/components/reviews";
import { Reveal, SplitWords } from "@/components/reveal";
import { getProductBySlug, getProductReviews, getRelatedProducts } from "@/db/queries";
import { formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} · VESTRA Atelier`,
      description: product.shortDescription,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product),
  ]);

  return (
    <div className="pb-20 pt-[112px] sm:pt-[124px]">
      <div className="shell">
        <nav className="flex items-center gap-2 py-5 text-[0.6rem] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-ink/70">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />

          <div className="lg:pt-2">
            <p className="eyebrow text-bronze">{product.category}</p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-3 ${
                      index < Math.round(product.rating) ? "fill-bronze text-bronze" : "text-ink/20"
                    }`}
                  />
                ))}
              </span>
              <a href="#reviews" className="link-line text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                {product.reviewCount} reviews
              </a>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
              {product.shortDescription}
            </p>

            <ProductPurchase product={product} />

            <div className="mt-8">
              <Accordion
                items={[
                  {
                    title: "The details",
                    content: (
                      <ul className="space-y-1.5">
                        {product.details.map((detail) => (
                          <li key={detail} className="flex gap-2">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-bronze" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Materials & make",
                    content: (
                      <p>
                        {product.materials}. Cut and finished in a family-run atelier in small
                        numbered runs. Every piece carries the maker&apos;s mark inside the seam.
                      </p>
                    ),
                  },
                  { title: "Care", content: <p>{product.care}</p> },
                  {
                    title: "Shipping & returns",
                    content: (
                      <p>
                        Complimentary tracked shipping on orders over $200. Dispatched within 1–2
                        business days. 30-day returns on unworn pieces with tags attached — start a
                        return by writing to studio@vestra.atelier.
                      </p>
                    ),
                  },
                ]}
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 text-[0.58rem] uppercase tracking-[0.18em] text-muted">
              <span>SKU · VST-{String(product.id).padStart(3, "0")}</span>
              <span>{formatPrice(product.price)} · Tax included</span>
            </div>
          </div>
        </div>

        {/* story */}
        <Reveal className="mt-20 grid gap-8 border-t border-ink/10 pt-12 md:mt-24 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p className="eyebrow text-bronze">The story</p>
            <p className="mt-3 font-display text-3xl leading-tight">
              {product.collection === "atelier" ? "Atelier volume" : "Everyday volume"}
            </p>
          </div>
          <div className="max-w-2xl">
            <p className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.35] text-ink/85">
              {product.description}
            </p>
            <div className="mt-6 grid gap-4 text-sm leading-relaxed text-ink/60 sm:grid-cols-2">
              <p>
                Designed to be worn on repeat and repaired rather than replaced. The fabric is
                milled in traceable facilities; the cutting is done in runs of fewer than 300
                pieces.
              </p>
              <p>
                Model is 178cm and wears a size S. This piece fits true to size with a relaxed line —
                take your usual size for the intended silhouette, or size down for a closer fit.
              </p>
            </div>
          </div>
        </Reveal>

        {/* reviews */}
        <section id="reviews" className="mt-20 scroll-mt-32 md:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-bronze">Worn & reviewed</p>
              <SplitWords
                as="h2"
                text="The verdict."
                className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none"
              />
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted">
              Reviews come from verified clients. We never edit or remove honest feedback.
            </p>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <ReviewSummary rating={product.rating} count={product.reviewCount} />
              <ReviewList reviews={reviews} />
            </div>
            <ReviewForm productId={product.id} />
          </div>
        </section>

        {/* related */}
        <section className="mt-20 md:mt-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-none">
              Wear it with
            </h2>
            <Link href="/shop" className="link-line text-[0.62rem] uppercase tracking-[0.2em]">
              All pieces
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} tilt={false} />
          </div>
        </section>
      </div>
    </div>
  );
}
