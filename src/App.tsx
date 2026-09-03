import { useState } from "react";
import { albums } from "./data/albums";
import { AlbumCard } from "./components/AlbumCard";
import { AlbumModal } from "./components/AlbumModal";

export default function App() {
  const [activeAlbum, setActiveAlbum] = useState<
    (typeof albums)[number] | null
  >(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-border-custom px-8 py-4 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2 no-underline text-white">
          <span
            className="w-8 h-8 rounded-full bg-green flex items-center justify-center text-black font-black text-sm"
            aria-hidden="true"
          >
            ►
          </span>
          <span className="font-bold text-base whitespace-nowrap">
            Boombox Reviews
          </span>
        </a>
        <nav className="flex gap-6" aria-label="Site sections">
          <a
            href="#albums"
            className="text-gray-400 no-underline text-sm font-semibold hover:text-white transition-colors"
          >
            Albums
          </a>
          <a
            href="#mics"
            className="text-gray-400 no-underline text-sm font-semibold hover:text-white transition-colors"
          >
            The 5-Mic Rule
          </a>
          <a
            href="#cipher"
            className="text-gray-400 no-underline text-sm font-semibold hover:text-white transition-colors"
          >
            About the Cipher
          </a>
        </nav>
      </header>

      <section
        className="py-14 px-8 border-b border-border-custom"
        style={{
          background:
            "radial-gradient(120% 140% at 80% -20%, rgba(30, 215, 96, 0.18), transparent 55%), radial-gradient(100% 120% at 10% 110%, rgba(29, 185, 84, 0.12), transparent 50%), var(--surface)",
        }}
      >
        <h1
          className="text-6xl font-black leading-tight tracking-tight m-0 max-w-xl"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Every album gets a <span className="text-green">mic check</span>.
        </h1>
        <p className="text-gray-400 text-lg mt-5 max-w-3xl">
          One critic. One boombox. Sixteen classic records out of the crate —
          rated on the classic 5-mic scale. Click a cover, read the review, drop
          your rating, keep the loop on.
        </p>
      </section>

      <main id="albums" className="py-10 px-8 pb-12">
        <div>
          <h2 className="text-2xl font-extrabold m-0 flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase bg-green text-black rounded-full px-3 py-1">
              Side A
            </span>{" "}
            The Record Bin
          </h2>
          <p className="text-gray-400 mt-2 mb-7">
            Sixteen albums, zero filler. Hover, click, review.
          </p>
        </div>
        <ul
          className="list-none m-0 p-0 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
          aria-label="Album reviews"
        >
          {albums.map((album) => (
            <li key={album.slug}>
              <AlbumCard
                album={album}
                onOpen={() => setActiveAlbum(album)}
                isOpen={activeAlbum?.slug === album.slug}
              />
            </li>
          ))}
        </ul>
      </main>

      <section
        id="mics"
        className="py-10 px-8 border-t border-b border-border-custom bg-surface"
      >
        <h2 className="text-2xl font-extrabold m-0 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest uppercase bg-green text-black rounded-full px-3 py-1">
            The Rule
          </span>{" "}
          The 5-Mic Scale
        </h2>
        <ol className="list-none m-0 p-0 mt-5 grid gap-3 max-w-3xl">
          <li className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors">
            <strong className="font-black text-green">5 mics:</strong> instant
            classic, plays on loop all year.
          </li>
          <li className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors">
            <strong className="font-black text-green">4 mics:</strong> certified
            heat, skip-tracks only by accident.
          </li>
          <li className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors">
            <strong className="font-black text-green">3 mics:</strong> solid, a
            few bars of filler.
          </li>
          <li className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors">
            <strong className="font-black text-green">2 mics:</strong> one good
            single. Maybe.
          </li>
          <li className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors">
            <strong className="font-black text-green">1 mic:</strong> straight
            to the bargain bin.
          </li>
        </ol>
      </section>

      <section id="cipher" className="py-10 px-8">
        <h2 className="text-2xl font-extrabold m-0 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest uppercase bg-green text-black rounded-full px-3 py-1">
            The Cipher
          </span>{" "}
          Why this site exists
        </h2>
        <p className="text-gray-400 max-w-3xl mt-4">
          Boombox Reviews is the live demo for{" "}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-green underline underline-offset-2 hover:underline"
          >
            The Playwright Cipher
          </a>{" "}
          — a talk about writing end-to-end tests the way a rapper builds a
          verse: flow, hooks, bars, and cadence. Every album here is tested, and
          the tests are the mixtape.
        </p>
      </section>

      <footer className="px-8 py-7 border-t border-border-custom text-gray-400 text-xs flex flex-col gap-1">
        <p>© 2026 Boombox Reviews — a demo site for "The Playwright Cipher"</p>
        <p className="text-gray-500">
          every line serves a purpose · rewind &amp; replay
        </p>
      </footer>

      {activeAlbum && (
        <AlbumModal album={activeAlbum} onClose={() => setActiveAlbum(null)} />
      )}
    </div>
  );
}
