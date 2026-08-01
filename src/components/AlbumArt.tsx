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
        className="album-art album-art--fallback"
        data-testid="album-art-fallback"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      >
        <span className="album-art__fallback-title" aria-hidden="true">
          {title}
        </span>
        <span className="album-art__fallback-artist">{artist}</span>
        <figcaption className="album-art__caption">
          {title} — {artist}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="album-art" data-testid="album-art">
      {!loaded && <span className="album-art__skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="album-art__image"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      <figcaption className="album-art__caption">
        {title} — {artist}
      </figcaption>
    </figure>
  );
}
