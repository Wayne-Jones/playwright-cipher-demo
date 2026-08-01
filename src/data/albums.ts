export interface Album {
  slug: string;
  title: string;
  artist: string;
  year: number;
  label: string;
  mics: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  review: string;
  cover: string;
  colors: { from: string; to: string; accent: string };
}

export const albums: Album[] = [
  {
    slug: "illmatic",
    title: "Illmatic",
    artist: "Nas",
    year: 1994,
    label: "Columbia",
    mics: 5,
    tags: ["boom-bap", "east-coast", "essential"],
    review:
      "Ten tracks, zero filler. Nas rides the best beat lineup in hip-hop history like the mic was built for his hands. The benchmark every debut is still measured against — a perfect first verse of a long career.",
    cover: "/covers/illmatic.jpg",
    colors: { from: "#0b0e14", to: "#1c3a5e", accent: "#c9d6e8" },
  },
  {
    slug: "36-chambers",
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    year: 1993,
    label: "Loud",
    mics: 5,
    tags: ["hardcore", "staten-island", "debut"],
    review:
      "Nine emcees, one kung-fu sample bin, and a sound nobody had heard before. The 36 Chambers is a crew cipher that changed the shape of the game — grimy, funny, dangerous, and impossible to copy.",
    cover: "/covers/36-chambers.jpg",
    colors: { from: "#2f2f2f", to: "#6e6e6e", accent: "#e6c65a" },
  },
  {
    slug: "low-end-theory",
    title: "The Low End Theory",
    artist: "A Tribe Called Quest",
    year: 1991,
    label: "Jive",
    mics: 5,
    tags: ["jazz-rap", "conscious", "tribe"],
    review:
      "Tribe traded boom-bap drums for a walking bassline and made it knock anyway. Q-Tip and Phife trade bars like a pickup game, and the low end is still the deepest in the catalog.",
    cover: "/covers/low-end-theory.jpg",
    colors: { from: "#12265c", to: "#f0c53d", accent: "#ffffff" },
  },
  {
    slug: "ready-to-die",
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    year: 1994,
    label: "Bad Boy",
    mics: 5,
    tags: ["east-coast", "storytelling", "debut"],
    review:
      "Biggie paints Brooklyn in vivid, cinematic detail — the struggle, the hustle, the party, the funeral. Flow so effortless it sounds like he's just talking, until you realize nobody else can do it.",
    cover: "/covers/ready-to-die.jpg",
    colors: { from: "#d8d8d8", to: "#8f1f2b", accent: "#f2f2f2" },
  },
  {
    slug: "the-chronic",
    title: "The Chronic",
    artist: "Dr. Dre",
    year: 1992,
    label: "Death Row",
    mics: 4,
    tags: ["g-funk", "west-coast", "production"],
    review:
      "The G-funk blueprint. Dre's synths and Parliament samples turned the whole coast up, and Snoop's debut verses ride the grooves like a lowrider. A few skits bloat the tracklist, but the hits are certified.",
    cover: "/covers/the-chronic.jpg",
    colors: { from: "#0d0d0d", to: "#1e7a3a", accent: "#1ed760" },
  },
  {
    slug: "miseducation",
    title: "The Miseducation of Lauryn Hill",
    artist: "Ms. Lauryn Hill",
    year: 1998,
    label: "Ruffhouse",
    mics: 5,
    tags: ["neo-soul", "conscious", "classic"],
    review:
      "One take, one mic, one of the greatest records ever pressed. Lauryn flips between rapping and singing so fluidly you forget it's a debut solo album. Love, loss, and lessons — all timeless.",
    cover: "/covers/miseducation.jpg",
    colors: { from: "#5a3a1e", to: "#d97a2e", accent: "#ffe8c9" },
  },
  {
    slug: "madvillainy",
    title: "Madvillainy",
    artist: "Madvillain",
    year: 2004,
    label: "Stones Throw",
    mics: 5,
    tags: ["underground", "abstract", "producer-record"],
    review:
      "DOOM rhymes like a mad scientist narrating his own lab accident over Madlib's melted-piano loops. Weird, brilliant, and endlessly rewindable — the underground's proudest moment.",
    cover: "/covers/madvillainy.jpg",
    colors: { from: "#e8c93d", to: "#b8352e", accent: "#141414" },
  },
  {
    slug: "to-pimp-a-butterfly",
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    label: "Top Dawg",
    mics: 5,
    tags: ["concept", "jazz-rap", "west-coast"],
    review:
      "A concept album with the nerve to end on a poem delivered to Tupac. Kendrick takes jazz, funk, and spoken word and turns them into a conversation about America that hasn't aged a day.",
    cover: "/covers/to-pimp-a-butterfly.jpg",
    colors: { from: "#8c1f1f", to: "#f2a33c", accent: "#e6e6e6" },
  },
  {
    slug: "moment-of-truth",
    title: "Moment of Truth",
    artist: "Gang Starr",
    year: 1998,
    label: "Noo Trybe",
    mics: 4,
    tags: ["boom-bap", "duo", "late-90s"],
    review:
      "Premier's hardest drums and Guru's last great full-length with him. Moments of greatness packed into a record that runs a few tracks too long — but the title track alone is worth five mics.",
    cover: "/covers/moment-of-truth.jpg",
    colors: { from: "#b8860b", to: "#3d2a1a", accent: "#f7e0a8" },
  },
];
