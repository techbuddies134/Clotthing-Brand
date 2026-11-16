"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden pt-[112px]">
      <div className="shell">
        <p className="eyebrow text-bronze">A slight seam</p>
        <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.9]">
          The atelier is catching its breath.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
          Something went wrong while loading this page. Try again, or return to the collection —
          everything else is still hanging on the rail.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn-lux btn-ink">
            <span>Try again</span>
          </button>
          <Link href="/" className="btn-lux btn-outline">
            <span>Back home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
