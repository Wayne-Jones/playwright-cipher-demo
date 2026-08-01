import { useId } from "react";
import type { Album } from "../data/albums";
import { useFocusTrap } from "../hooks/useFocusTrap";
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
  const containerRef = useFocusTrap(onClose);

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <div className="modal__art">
          <AlbumArt
            src={album.cover}
            alt={`${album.title} album cover`}
            title={album.title}
            artist={album.artist}
            colors={album.colors}
          />
        </div>
        <div className="modal__body">
          <h2 className="modal__title" id={titleId}>
            {album.title}
          </h2>
          <p className="modal__artist">
            {album.artist} · {album.year} · {album.label}
          </p>
          <RatingMics mics={album.mics} />
          <div className="modal__tags">
            {album.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <p className="modal__review">{album.review}</p>
          <div className="modal__row">
            <div className="modal__tracklist">
              <h3 className="modal__subhead">Tracklist</h3>
              <ol className="tracklist" data-testid="tracklist">
                {album.tracklist.map((track, index) => (
                  <li key={track} className="tracklist__item">
                    <span className="tracklist__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {track}
                  </li>
                ))}
              </ol>
            </div>
            <div className="modal__listener">
              <RateAlbum slug={album.slug} />
              <Comments slug={album.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
