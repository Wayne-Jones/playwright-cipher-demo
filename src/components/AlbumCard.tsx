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
    <article
      className="bg-transparent rounded-lg p-4 flex flex-col gap-4 transition-all duration-200 hover:scale-105 hover:bg-card-hover"
      data-testid="album-card"
      data-album={album.slug}
    >
      <div className="relative flex-1">
        <AlbumArt
          src={album.cover}
          alt={album.title + " album cover"}
          title={album.title}
          artist={album.artist}
          colors={album.colors}
        />
        <span className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 text-xs font-bold rounded-full">
          {album.mics}★
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white">{album.title}</h3>
        <p className="text-sm text-gray-400">
          {album.artist} · {album.year}
        </p>
        <RatingMics mics={album.mics} />
      </div>
      <button
        className="bg-card border border-border-custom text-white font-semibold py-2 px-3 rounded-full flex items-center gap-1 text-sm transition-all hover:bg-green hover:border-green hover:text-black hover:scale-105 w-auto truncate"
        onClick={onOpen}
        aria-pressed={isOpen}
      >
        Read Review <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
