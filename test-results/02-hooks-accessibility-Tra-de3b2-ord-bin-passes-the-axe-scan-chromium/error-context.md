# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-hooks-accessibility.spec.ts >> Track 02 — Hooks (accessibility flows) >> the record bin passes the axe scan
- Location: tests\02-hooks-accessibility.spec.ts:12:3

# Error details

```
Error: [
  {
    "id": "color-contrast",
    "impact": "serious",
    "tags": [
      "cat.color",
      "wcag2aa",
      "wcag143",
      "TTv5",
      "TT13.c",
      "EN-301-549",
      "EN-9.1.4.3",
      "ACT",
      "RGAAv4",
      "RGAA-3.2.1"
    ],
    "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
    "help": "Elements must meet minimum color contrast ratio thresholds",
    "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
    "nodes": [
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#f4eede",
              "bgColor": "#ff2e9a",
              "contrastRatio": 2.96,
              "fontSize": "11.3pt (15px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<div class=\"ticker\" aria-hidden=\"true\">",
                "target": [
                  ".ticker"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<span class=\"ticker__text\">★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★</span>",
        "target": [
          ".ticker__text:nth-child(1)"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1"
      },
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fgColor": "#f4eede",
              "bgColor": "#ff2e9a",
              "contrastRatio": 2.96,
              "fontSize": "11.3pt (15px)",
              "fontWeight": "normal",
              "messageKey": null,
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<div class=\"ticker\" aria-hidden=\"true\">",
                "target": [
                  ".ticker"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<span class=\"ticker__text\">★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★</span>",
        "target": [
          ".ticker__text:nth-child(2)"
        ],
        "failureSummary": "Fix any of the following:\n  Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1"
      }
    ]
  }
]

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 93

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ff2e9a",
+               "contrastRatio": 2.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f4eede",
+               "fontSize": "11.3pt (15px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"ticker\" aria-hidden=\"true\">",
+                 "target": Array [
+                   ".ticker",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ticker__text\">★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".ticker__text:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ff2e9a",
+               "contrastRatio": 2.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f4eede",
+               "fontSize": "11.3pt (15px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"ticker\" aria-hidden=\"true\">",
+                 "target": Array [
+                   ".ticker",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.96 (foreground color: #f4eede, background color: #ff2e9a, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ticker__text\">★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".ticker__text:nth-child(2)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "BOOMBOX REVIEWS" [ref=e5] [cursor=pointer]:
      - /url: "#"
      - generic [ref=e6]: ◼
    - navigation "Site sections" [ref=e8]:
      - link "Albums" [ref=e9] [cursor=pointer]:
        - /url: "#albums"
      - link "The 5-Mic Rule" [ref=e10] [cursor=pointer]:
        - /url: "#mics"
      - link "About the Cipher" [ref=e11] [cursor=pointer]:
        - /url: "#cipher"
  - generic [ref=e12]:
    - generic [ref=e14]:
      - generic [ref=e15]: ★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★
      - generic [ref=e16]: ★ 5 MICS OR NO MIC ★ FRESH OFF THE STREETS ★ RATED BY HEADS ★ NOTHING BUT HEAT ★ BOOMBAP 24/7 ★
    - heading [level=1] [ref=e17]:
      - text: EVERY ALBUMGETS A
      - emphasis [ref=e18]: MIC CHECK
      - text: .
    - paragraph [ref=e19]: One critic. One boombox. Nine records out of the crate — rated with the classic 5-mic scale. Click a cover, read the review, tap the boombox.
  - main [ref=e20]:
    - generic [ref=e21]:
      - heading "SIDE A The Record Bin" [level=2] [ref=e22]:
        - generic [ref=e23]: SIDE A
        - text: The Record Bin
      - paragraph [ref=e24]: Nine albums, zero filler. Hover, click, review.
    - list "Album reviews" [ref=e25]:
      - listitem [ref=e26]:
        - article [ref=e27]:
          - generic [ref=e28]:
            - figure "Verbal Graffiti — MC Infinity" [ref=e29]:
              - img "Verbal Graffiti album cover" [ref=e30]
            - generic [ref=e32]: 5★
          - generic [ref=e33]:
            - heading "Verbal Graffiti" [level=3] [ref=e34]
            - paragraph [ref=e35]: MC Infinity · 1994
            - paragraph [ref=e36]:
              - generic [ref=e37]: 🎤
              - generic [ref=e38]: 🎤
              - generic [ref=e39]: 🎤
              - generic [ref=e40]: 🎤
              - generic [ref=e41]: 🎤
              - generic [ref=e42]: 5 mics
          - button "Read Review" [ref=e43] [cursor=pointer]: Read Review →
      - listitem [ref=e44]:
        - article [ref=e45]:
          - generic [ref=e46]:
            - figure "Street Science — The Lab Rats" [ref=e47]:
              - img "Street Science album cover" [ref=e48]
            - generic [ref=e50]: 4★
          - generic [ref=e51]:
            - heading "Street Science" [level=3] [ref=e52]
            - paragraph [ref=e53]: The Lab Rats · 1993
            - paragraph [ref=e54]:
              - generic [ref=e55]: 🎤
              - generic [ref=e56]: 🎤
              - generic [ref=e57]: 🎤
              - generic [ref=e58]: 🎤
              - generic [ref=e59]: ○
              - generic [ref=e60]: 4 mics
          - button "Read Review" [ref=e61] [cursor=pointer]: Read Review →
      - listitem [ref=e62]:
        - article [ref=e63]:
          - generic [ref=e64]:
            - figure "Neon Cypher — K. Complex" [ref=e65]:
              - img "Neon Cypher album cover" [ref=e66]
            - generic [ref=e68]: 5★
          - generic [ref=e69]:
            - heading "Neon Cypher" [level=3] [ref=e70]
            - paragraph [ref=e71]: K. Complex · 1997
            - paragraph [ref=e72]:
              - generic [ref=e73]: 🎤
              - generic [ref=e74]: 🎤
              - generic [ref=e75]: 🎤
              - generic [ref=e76]: 🎤
              - generic [ref=e77]: 🎤
              - generic [ref=e78]: 5 mics
          - button "Read Review" [ref=e79] [cursor=pointer]: Read Review →
      - listitem [ref=e80]:
        - article [ref=e81]:
          - generic [ref=e82]:
            - figure "Paper Routes — The Paperboys" [ref=e83]:
              - img "Paper Routes album cover" [ref=e84]
            - generic [ref=e86]: 4★
          - generic [ref=e87]:
            - heading "Paper Routes" [level=3] [ref=e88]
            - paragraph [ref=e89]: The Paperboys · 1996
            - paragraph [ref=e90]:
              - generic [ref=e91]: 🎤
              - generic [ref=e92]: 🎤
              - generic [ref=e93]: 🎤
              - generic [ref=e94]: 🎤
              - generic [ref=e95]: ○
              - generic [ref=e96]: 4 mics
          - button "Read Review" [ref=e97] [cursor=pointer]: Read Review →
      - listitem [ref=e98]:
        - article [ref=e99]:
          - generic [ref=e100]:
            - figure "Boombox Chronicles — DJ Static & Lyric" [ref=e101]:
              - img "Boombox Chronicles album cover" [ref=e102]
            - generic [ref=e104]: 5★
          - generic [ref=e105]:
            - heading "Boombox Chronicles" [level=3] [ref=e106]
            - paragraph [ref=e107]: DJ Static & Lyric · 1991
            - paragraph [ref=e108]:
              - generic [ref=e109]: 🎤
              - generic [ref=e110]: 🎤
              - generic [ref=e111]: 🎤
              - generic [ref=e112]: 🎤
              - generic [ref=e113]: 🎤
              - generic [ref=e114]: 5 mics
          - button "Read Review" [ref=e115] [cursor=pointer]: Read Review →
      - listitem [ref=e116]:
        - article [ref=e117]:
          - generic [ref=e118]:
            - figure "Honey Flow — Lady Mellow" [ref=e119]:
              - img "Honey Flow album cover" [ref=e120]
            - generic [ref=e122]: 4★
          - generic [ref=e123]:
            - heading "Honey Flow" [level=3] [ref=e124]
            - paragraph [ref=e125]: Lady Mellow · 1998
            - paragraph [ref=e126]:
              - generic [ref=e127]: 🎤
              - generic [ref=e128]: 🎤
              - generic [ref=e129]: 🎤
              - generic [ref=e130]: 🎤
              - generic [ref=e131]: ○
              - generic [ref=e132]: 4 mics
          - button "Read Review" [ref=e133] [cursor=pointer]: Read Review →
      - listitem [ref=e134]:
        - article [ref=e135]:
          - generic [ref=e136]:
            - figure "Concrete Jungle Gym — Kid Method" [ref=e137]:
              - img "Concrete Jungle Gym album cover" [ref=e138]
            - generic [ref=e140]: 3★
          - generic [ref=e141]:
            - heading "Concrete Jungle Gym" [level=3] [ref=e142]
            - paragraph [ref=e143]: Kid Method · 2000
            - paragraph [ref=e144]:
              - generic [ref=e145]: 🎤
              - generic [ref=e146]: 🎤
              - generic [ref=e147]: 🎤
              - generic [ref=e148]: ○
              - generic [ref=e149]: ○
              - generic [ref=e150]: 3 mics
          - button "Read Review" [ref=e151] [cursor=pointer]: Read Review →
      - listitem [ref=e152]:
        - article [ref=e153]:
          - generic [ref=e154]:
            - figure "Sample City — The Cutups" [ref=e155]:
              - img "Sample City album cover" [ref=e156]
            - generic [ref=e158]: 5★
          - generic [ref=e159]:
            - heading "Sample City" [level=3] [ref=e160]
            - paragraph [ref=e161]: The Cutups · 1995
            - paragraph [ref=e162]:
              - generic [ref=e163]: 🎤
              - generic [ref=e164]: 🎤
              - generic [ref=e165]: 🎤
              - generic [ref=e166]: 🎤
              - generic [ref=e167]: 🎤
              - generic [ref=e168]: 5 mics
          - button "Read Review" [ref=e169] [cursor=pointer]: Read Review →
      - listitem [ref=e170]:
        - article [ref=e171]:
          - generic [ref=e172]:
            - figure "Ghost Bars — Wraith" [ref=e173]:
              - img "Ghost Bars album cover" [ref=e174]
            - generic [ref=e176]: 4★
          - generic [ref=e177]:
            - heading "Ghost Bars" [level=3] [ref=e178]
            - paragraph [ref=e179]: Wraith · 1999
            - paragraph [ref=e180]:
              - generic [ref=e181]: 🎤
              - generic [ref=e182]: 🎤
              - generic [ref=e183]: 🎤
              - generic [ref=e184]: 🎤
              - generic [ref=e185]: ○
              - generic [ref=e186]: 4 mics
          - button "Read Review" [ref=e187] [cursor=pointer]: Read Review →
  - generic [ref=e188]:
    - heading "THE RULE The 5-Mic Scale" [level=2] [ref=e189]:
      - generic [ref=e190]: THE RULE
      - text: The 5-Mic Scale
    - list [ref=e191]:
      - listitem [ref=e192]:
        - strong [ref=e193]: "5 mics:"
        - text: instant classic, plays on loop all year.
      - listitem [ref=e194]:
        - strong [ref=e195]: "4 mics:"
        - text: certified heat, skip-tracks only by accident.
      - listitem [ref=e196]:
        - strong [ref=e197]: "3 mics:"
        - text: solid, a few bars of filler.
      - listitem [ref=e198]:
        - strong [ref=e199]: "2 mics:"
        - text: one good single. Maybe.
      - listitem [ref=e200]:
        - strong [ref=e201]: "1 mic:"
        - text: straight to the bargain bin.
  - contentinfo [ref=e202]:
    - paragraph [ref=e203]: © 2002 Boombox Reviews — a demo site for "The Playwright Cipher"
    - paragraph [ref=e204]: every line serves a purpose · rewind & replay
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
> 15 |     expect(seriousViolations(results), JSON.stringify(seriousViolations(results), null, 2)).toEqual([]);
     |                                                                                             ^ Error: [
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
  44 |     await expect(dialog).toBeVisible();
  45 |     await expect(dialog).toHaveAttribute("aria-modal", "true");
  46 |     await expect(dialog).toHaveAccessibleName(/Sample City/i);
  47 |   });
  48 | });
  49 | 
```