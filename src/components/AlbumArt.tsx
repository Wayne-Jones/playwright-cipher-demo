interface AlbumArtProps {
  src: string;
  alt: string;
  title: string;
  artist: string;
}

export function AlbumArt({ src, alt, title, artist }: AlbumArtProps) {
  return (
    <figure className="album-art" data-testid="album-art">
      <img src={src} alt={alt} className="album-art__image" />
      <figcaption className="album-art__caption">
        {title} — {artist}
      </figcaption>
    </figure>
  );
}
