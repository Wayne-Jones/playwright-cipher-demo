import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * TRACK 04 — "Cadence"
 * A good MC never stumbles when the beat skips.
 * A good site never shows a broken frame when a request drops.
 *
 * These tests cut the connection on a cover and check the fallback
 * keeps the rhythm going: a placeholder tile, not a broken image icon.
 */

test.describe("Track 04 — Cadence (resilient network handling)", () => {
  test("a dropped cover renders a fallback tile, not a broken image", async ({
    page,
    boombox,
  }) => {
    await page.route("**/covers/madvillainy.jpg", (route) => route.abort());
    await boombox.goto();

    const card = page.locator('[data-album="madvillainy"]');

    await expect(card.locator("[data-testid='album-art-fallback']")).toBeVisible();
    await expect(card.locator("img")).toHaveCount(0);
    await expect(card).toContainText("Madvillainy");
  });

  test("the site keeps reviewing when every cover fails", async ({ page, boombox }) => {
    await page.route("**/covers/*.jpg", (route) => route.abort());
    await boombox.goto();

    await expect(page.getByRole("heading", { name: /every album/i })).toBeVisible();
    const fallbacks = page.locator("[data-testid='album-art-fallback']");
    await expect(fallbacks).toHaveCount(9);
    await expect(page.locator("img.album-art__image")).toHaveCount(0);
  });
});
