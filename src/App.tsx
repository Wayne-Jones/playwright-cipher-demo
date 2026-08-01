import { useState } from "react";
import { albums } from "./data/albums";
import { AlbumCard } from "./components/AlbumCard";
import { AlbumModal } from "./components/AlbumModal";

export default function App() {
  const [activeAlbum, setActiveAlbum] = useState<(typeof albums)[number] | null>(null);

  return (
    <div className="site">
      <header className="site__header">
        <a href="#" className="brand">
          <span className="brand__mark" aria-hidden="true">
            ►
          </span>
          <span className="brand__name">Boombox Reviews</span>
        </a>
        <nav className="site__nav" aria-label="Site sections">
          <a href="#albums">Albums</a>
          <a href="#mics">The 5-Mic Rule</a>
          <a href="#cipher">About the Cipher</a>
        </nav>
      </header>

      <section className="hero">
        <h1 className="hero__title">
          Every album gets a <span className="hero__accent">mic check</span>.
        </h1>
        <p className="hero__sub">
          One critic. One boombox. Sixteen classic records out of the crate — rated on
          the classic 5-mic scale. Click a cover, read the review, drop your rating,
          keep the loop on.
        </p>
      </section>

      <main id="albums" className="records">
        <div className="records__heading">
          <h2 className="section-title">
            <span className="section-title__badge">Side A</span> The Record Bin
          </h2>
          <p className="section-sub">Sixteen albums, zero filler. Hover, click, review.</p>
        </div>
        <ul className="grid" aria-label="Album reviews">
          {albums.map((album) => (
            <li key={album.slug} className="grid__item">
              <AlbumCard
                album={album}
                onOpen={() => setActiveAlbum(album)}
                isOpen={activeAlbum?.slug === album.slug}
              />
            </li>
          ))}
        </ul>
      </main>

      <section id="mics" className="mics-rule">
        <h2 className="section-title">
          <span className="section-title__badge">The Rule</span> The 5-Mic Scale
        </h2>
        <ol className="mics-rule__list">
          <li>
            <strong>5 mics:</strong> instant classic, plays on loop all year.
          </li>
          <li>
            <strong>4 mics:</strong> certified heat, skip-tracks only by accident.
          </li>
          <li>
            <strong>3 mics:</strong> solid, a few bars of filler.
          </li>
          <li>
            <strong>2 mics:</strong> one good single. Maybe.
          </li>
          <li>
            <strong>1 mic:</strong> straight to the bargain bin.
          </li>
        </ol>
      </section>

      <section id="cipher" className="about">
        <h2 className="section-title">
          <span className="section-title__badge">The Cipher</span> Why this site exists
        </h2>
        <p className="about__text">
          Boombox Reviews is the live demo for{" "}
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            The Playwright Cipher
          </a>{" "}
          — a talk about writing end-to-end tests the way a rapper builds a verse:
          flow, hooks, bars, and cadence. Every album here is tested, and the tests
          are the mixtape.
        </p>
      </section>

      <footer className="site__footer">
        <p>© 2026 Boombox Reviews — a demo site for "The Playwright Cipher"</p>
        <p className="site__footer-aside">every line serves a purpose · rewind &amp; replay</p>
      </footer>

      {activeAlbum && (
        <AlbumModal album={activeAlbum} onClose={() => setActiveAlbum(null)} />
      )}
    </div>
  );
}
