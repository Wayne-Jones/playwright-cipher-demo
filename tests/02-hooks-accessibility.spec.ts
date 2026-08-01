import { expect, seriousViolations, test } from "./fixtures/site";

/**
 * TRACK 02 — "Hooks"
 * A hook is the part everyone sings back — the accessible part of a song.
 * These tests make sure the accessible parts of the site sing back too:
 * no serious WCAG violations on the page or in the dialog, and every
 * album cover has alt text a screen reader can actually drop on.
 */

test.describe("Track 02 — Hooks (accessibility flows)", () => {
  test("the record bin passes the axe scan", async ({ boombox, a11yScan }) => {
    await boombox.goto();
    const results = await a11yScan();
    expect(seriousViolations(results), JSON.stringify(seriousViolations(results), null, 2)).toEqual([]);
  });

  test("the review dialog passes the axe scan", async ({ boombox, a11yScan }) => {
    await boombox.goto();
    await boombox.openReview("neon-cypher");

    const results = await a11yScan();
    expect(seriousViolations(results), JSON.stringify(seriousViolations(results), null, 2)).toEqual([]);
  });

  test("every album cover has descriptive alt text", async ({ page, boombox }) => {
    await boombox.goto();
    const arts = page.locator("img.album-art__image");
    const count = await arts.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      const alt = await arts.nth(i).getAttribute("alt");
      expect(alt?.trim(), `cover #${i + 1} is missing alt text`).toBeTruthy();
      expect(alt).toContain("album cover");
    }
  });

  test("the dialog is announced as a modal dialog", async ({ page, boombox }) => {
    await boombox.goto();
    await boombox.openReview("sample-city");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAccessibleName(/Sample City/i);
  });
});
