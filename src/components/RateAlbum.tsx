import { useState } from "react";

interface RateAlbumProps {
  slug: string;
}

const key = (slug: string) => `boombox:rating:${slug}`;

function load(slug: string): number {
  try {
    return Number.parseInt(localStorage.getItem(key(slug)) ?? "", 10) || 0;
  } catch {
    return 0;
  }
}

function save(slug: string, rating: number) {
  try {
    localStorage.setItem(key(slug), String(rating));
  } catch {
    // storage unavailable — the rating lives for this visit only
  }
}

/**
 * The B-Side: a listener rates the album out of 5 mics.
 * The rating is stored in localStorage, so it survives a reload —
 * like a favorite that stays on the shelf.
 */
export function RateAlbum({ slug }: RateAlbumProps) {
  const [rating, setRating] = useState(() => load(slug));

  const select = (n: number) => {
    setRating(n);
    save(slug, n);
  };

  return (
    <div className="flex flex-col gap-2" data-testid="rate-album">
      <p
        className="text-xs font-extrabold tracking-widest uppercase text-gray-400 mb-3"
        id={`rate-label-${slug}`}
      >
        Your rating
      </p>
      <div
        className="flex gap-1"
        role="group"
        aria-labelledby={`rate-label-${slug}`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={
              n <= rating
                ? "text-xl font-bold text-green-700 scale-110 transition-transform"
                : "text-xl font-bold text-gray-500 opacity-50 hover:opacity-80 transition-opacity"
            }
            aria-label={`${n} out of 5 mics`}
            aria-pressed={n <= rating}
            onClick={() => select(n)}
          >
            🎤
          </button>
        ))}
      </div>
      <p className="text-gray-400 text-xs mt-2" data-testid="rate-value">
        Your rating:{" "}
        {rating > 0 ? `${rating} mic${rating > 1 ? "s" : ""}` : "not rated yet"}
      </p>
    </div>
  );
}
