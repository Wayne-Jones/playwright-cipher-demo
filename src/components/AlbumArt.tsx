import { useState } from "react";

interface AlbumArtProps {
  src: string;
  alt: string;
  title: string;
  artist: string;
  colors: { from: string; to: string; accent: string };
}

export function AlbumArt({ src, alt, title, artist, colors }: AlbumArtProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <figure
        className="aspect-square overflow-hidden relative bg-card rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 p-4 text-center border border-dashed border-white/40"
        data-testid="album-art-fallback"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      >
        <span
          className="text-xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
          aria-hidden="true"
        >
          {title}
        </span>
        <span className="text-xs font-semibold text-white/85">{artist}</span>
        <figcaption className="sr-only">
          {title} — {artist}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className="aspect-square overflow-hidden relative bg-card rounded-lg shadow-lg"
      data-testid="album-art"
    >
      {!loaded && (
        <span
          className="absolute inset-0 z-0 bg-card animate-skeleton-shimmer"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="absolute inset-0 w-full h-full object-cover z-10"
        data-testid="album-cover"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      <figcaption className="sr-only">
        {title} — {artist}
      </figcaption>
    </figure>
  );
}
