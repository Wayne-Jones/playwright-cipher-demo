# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-hooks-accessibility.spec.ts >> Track 02 — Hooks (accessibility flows) >> the dialog is announced as a modal dialog
- Location: tests\02-hooks-accessibility.spec.ts:39:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('dialog')

```

```yaml
- banner:
  - link "BOOMBOX REVIEWS":
    - /url: "#"
  - navigation "Site sections":
    - link "Albums":
      - /url: "#albums"
    - link "The 5-Mic Rule":
      - /url: "#mics"
    - link "About the Cipher":
      - /url: "#cipher"
- heading "EVERY ALBUM GETS A MIC CHECK." [level=1]:
  - text: EVERY ALBUM GETS A
  - emphasis: MIC CHECK
  - text: .
- paragraph: One critic. One boombox. Nine records out of the crate — rated with the classic 5-mic scale. Click a cover, read the review, tap the boombox.
- main:
  - heading "SIDE A The Record Bin" [level=2]
  - paragraph: Nine albums, zero filler. Hover, click, review.
  - list "Album reviews":
    - listitem:
      - article:
        - figure "Verbal Graffiti — MC Infinity":
          - img "Verbal Graffiti album cover"
          - text: Verbal Graffiti — MC Infinity
        - heading "Verbal Graffiti" [level=3]
        - paragraph: MC Infinity · 1994
        - paragraph: 5 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Street Science — The Lab Rats":
          - img "Street Science album cover"
          - text: Street Science — The Lab Rats
        - heading "Street Science" [level=3]
        - paragraph: The Lab Rats · 1993
        - paragraph: 4 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Neon Cypher — K. Complex":
          - img "Neon Cypher album cover"
          - text: Neon Cypher — K. Complex
        - heading "Neon Cypher" [level=3]
        - paragraph: K. Complex · 1997
        - paragraph: 5 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Paper Routes — The Paperboys":
          - img "Paper Routes album cover"
          - text: Paper Routes — The Paperboys
        - heading "Paper Routes" [level=3]
        - paragraph: The Paperboys · 1996
        - paragraph: 4 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Boombox Chronicles — DJ Static & Lyric":
          - img "Boombox Chronicles album cover"
          - text: Boombox Chronicles — DJ Static & Lyric
        - heading "Boombox Chronicles" [level=3]
        - paragraph: DJ Static & Lyric · 1991
        - paragraph: 5 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Honey Flow — Lady Mellow":
          - img "Honey Flow album cover"
          - text: Honey Flow — Lady Mellow
        - heading "Honey Flow" [level=3]
        - paragraph: Lady Mellow · 1998
        - paragraph: 4 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Concrete Jungle Gym — Kid Method":
          - img "Concrete Jungle Gym album cover"
          - text: Concrete Jungle Gym — Kid Method
        - heading "Concrete Jungle Gym" [level=3]
        - paragraph: Kid Method · 2000
        - paragraph: 3 mics
        - button "Read Review"
    - listitem:
      - article:
        - figure "Sample City — The Cutups":
          - img "Sample City album cover"
          - text: Sample City — The Cutups
        - heading "Sample City" [level=3]
        - paragraph: The Cutups · 1995
        - paragraph: 5 mics
        - button "Read Review" [pressed]
    - listitem:
      - article:
        - figure "Ghost Bars — Wraith":
          - img "Ghost Bars album cover"
          - text: Ghost Bars — Wraith
        - heading "Ghost Bars" [level=3]
        - paragraph: Wraith · 1999
        - paragraph: 4 mics
        - button "Read Review"
- heading "THE RULE The 5-Mic Scale" [level=2]
- list:
  - listitem:
    - strong: "5 mics:"
    - text: instant classic, plays on loop all year.
  - listitem:
    - strong: "4 mics:"
    - text: certified heat, skip-tracks only by accident.
  - listitem:
    - strong: "3 mics:"
    - text: solid, a few bars of filler.
  - listitem:
    - strong: "2 mics:"
    - text: one good single. Maybe.
  - listitem:
    - strong: "1 mic:"
    - text: straight to the bargain bin.
- contentinfo:
  - paragraph: © 2002 Boombox Reviews — a demo site for "The Playwright Cipher"
  - paragraph: every line serves a purpose · rewind & replay
- button "×"
- figure "Sample City — The Cutups":
  - img "Sample City album cover"
  - text: Sample City — The Cutups
- heading "Sample City" [level=2]
- paragraph: The Cutups · 1995 · Breakbeat Blvd
- paragraph: 5 mics
- text: "#crate-digging #collage #instrumental"
- paragraph: A love letter to the crate. The Cutups weave dusty drums, film dialogue, and horn stabs into a city built entirely of samples. Genius-level collage work.
```

# Test source

```ts
  1  | import { expect, seriousViolations, test } from "./fixtures/site";
  2  | 
  3  | /**
  4  |  * TRACK 02 — "Hooks"
  5  |  * A hook is the part everyone sings back — the accessible part of a song.
  6  |  * These tests make sure the accessible parts of the site sing back too:
  7  |  * no serious WCAG violations on the page or in the dialog, and every
  8  |  * album cover has alt text a screen reader can actually drop on.
  9  |  */
  10 | 
  11 | test.describe("Track 02 — Hooks (accessibility flows)", () => {
  12 |   test("the record bin passes the axe scan", async ({ boombox, a11yScan }) => {
  13 |     await boombox.goto();
  14 |     const results = await a11yScan();
  15 |     expect(seriousViolations(results), JSON.stringify(seriousViolations(results), null, 2)).toEqual([]);
  16 |   });
  17 | 
  18 |   test("the review dialog passes the axe scan", async ({ boombox, a11yScan }) => {
  19 |     await boombox.goto();
  20 |     await boombox.openReview("neon-cypher");
  21 | 
  22 |     const results = await a11yScan();
  23 |     expect(seriousViolations(results), JSON.stringify(seriousViolations(results), null, 2)).toEqual([]);
  24 |   });
  25 | 
  26 |   test("every album cover has descriptive alt text", async ({ page, boombox }) => {
  27 |     await boombox.goto();
  28 |     const arts = page.locator("img.album-art__image");
  29 |     const count = await arts.count();
  30 |     expect(count).toBeGreaterThan(5);
  31 | 
  32 |     for (let i = 0; i < count; i++) {
  33 |       const alt = await arts.nth(i).getAttribute("alt");
  34 |       expect(alt?.trim(), `cover #${i + 1} is missing alt text`).toBeTruthy();
  35 |       expect(alt).toContain("album cover");
  36 |     }
  37 |   });
  38 | 
  39 |   test("the dialog is announced as a modal dialog", async ({ page, boombox }) => {
  40 |     await boombox.goto();
  41 |     await boombox.openReview("sample-city");
  42 | 
  43 |     const dialog = page.getByRole("dialog");
> 44 |     await expect(dialog).toBeVisible();
     |                          ^ Error: expect(locator).toBeVisible() failed
  45 |     await expect(dialog).toHaveAttribute("aria-modal", "true");
  46 |     await expect(dialog).toHaveAccessibleName(/Sample City/i);
  47 |   });
  48 | });
  49 | 
```