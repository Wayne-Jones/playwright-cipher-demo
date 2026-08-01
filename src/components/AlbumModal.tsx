import type { Album } from "../data/albums";
import { AlbumArt } from "./AlbumArt";
import { RatingMics } from "./RatingMics";

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

export function AlbumModal({ album, onClose }: AlbumModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <div className="modal__art">
          <AlbumArt
            src={album.cover}
            alt={`${album.title} album cover`}
            title={album.title}
            artist={album.artist}
          />
        </div>
        <div className="modal__body">
          <h2 className="modal__title">{album.title}</h2>
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
        </div>
      </div>
    </div>
  );
}
