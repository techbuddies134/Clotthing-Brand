"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/types";

export function ShopToolbar({
  counts,
  total,
}: {
  counts: Record<string, number>;
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get("category") ?? "All";
  const activeSort = params.get("sort") ?? "new";
  const activeQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(activeQuery);

  useEffect(() => {
    setQuery(activeQuery);
  }, [activeQuery]);

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "All" || (key === "sort" && value === "new")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`/shop${next.toString() ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  const categories = ["All", ...CATEGORIES];

  return (
    <div className="sticky top-[68px] z-40 -mx-5 border-y border-ink/10 bg-cream/90 px-5 py-4 backdrop-blur-lg md:top-[68px] md:-mx-10 md:px-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map((category) => {
            const active = activeCategory === category;
            const count = category === "All" ? total : (counts[category] ?? 0);
            return (
              <button
                key={category}
                type="button"
                onClick={() => update("category", category)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] transition ${
                  active ? "text-cream" : "text-ink/60 hover:text-ink"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="shop-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">
                  {category}
                  <span className={active ? "ml-1.5 text-cream/60" : "ml-1.5 text-muted"}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              update("q", query);
            }}
            className="flex flex-1 items-center gap-2 border-b border-ink/15 pb-1.5 sm:max-w-xs"
          >
            <Search className="size-3.5 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the atelier"
              aria-label="Search products"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted/70"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  update("q", null);
                }}
              >
                <X className="size-3.5 text-muted hover:text-ink" />
              </button>
            ) : null}
          </form>

          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="size-3.5 text-muted" />
            <label htmlFor="sort" className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">
              Sort
            </label>
            <select
              id="sort"
              value={activeSort}
              onChange={(event) => update("sort", event.target.value)}
              className="border-b border-ink/20 bg-transparent py-1 pr-1 text-[0.68rem] uppercase tracking-[0.12em] outline-none focus:border-bronze"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
