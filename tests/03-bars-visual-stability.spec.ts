import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * TRACK 03 — "Bars"
 * Bars are where the verse lands. Every bar reserves its space on the beat —
 * a record doesn't jump forward when a snare hits.
 * These tests keep the layout honest: no layout shift while covers stream in.
 *
 * The hook: covers are intercepted and delayed by 1.5s, so every card
 * starts out bare. If the page holds its shape, it holds it for real users.
 */

test.describe("Track 03 — Bars (visual stability)", () => {
  test.beforeEach(async ({ page, boombox }) => {
    await page.route("**/covers/*.svg", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });
    await boombox.goto();
  });

  test("cards hold their box while covers stream in", async ({ page }) => {
    const first = page.locator('[data-album="verbal-graffiti"]');
    const sizeBefore = await first.boundingBox();
    expect(sizeBefore).not.toBeNull();

    await expect
      .poll(async () => {
        const img = first.locator("img");
        return (await img.count()) > 0 && (await img.evaluate((el) => (el as HTMLImageElement).complete));
      })
      .toBe(true);

    const sizeAfter = await first.boundingBox();
    expect(sizeAfter).toEqual(sizeBefore);
  });

  test("cover images reserve their space with explicit dimensions", async ({ page }) => {
    const images = page.locator("img.album-art__image");
    const count = await images.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const width = await img.getAttribute("width");
      const height = await img.getAttribute("height");
      expect(width, `cover #${i + 1} has no width attribute`).toBeTruthy();
      expect(height, `cover #${i + 1} has no height attribute`).toBeTruthy();
    }
  });
});
