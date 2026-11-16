import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Accordion } from "@/components/accordion";
import { ContactForm } from "@/components/contact-form";
import { Reveal, SplitWords } from "@/components/reveal";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & client care",
  description:
    "Speak to the VESTRA studio about sizing, orders, repairs or a private fitting appointment.",
};

const FAQ = [
  {
    title: "How does VESTRA sizing run?",
    content:
      "Our pieces are cut with a relaxed, modern line and fit true to size. Knitwear is intentionally generous — size down for a closer fit. Every product page lists the model's height and size worn. If you are between sizes, write to us and we will advise personally.",
  },
  {
    title: "When will my order ship?",
    content:
      "Orders are packed by hand within one to two business days from the Karachi studio. Tracked, carbon-neutral shipping is complimentary on orders above $200; a flat $15 applies below that.",
  },
  {
    title: "What is your returns policy?",
    content:
      "Unworn pieces with tags attached can be returned within 30 days of delivery for a full refund or exchange. Start a return by writing to studio@vestra.atelier with your order number.",
  },
  {
    title: "Do you repair pieces after purchase?",
    content:
      "Yes — for the life of the garment. The first five years of repairs are complimentary, and afterwards we repair at cost. Post your piece to the studio or book an appointment.",
  },
  {
    title: "Can I book a private fitting?",
    content:
      "The studio is open by appointment Monday to Saturday, 11:00–20:00. Virtual fittings are available worldwide and take around 20 minutes. Email or use the form above to book.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-20 pt-[132px] md:pt-[172px]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Client care</p>
            </Reveal>
            <SplitWords
              as="h1"
              text="Talk to the studio."
              className="mt-4 font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.92]"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              No call centres. Your message lands with the same small team that cuts the clothes.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ContactForm />

          <div className="space-y-6">
            <div className="relative overflow-hidden border border-ink/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,166,120,0.35),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(110,115,85,0.3),transparent_60%)]" />
              <div className="relative grid gap-5 p-6">
                {[
                  { icon: MapPin, label: "Studio", value: BRAND.address },
                  { icon: Mail, label: "Email", value: BRAND.email },
                  { icon: Phone, label: "Telephone", value: BRAND.phone },
                  { icon: Clock, label: "Hours", value: "Mon – Sat · 11:00 – 20:00 (PKT)" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 bg-cream/60">
                      <item.icon className="size-3.5 text-bronze" />
                    </span>
                    <div>
                      <p className="text-[0.55rem] uppercase tracking-[0.22em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-ink/10 p-6">
              <p className="eyebrow text-bronze">Virtual fitting</p>
              <p className="mt-3 font-display text-2xl leading-tight">
                Twenty minutes, one stylist, your wardrobe.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                Book a video appointment and we will pull pieces for your body, your climate and the
                way you actually dress.
              </p>
              <Link href="/shop" className="btn-lux btn-outline mt-5 w-full">
                <span>Browse before you book</span>
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.6fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-bronze">Answers</p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Before you write."
              className="mt-4 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1]"
            />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
                The questions we are asked most often. Anything else — the studio inbox is always
                open.
              </p>
            </Reveal>
          </div>
          <div>
            <Accordion items={FAQ} defaultOpen={0} />
          </div>
        </section>
      </div>
    </div>
  );
}
