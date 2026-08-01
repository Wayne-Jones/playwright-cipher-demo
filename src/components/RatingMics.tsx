interface RatingMicsProps {
  mics: 1 | 2 | 3 | 4 | 5;
}

const FULL = "🎤";
const EMPTY = "○";

export function RatingMics({ mics }: RatingMicsProps) {
  return (
    <p className="mics" data-testid="mics" aria-label={`${mics} out of 5 mics`}>
      {Array.from({ length: mics }, (_, i) => (
        <span key={i} aria-hidden="true">
          {FULL}
        </span>
      ))}
      {Array.from({ length: 5 - mics }, (_, i) => (
        <span key={`e${i}`} aria-hidden="true" className="mics__empty">
          {EMPTY}
        </span>
      ))}
      <span className="mics__count">{mics} mics</span>
    </p>
  );
}
