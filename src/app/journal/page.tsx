import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitWords, StaggerGroup, StaggerItem } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "The journal",
  description:
    "Notes from the VESTRA atelier — on fabric, fit, repair and the quiet art of dressing well.",
};

const FEATURED = {
  tag: "Fabric notes",
  title: "Why we wait eighteen months for cashmere",
  excerpt:
    "A visit to the mill in Ulaanbaatar that spins our Cloud Knit, and an argument for slowing down the part of fashion nobody photographs.",
  image:
    "https://images.pexels.com/photos/19119435/pexels-photo-19119435.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100",
  reading: "8 min read",
};

const POSTS = [
  {
    tag: "Craft",
    title: "The half-canvas, explained",
    excerpt:
      "What actually happens between the lining and the wool of a good blazer — and why it changes the way it falls.",
    image:
      "https://images.pexels.com/photos/6765639/pexels-photo-6765639.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    reading: "5 min read",
  },
  {
    tag: "Fit",
    title: "A trench, three ways",
    excerpt:
      "Belted, unbelted, or thrown over a knit. Our stylist on getting the most out of one silhouette.",
    image:
      "https://images.pexels.com/photos/5424917/pexels-photo-5424917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    reading: "4 min read",
  },
  {
    tag: "Repair",
    title: "The case for mending",
    excerpt:
      "Inside the repair atelier where a ten-year-old overcoat gets a second life, one invisible stitch at a time.",
    image:
      "https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    reading: "6 min read",
  },
  {
    tag: "Studio",
    title: "Twelve pieces, one wardrobe",
    excerpt:
      "How we edited Volume 04 down from forty-one samples to the twelve that made the cut.",
    image:
      "https://images.pexels.com/photos/8346041/pexels-photo-8346041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    reading: "7 min read",
  },
];

export default function JournalPage() {
  return (
    <div className="pb-20 pt-[132px] md:pt-[172px]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Notes from the atelier</p>
            </Reveal>
            <SplitWords
              as="h1"
              text="The journal."
              className="mt-4 font-display text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.9]"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              Long reads on fabric, fit and the slow business of making things properly. Published
              monthly, written in the studio.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <Link href="/journal" className="group grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FEATURED.image}
                alt={FEATURED.title}
                className="aspect-[16/10] w-full object-cover transition duration-[1.5s] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-[0.52rem] uppercase tracking-[0.24em] backdrop-blur">
                {FEATURED.tag}
              </span>
            </div>
            <div className="lg:pr-6">
              <p className="text-[0.55rem] uppercase tracking-[0.24em] text-muted">
                Featured · {FEATURED.reading}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] transition-colors group-hover:text-bronze">
                {FEATURED.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">{FEATURED.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em]">
                Read the story
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {POSTS.map((post) => (
            <StaggerItem key={post.title}>
              <TiltCard strength={5}>
                <article className="group">
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition duration-[1.3s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[0.52rem] uppercase tracking-[0.24em] text-bronze">
                    {post.tag} · {post.reading}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-tight transition-colors group-hover:text-bronze">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-ink/60">{post.excerpt}</p>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-16 grid gap-8 border border-ink/10 bg-bone/50 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow text-bronze">Letters, not newsletters</p>
            <p className="mt-4 font-display text-3xl leading-tight">
              One considered email a month. No sales, no noise.
            </p>
          </div>
          <div className="self-center">
            <NewsletterForm dark={false} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
