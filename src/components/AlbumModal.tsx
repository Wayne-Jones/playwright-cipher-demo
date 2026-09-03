import { useEffect, useId, useRef } from "react";
import type { Album } from "../data/albums";

import { AlbumArt } from "./AlbumArt";
import { Comments } from "./Comments";
import { RateAlbum } from "./RateAlbum";
import { RatingMics } from "./RatingMics";

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

export function AlbumModal({ album, onClose }: AlbumModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="bg-card border border-border-custom rounded-xl shadow-2xl w-full max-w-3xl max-h-[88vh] overflow-auto p-7 m-auto backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      style={{ gridTemplateColumns: "minmax(220px, 300px) 1fr" }}
      aria-labelledby={titleId}
    >
      <div
        className="grid gap-6 relative"
        style={{ gridTemplateColumns: "minmax(220px, 300px) 1fr" }}
      >
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-xl font-bold hover:bg-card-hover transition-transform:hover:scale-105"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        <div className="flex flex-col">
          <AlbumArt
            src={album.cover}
            alt={`${album.title} album cover`}
            title={album.title}
            artist={album.artist}
            colors={album.colors}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2
            className="text-3xl font-black leading-tight tracking-tight pr-10 text-white"
            id={titleId}
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {album.title}
          </h2>
          <p className="text-gray-400 text-base">
            {album.artist} · {album.year} · {album.label}
          </p>
          <RatingMics mics={album.mics} />
          <div className="flex flex-wrap gap-2">
            {album.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-border-custom text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p
            className="text-gray-300 leading-loose border-t border-border-custom pt-4 max-w-xl"
            style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            {album.review}
          </p>
          <div
            className="grid gap-6 pt-5 border-t border-border-custom"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <div>
              <h3 className="text-xs font-extrabold tracking-widest uppercase text-gray-400 mb-3">
                Tracklist
              </h3>
              <ol
                className="list-none m-0 p-0 space-y-2"
                data-testid="tracklist"
              >
                {album.tracklist.map((track, index) => (
                  <li
                    key={track}
                    className="flex gap-2 items-baseline text-sm text-gray-300"
                  >
                    <span
                      className="text-xs font-bold text-green min-w-6.5"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {track}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <RateAlbum slug={album.slug} />
              <Comments slug={album.slug} />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
