import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/parallax-image";
import { Reveal, SplitWords, StaggerGroup, StaggerItem } from "@/components/reveal";
import { StatRow } from "@/components/counters";
import { TiltCard } from "@/components/tilt-card";

export const metadata: Metadata = {
  title: "The atelier",
  description:
    "VESTRA began in 2016 with eleven trench coats and a stubborn idea: clothing should be quiet, well made, and worn until it falls apart.",
};

const TIMELINE = [
  {
    year: "2016",
    title: "Eleven trench coats",
    copy: "Founded by Naila Farooq in a two-room studio in Karachi. The first run of eleven trenches sold to friends and one very persuasive stranger.",
  },
  {
    year: "2018",
    title: "The first mill partnership",
    copy: "A handshake with a fourth-generation family mill outside Porto gives VESTRA access to deadstock wool and its first European atelier.",
  },
  {
    year: "2021",
    title: "Cashmere, rethought",
    copy: "We spend eighteen months developing the Cloud Knit — 12-gauge grade-A cashmere that weighs less than a shirt but wears for a decade.",
  },
  {
    year: "2023",
    title: "Repairs, forever",
    copy: "The repair atelier opens. Any VESTRA piece, any age, mended by the same hands that made it. No charge for the first five years.",
  },
  {
    year: "2026",
    title: "Volume 04",
    copy: "Twelve pieces, four collections and 38 countries later, the studio is still cutting in numbered runs of under 300.",
  },
];

const CREATIVES = [
  {
    name: "Naila Farooq",
    role: "Founder & creative director",
    image:
      "https://images.pexels.com/photos/36742654/pexels-photo-36742654.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    name: "Imran Qureshi",
    role: "Head of tailoring",
    image:
      "https://images.pexels.com/photos/18397213/pexels-photo-18397213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    name: "Sofia Lindqvist",
    role: "Fabric & sustainability",
    image:
      "https://images.pexels.com/photos/10322183/pexels-photo-10322183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20 pt-[112px] sm:pt-[124px]">
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="shell grid items-end gap-8 pb-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Since 2016 · Karachi / Copenhagen</p>
            </Reveal>
            <SplitWords
              as="h1"
              text="The atelier."
              className="mt-4 font-display text-[clamp(3.4rem,10vw,8rem)] leading-[0.86]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/65">
                A modern house of considered essentials. We design slowly, cut in small numbered
                runs, and make clothing meant to outlive the season it was born in.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative">
              <ParallaxImage
                src="/images/atelier-still.jpg"
                alt="Inside the VESTRA atelier"
                className="aspect-[5/4] w-full"
                strength={40}
              />
              <span className="absolute -left-3 -top-3 border border-ink/15 bg-cream px-3 py-2 text-[0.55rem] uppercase tracking-[0.22em]">
                Est. 2016
              </span>
            </div>
          </Reveal>
        </div>
        <div className="shell">
          <StatRow
            stats={[
              { value: 10, suffix: "yrs", label: "Of cutting cloth" },
              { value: 38, label: "Countries shipped" },
              { value: 32, suffix: "k", label: "Pieces in the wild" },
              { value: 100, suffix: "%", label: "Traceable mills" },
            ]}
          />
        </div>
      </section>

      {/* manifesto */}
      <section className="relative mt-16 overflow-hidden bg-ink py-20 text-cream md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('/images/texture-bronze.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze-light">The manifesto</p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Quiet is a design decision."
              className="mt-5 max-w-md font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98]"
            />
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-cream/70 md:text-base">
            <Reveal delay={0.1}>
              <p>
                We are not interested in being the loudest thing in your wardrobe. We are interested
                in the coat you reach for without thinking, the knit that has softened around you,
                the trousers that still fit after a decade.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Every VESTRA piece begins with a fabric, not a trend. We work with mills we have
                visited, cut in runs small enough that nothing is wasted, and finish each garment on
                the inside as carefully as the outside.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="font-display text-2xl leading-snug text-cream">
                “Good clothing is a long conversation, not a season.”
              </p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-cream/40">
                — Naila Farooq, founder
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SplitWords
              as="h2"
              text="A decade, in seams."
              className="max-w-lg font-display text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[0.98]"
            />
            <Reveal>
              <p className="max-w-xs text-sm leading-relaxed text-ink/60">
                No funding rounds, no celebrity ambassadors. Just a studio, a mill list and a
                growing circle of people who wear the clothes.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-ink/10">
            {TIMELINE.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.05}>
                <div className="group grid gap-3 border-b border-ink/10 py-7 transition-colors hover:border-bronze/50 sm:grid-cols-[8rem_1fr] md:gap-8">
                  <span className="font-display text-3xl text-bronze md:text-4xl">{entry.year}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                      {entry.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60">{entry.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* people */}
      <section className="bg-bone/60 py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-bronze">The hands behind it</p>
          </Reveal>
          <SplitWords
            as="h2"
            text="Small studio. Long experience."
            className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1]"
          />
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {CREATIVES.map((person) => (
              <StaggerItem key={person.name}>
                <TiltCard strength={6}>
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover grayscale transition duration-[1.2s] hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-3 font-display text-xl">{person.name}</p>
                  <p className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">{person.role}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="shell py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 border border-ink/10 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="eyebrow text-bronze">Visit us</p>
            <p className="mt-3 max-w-lg font-display text-3xl leading-tight">
              The studio is open by appointment, Monday to Saturday.
            </p>
          </div>
          <Link href="/contact" className="btn-lux btn-ink shrink-0">
            <span>
              Book a studio visit <ArrowUpRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
