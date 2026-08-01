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
    slug: "verbal-graffiti",
    title: "Verbal Graffiti",
    artist: "MC Infinity",
    year: 1994,
    label: "Platinum Rhymes",
    mics: 5,
    tags: ["boom-bap", "lyricism", "90s classic"],
    review:
      "Every line lands with the precision of a drum machine trigger. MC Infinity treats the booth like a sparring ring, and the whole project swings between confessional depth and straight bar-heavy flexes. A 5-mic standard-bearer for the decade.",
    cover: "/covers/verbal-graffiti.svg",
    colors: { from: "#0f0f2c", to: "#c5ff3d", accent: "#ff2e9a" },
  },
  {
    slug: "street-science",
    title: "Street Science",
    artist: "The Lab Rats",
    year: 1993,
    label: "Concrete Classics",
    mics: 4,
    tags: ["hardcore", "east-coast"],
    review:
      "The Lab Rats dissect the block the way a scientist dissects a hypothesis — methodically, and with results. The hooks are steel-trap simple and the drums hit like a jackhammer on pavement.",
    cover: "/covers/street-science.svg",
    colors: { from: "#5a1e2a", to: "#f2a33c", accent: "#0f0f2c" },
  },
  {
    slug: "neon-cypher",
    title: "Neon Cypher",
    artist: "K. Complex",
    year: 1997,
    label: "Midnight Sessions",
    mics: 5,
    tags: ["jazz-hop", "midnight", "atmosphere"],
    review:
      "A late-night masterpiece. K. Complex floats over smoky jazz loops like a ghost in the mix, each verse folding into the next. The cypher at the center of the record is worth the price of admission alone.",
    cover: "/covers/neon-cypher.svg",
    colors: { from: "#1b0330", to: "#ff2e9a", accent: "#19e3ff" },
  },
  {
    slug: "paper-routes",
    title: "Paper Routes",
    artist: "The Paperboys",
    year: 1996,
    label: "Green Ink",
    mics: 4,
    tags: ["grime", "street", "stories"],
    review:
      "The Paperboys turn hustler's math into poetry. Sharp storytelling over gritty, weathered beats that sound like they were recorded in a laundromat at 3AM — in the best way.",
    cover: "/covers/paper-routes.svg",
    colors: { from: "#123524", to: "#e0d4a8", accent: "#c5ff3d" },
  },
  {
    slug: "boombox-chronicles",
    title: "Boombox Chronicles",
    artist: "DJ Static & Lyric",
    year: 1991,
    label: "Cassette Kings",
    mics: 5,
    tags: ["golden-era", "cutting", "duo"],
    review:
      "Part documentary, part party. DJ Static's cuts breathe between Lyric's flows like a third emcee. This record sounds like a block party that never ends.",
    cover: "/covers/boombox-chronicles.svg",
    colors: { from: "#33312b", to: "#f4e34a", accent: "#ff5e2e" },
  },
  {
    slug: "honey-flow",
    title: "Honey Flow",
    artist: "Lady Mellow",
    year: 1998,
    label: "Velvet Vinyl",
    mics: 4,
    tags: ["smooth", "neo-soul", "flow"],
    review:
      "Lady Mellow melts every tempo she touches. Honey Flow is silk-smooth R&B-tinged hip-hop with bars sharp enough to cut through all that velvet.",
    cover: "/covers/honey-flow.svg",
    colors: { from: "#ffe9ec", to: "#ff2e9a", accent: "#7a1e5a" },
  },
  {
    slug: "concrete-jungle-gym",
    title: "Concrete Jungle Gym",
    artist: "Kid Method",
    year: 2000,
    label: "Y2K Blast",
    mics: 3,
    tags: ["party", "y2k", "fun"],
    review:
      "Bouncy, bright, and a little bit ridiculous — in the best sense. Kid Method brings playground energy and synth stabs that only a Y2K record could get away with.",
    cover: "/covers/concrete-jungle-gym.svg",
    colors: { from: "#19e3ff", to: "#c5ff3d", accent: "#ff2e9a" },
  },
  {
    slug: "sample-city",
    title: "Sample City",
    artist: "The Cutups",
    year: 1995,
    label: "Breakbeat Blvd",
    mics: 5,
    tags: ["crate-digging", "collage", "instrumental"],
    review:
      "A love letter to the crate. The Cutups weave dusty drums, film dialogue, and horn stabs into a city built entirely of samples. Genius-level collage work.",
    cover: "/covers/sample-city.svg",
    colors: { from: "#f4eede", to: "#33312b", accent: "#ff2e9a" },
  },
  {
    slug: "ghost-bars",
    title: "Ghost Bars",
    artist: "Wraith",
    year: 1999,
    label: "Dark Matter",
    mics: 4,
    tags: ["horrorcore", "atmospheric", "dark"],
    review:
      "Wraith haunts the beat like a figure in the corner of the frame. Ghost Bars is moody, minimal, and menacing, with an atmosphere you could cut with a sampler.",
    cover: "/covers/ghost-bars.svg",
    colors: { from: "#141414", to: "#5e2a5e", accent: "#e0d4a8" },
  },
];
