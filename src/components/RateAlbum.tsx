interface RateAlbumProps {
  slug: string;
}

/**
 * B-Side v1 — broken on purpose: the mics look clickable,
 * but the click evaporates. No state, no persistence.
 */
export function RateAlbum({ slug }: RateAlbumProps) {
  return (
    <div className="rate" data-testid="rate-album">
      <p className="rate__label" id={`rate-label-${slug}`}>
        Your rating
      </p>
      <div className="rate__mics" role="group" aria-labelledby={`rate-label-${slug}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className="rate__mic" aria-label={`${n} out of 5 mics`}>
            🎤
          </button>
        ))}
      </div>
      <p className="rate__value" data-testid="rate-value">
        Your rating: not rated yet
      </p>
    </div>
  );
}
