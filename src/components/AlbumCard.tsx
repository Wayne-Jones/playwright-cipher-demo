import type { Album } from "../data/albums";
import { AlbumArt } from "./AlbumArt";
import { RatingMics } from "./RatingMics";

interface AlbumCardProps {
  album: Album;
  onOpen: () => void;
  isOpen: boolean;
}

export function AlbumCard({ album, onOpen, isOpen }: AlbumCardProps) {
  return (
    <article className="card" data-testid="album-card" data-album={album.slug}>
      <div className="card__art">
        <AlbumArt
          src={album.cover}
          alt={`${album.title} album cover`}
          title={album.title}
          artist={album.artist}
        />
        <span className="card__mic-badge" aria-hidden="true">
          {album.mics}★
        </span>
      </div>
      <div className="card__meta">
        <h3 className="card__title">{album.title}</h3>
        <p className="card__artist">
          {album.artist} · {album.year}
        </p>
        <RatingMics mics={album.mics} />
      </div>
      <button className="card__open" onClick={onOpen} aria-pressed={isOpen}>
        Read Review <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
