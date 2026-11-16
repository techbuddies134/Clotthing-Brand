export default function Loading() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center gap-6 pt-[112px]">
      <div className="relative grid size-16 place-items-center">
        <span className="absolute inset-0 animate-spin rounded-full border border-ink/15 border-t-bronze" />
        <span className="font-display text-lg">V</span>
      </div>
      <p className="text-[0.58rem] uppercase tracking-[0.34em] text-muted">Opening the atelier</p>
    </div>
  );
}
