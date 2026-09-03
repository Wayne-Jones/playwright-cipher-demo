import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * TRACK 03 — "Bars" (fresh start)
 * Simulates a user on a slow connection and asserts layout shift (CLS) stays acceptable.
 */

test.describe("Track 03 — Bars", () => {
  test.beforeEach(async ({ page, boombox }) => {
    await page.route("**/covers/*.svg", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });
    await boombox.goto();
  });

  test("Verify that cards still hold their layout on a slow connection", async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);
    const card = page.locator('[data-album="illmatic"]');
    const before = await card.boundingBox();
    expect(before).not.toBeNull();

    await expect
      .poll(async () => {
        const img = card.locator("img");
        return (
          (await img.count()) > 0 &&
          (await img.evaluate((el) => (el as HTMLImageElement).complete))
        );
      })
      .toBe(true);

    const after = await card.boundingBox();
    expect(after).toEqual(before);
  });

  test("CLS remains acceptable on slow connection", async ({ page }) => {
    const clsValue = await page.evaluate(async () => {
      return new Promise<number>((resolve) => {
        let cls = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & {
              hadRecentInput: boolean;
            };
            if (!shift.hadRecentInput) cls += (entry as any).value;
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(cls), 2000);
      });
    });
    expect(clsValue, "CLS exceeds 0.1 on slow connection").toBeLessThanOrEqual(
      0.1,
    );
  });
});
