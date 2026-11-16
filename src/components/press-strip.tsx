import { Marquee } from "@/components/marquee";

const PRESS = ["VOGUE", "ELLE", "HYPEBEAST", "GQ", "DAZED", "MONOCLE", "THE CUT"];

export function PressStrip() {
  return (
    <section className="border-y border-ink/10 bg-bone/60 py-5">
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
        <span className="shrink-0 px-5 text-[0.52rem] uppercase tracking-[0.3em] text-muted md:pl-10">
          As seen in
        </span>
        <Marquee duration={38} className="w-full">
          <div className="flex items-center">
            {PRESS.map((name) => (
              <span key={name} className="flex items-center">
                <span className="px-8 font-display text-xl tracking-[0.16em] text-ink/55 transition hover:text-ink md:text-2xl">
                  {name}
                </span>
                <span className="size-1 rounded-full bg-bronze/60" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
