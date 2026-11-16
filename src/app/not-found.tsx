import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden pt-[112px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-16 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(201,166,120,0.3),transparent_65%)] blur-2xl"
      />
      <div className="shell relative">
        <p className="eyebrow text-bronze">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3.4rem,12vw,9rem)] leading-[0.85]">
          Off the rail.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
          This page has been archived, moved, or never existed. The current volume is waiting in
          the atelier.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-lux btn-ink">
            <span>Shop the collection</span>
          </Link>
          <Link href="/" className="btn-lux btn-outline">
            <span>
              <ArrowLeft className="size-3.5" /> Back home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
