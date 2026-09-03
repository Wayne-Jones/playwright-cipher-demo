interface RatingMicsProps {
  mics: 1 | 2 | 3 | 4 | 5;
}

const FULL = "🎤";
const EMPTY = "○";

export function RatingMics({ mics }: RatingMicsProps) {
  return (
    <p
      className="flex items-center gap-1 text-sm font-medium text-gray-400 whitespace-nowrap"
      data-testid="mics"
      aria-label={`${mics} out of 5 mics`}
    >
      {Array.from({ length: mics }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="text-xl font-bold text-green-700 leading-none"
        >
          {FULL}
        </span>
      ))}
      {Array.from({ length: 5 - mics }, (_, i) => (
        <span key={`e${i}`} aria-hidden="true" className="text-gray-500">
          {EMPTY}
        </span>
      ))}
      <span className="ml-0.5 text-xs font-semibold text-gray-500 whitespace-nowrap">
        {mics} mics
      </span>
    </p>
  );
}
