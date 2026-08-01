import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { albums } from "../src/data/albums.ts";

const OUT_DIR = resolve(import.meta.dirname, "../public/covers");
mkdirSync(OUT_DIR, { recursive: true });

function artworkUrl600(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace(/\/100x100bb\.(jpg|png)$/, "/600x600bb.$1");
}

async function findArtwork(title: string, artist: string): Promise<string | undefined> {
  const term = encodeURIComponent(`${artist} ${title}`);
  const res = await fetch(
    `https://itunes.apple.com/search?term=${term}&entity=album&limit=10&media=music&country=US`,
    { headers: { "user-agent": "playwright-cipher-demo/1.0" } }
  );
  if (!res.ok) throw new Error(`iTunes search failed: ${res.status}`);
  const json = (await res.json()) as {
    results: { collectionName: string; artistName: string; artworkUrl100: string }[];
  };

  const normalized = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const result of json.results) {
    if (
      normalized(result.collectionName).includes(normalized(title).slice(0, 12)) &&
      normalized(result.artistName).includes(normalized(artist).slice(0, 8))
    ) {
      return artworkUrl600(result.artworkUrl100);
    }
  }
  const fallback = await findArtworkDeezer(title, artist);
  if (fallback) return fallback;
  return artworkUrl600(json.results[0]?.artworkUrl100);
}

async function findArtworkDeezer(title: string, artist: string): Promise<string | undefined> {
  const term = encodeURIComponent(`${title} ${artist}`);
  const res = await fetch(`https://api.deezer.com/search/album?q=${term}&limit=5`, {
    headers: { "user-agent": "playwright-cipher-demo/1.0" },
  });
  if (!res.ok) return undefined;
  const json = (await res.json()) as {
    data?: { title: string; artist: { name: string }; cover_big: string }[];
  };

  const normalized = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const result of json.data ?? []) {
    if (
      normalized(result.title).includes(normalized(title).slice(0, 14)) &&
      normalized(result.artist.name).includes(normalized(artist).slice(0, 8))
    ) {
      return result.cover_big.replace(/\/500x500-/, "/600x600-");
    }
  }
  return undefined;
}

for (const album of albums) {
  try {
    const url = await findArtwork(album.title, album.artist);
    if (!url) {
      console.warn(`no artwork found for ${album.title}`);
      continue;
    }
    const res = await fetch(url, { headers: { "user-agent": "playwright-cipher-demo/1.0" } });
    if (!res.ok) throw new Error(`download failed: ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length < 5_000) {
      console.warn(`suspiciously small file for ${album.title} (${bytes.length} bytes)`);
      continue;
    }
    writeFileSync(resolve(OUT_DIR, `${album.slug}.jpg`), bytes);
    console.log(`fetched ${album.slug}.jpg (${(bytes.length / 1024).toFixed(0)} KiB)`);
  } catch (error) {
    console.error(`error for ${album.title}:`, error instanceof Error ? error.message : error);
  }
}
