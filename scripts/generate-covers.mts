import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { albums } from "../src/data/albums.ts";

const SIZE = 600;
const OUT_DIR = resolve(import.meta.dirname, "../public/covers");
mkdirSync(OUT_DIR, { recursive: true });

const MOTIFS: Record<string, (g: string) => string> = {
  rings: (c) => `<circle cx="300" cy="300" r="250" fill="none" stroke="${c}" stroke-width="10" opacity="0.55"/>
<circle cx="300" cy="300" r="205" fill="none" stroke="${c}" stroke-width="6" opacity="0.4"/>
<circle cx="300" cy="300" r="160" fill="none" stroke="${c}" stroke-width="3" opacity="0.3"/>`,
  bars: (c) => {
    let bars = "";
    for (let i = 0; i < 24; i++) {
      const h = 40 + Math.abs(Math.sin(i * 1.7)) * 170;
      bars += `<rect x="${40 + i * 22}" y="${300 - h / 2}" width="12" height="${h}" fill="${c}" opacity="${0.35 + (i % 5) * 0.12}"/>`;
    }
    return bars;
  },
  checker: (c) => {
    let cells = "";
    for (let row = 0; row < 8; row++)
      for (let col = 0; col < 8; col++)
        if ((row + col) % 2 === 0)
          cells += `<rect x="${60 + col * 60}" y="${60 + row * 60}" width="60" height="60" fill="${c}" opacity="0.35"/>`;
    return cells;
  },
  stripes: (c) => {
    let s = "";
    for (let i = 0; i < 12; i++)
      s += `<rect x="0" y="${i * 50}" width="600" height="25" fill="${c}" opacity="${(i % 3) * 0.18}"/>`;
    return s;
  },
  stars: (c) => {
    let st = "";
    for (let i = 0; i < 18; i++) {
      const x = 60 + ((i * 97) % 480);
      const y = 60 + ((i * 53) % 480);
      st += `<polygon points="${x},${y - 14} ${x + 4},${y - 4} ${x + 14},${y - 4} ${x + 6},${y + 3} ${x + 9},${y + 13} ${x},${y + 8} ${x - 9},${y + 13} ${x - 6},${y + 3} ${x - 14},${y - 4} ${x - 4},${y - 4}" fill="${c}" opacity="0.5"/>`;
    }
    return st;
  },
};

const chrome = `<defs>
<filter id="bevel" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
  <feOffset dx="3" dy="3" result="shadow"/>
  <feComposite in="blur" in2="shadow" operator="over" result="shadow2"/>
  <feMerge>
    <feMergeNode in="SourceGraphic"/>
    <feMergeNode in="shadow2"/>
  </feMerge>
</filter>
</defs>`;

function chromeText(content: string, y: number, size: number, color: string): string {
  return `<g filter="url(#bevel)" font-family="Impact, 'Arial Black', 'Haettenschweiler', sans-serif">
  <text x="300" y="${y}" text-anchor="middle" font-size="${size}" font-weight="900" letter-spacing="2" fill="${color}" stroke="#000" stroke-width="1.5" paint-order="stroke">${content}</text>
  <text x="300" y="${y + 8}" text-anchor="middle" font-size="${size}" font-weight="900" letter-spacing="2" fill="none" stroke="#fff" stroke-width="1" opacity="0.35">${content}</text>
</g>`;
}

for (const album of albums) {
  const { from, to, accent } = album.colors;
  const motif = MOTIFS[album.slug in MOTIFS ? album.slug : "rings"];
  const motifKey = Object.keys(MOTIFS)[album.slug.length % Object.keys(MOTIFS).length];
  const art = (MOTIFS[album.slug] ?? MOTIFS[motifKey])(accent);

  const title = album.title.toUpperCase();
  const split = title.length > 14 ? Math.ceil(title.length / 2) : title.length;
  const line1 = title.slice(0, split).trim();
  const line2 = title.slice(split).trim();
  const mid = 340 - (line2 ? 45 : 60);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${from}"/>
    <stop offset="100%" stop-color="${to}"/>
  </linearGradient>
</defs>
<rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
${art}
<rect x="24" y="24" width="${SIZE - 48}" height="${SIZE - 48}" fill="none" stroke="#000" stroke-width="6" opacity="0.6"/>
${chrome}
<text x="44" y="70" font-family="'Courier New', monospace" font-size="22" font-weight="700" fill="#000" opacity="0.75">[ ${album.label.toUpperCase()} ]</text>
${chromeText(line1, mid, 52, "#fff")}
${line2 ? chromeText(line2, mid + 58, 52, "#fff") : ""}
<g font-family="'Courier New', monospace">
<text x="44" y="${SIZE - 44}" font-size="24" font-weight="700" fill="#000" opacity="0.8">${album.artist.toUpperCase()} · ${album.year}</text>
<text x="${SIZE - 44}" y="${SIZE - 44}" text-anchor="end" font-size="24" font-weight="700" fill="#000" opacity="0.8">${"★".repeat(album.mics)}${"☆".repeat(5 - album.mics)}</text>
</g>
</svg>`;

  writeFileSync(resolve(OUT_DIR, `${album.slug}.svg`), svg);
  console.log(`generated ${album.slug}.svg`);
}
