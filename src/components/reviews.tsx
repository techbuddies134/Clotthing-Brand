import { Star } from "lucide-react";
import type { ReviewDTO } from "@/lib/types";

function Stars({ rating, size = "size-3" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${size} ${index < Math.round(rating) ? "fill-bronze text-bronze" : "text-ink/20"}`}
        />
      ))}
    </div>
  );
}

export function ReviewSummary({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-6 border-y border-ink/10 py-6">
      <div>
        <p className="font-display text-5xl leading-none">{rating.toFixed(1)}</p>
        <div className="mt-2">
          <Stars rating={rating} />
        </div>
        <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted">{count} reviews</p>
      </div>
      <div className="flex-1 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const weight = star === Math.round(rating) ? 78 : star === 5 ? 64 : Math.max(4, 22 - star * 4);
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-3 text-[0.62rem] text-muted">{star}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-bronze" style={{ width: `${weight}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ReviewList({ reviews }: { reviews: ReviewDTO[] }) {
  if (reviews.length === 0) {
    return (
      <p className="py-8 text-sm text-ink/55">
        No written reviews yet for this piece. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-ink/10">
      {reviews.map((review) => (
        <li key={review.id} className="py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-bone font-display text-sm">
                {review.author.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                  Verified client · {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Stars rating={review.rating} />
          </div>
          {review.title ? (
            <p className="mt-3 font-display text-lg leading-tight">{review.title}</p>
          ) : null}
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink/65">{review.body}</p>
        </li>
      ))}
    </ul>
  );
}
