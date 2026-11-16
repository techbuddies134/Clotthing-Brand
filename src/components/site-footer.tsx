
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { NewsletterForm } from "@/components/newsletter-form";
import { BRAND } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Outerwear", href: "/shop?category=Outerwear" },
      { label: "Knitwear", href: "/shop?category=Knitwear" },
      { label: "Tailoring", href: "/shop?category=Tailoring" },
      { label: "Essentials", href: "/shop?category=Essentials" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { label: "Our story", href: "/about" },
      { label: "The journal", href: "/journal" },
      { label: "Collections", href: "/shop" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Shipping & returns", href: "/contact" },
      { label: "Size guide", href: "/contact" },
      { label: "Garment care", href: "/contact" },
      { label: "Book a fitting", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen"
        style={{
          backgroundImage: "url('/images/texture-bronze.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative">
        <div className="shell grid gap-12 border-b border-cream/10 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow text-bronze-light">The quiet list</p>

            <h2 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98]">
              Be first to the{" "}
              <span className="italic text-bronze-light">next</span> chapter.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/60">
              Private previews, atelier notes and the occasional letter from our design studio.
              Sent rarely, written carefully.
            </p>

            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow text-cream/40">{column.title}</p>

                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[0.82rem] text-cream/75 transition hover:text-cream"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="shell grid gap-8 border-b border-cream/10 py-10 text-sm text-cream/60 md:grid-cols-3">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-cream/35">
              Studio
            </p>
            <p className="mt-3 leading-relaxed">
              {BRAND.address}
              <br />
              Mon – Sat · 11:00 – 20:00
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-cream/35">
              Write to us
            </p>
            <p className="mt-3 leading-relaxed">
              {BRAND.email}
              <br />
              {BRAND.phone}
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-cream/35">
              Follow
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {["Instagram", "Pinterest", "Substack", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="link-line text-cream/70 hover:text-cream"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="select-none py-6" aria-hidden>
          <Marquee duration={44}>
            <span className="flex items-center">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className="flex items-center">
                  <span className="px-6 font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-[0.04em] text-cream/[0.09]">
                    VESTRA
                  </span>

                  <span className="size-2 rounded-full bg-bronze/50" />

                  <span className="px-6 font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-[0.04em] text-stroke-cream">
                    ATELIER
                  </span>

                  <span className="size-2 rounded-full bg-bronze/50" />
                </span>
              ))}
            </span>
          </Marquee>
        </div>

        <div className="shell flex flex-col gap-4 border-t border-cream/10 py-6 text-[0.6rem] uppercase tracking-[0.2em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} VESTRA Atelier — All rights reserved
          </span>

          <div className="flex flex-wrap items-center gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Visa · Mastercard · Amex</span>

            <span className="normal-case tracking-normal">
              Made by{" "}
              <a
                href="https://portfolio-self-nine-93.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-bronze-light transition hover:text-cream"
              >
                Tech Buddies
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
