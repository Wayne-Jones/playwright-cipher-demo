# Boombox Reviews — The Playwright Cipher live demo

A Y2K-to-modern rap-album review site, built for **The Playwright Cipher** — a talk
about writing end-to-end tests the way a rapper builds a verse: **flow, hooks,
bars, and cadence**.

Stack: React 19 · Vite 8 · TypeScript · Playwright 1.62 · axe-core.

## The mixtape (test suite structure)

| Track | File | What it covers |
| --- | --- | --- |
| The Intro | `tests/00-intro-smoke.spec.ts` | Site loads, 9 albums, 5-mic rule |
| Track 01 — Flow | `tests/01-flow-keyboard-nav.spec.ts` | Keyboard navigation: focus lands in dialog, Tab orbits, Escape closes |
| Track 02 — Hooks | `tests/02-hooks-accessibility.spec.ts` | axe scans, modal semantics, alt text |
| Track 03 — Bars | `tests/03-bars-visual-stability.spec.ts` | No layout shift while covers stream in |
| Track 04 — Cadence | `tests/04-cadence-resilient-network.spec.ts` | Dropped requests render fallback tiles |

The shared fixture (`tests/fixtures/site.ts`) is the **hook** every track drops into.

## The arc (how the talk tells it)

Every track follows the same cipher: **write the test → it goes RED → fix the app
→ it goes GREEN**.

The repo keeps both states as git tags so you can replay the arc live:

```bash
git checkout red-state   # broken behaviors, 10 failed / 4 passed
git checkout green-state # everything fixed, 14 passed
```

| Track | Red behavior | Fix |
| --- | --- | --- |
| 01 | Focus never enters the modal; Tab escapes; Escape does nothing | `useFocusTrap` hook: focus lands, Tab orbits, Escape closes and restores focus |
| 02 | Modal is an unnamed `<div>`; ticker contrast 2.96:1 | `role="dialog"`, `aria-modal`, `aria-labelledby`; theme contrast fix |
| 03 | Cards shift 1px+ as covers load | Fixed `aspect-ratio` art box; image fills as overlay |
| 04 | Aborted covers render broken-image icons | `onError` fallback tile with album colors |

## Getting started

```bash
npm install
npx playwright install chromium
npm run dev        # site on http://localhost:5173
npm test           # run the cipher
npm run test:ui    # Playwright UI mode
npm run test:report
```

Real album art is fetched from the iTunes Search API (local copies in
`public/covers/`, no network needed at runtime). Re-fetch or replace art with:

```bash
npm run covers
```

## Metaphor map

| Rap | Playwright |
| --- | --- |
| Cipher | Test suite |
| Verse | A single test |
| Flow | The user journey the test walks |
| Hook | Fixtures / helpers |
| Bars | Assertions |
| Cadence | Reliable waiting & network resilience |
