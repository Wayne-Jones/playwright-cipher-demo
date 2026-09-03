import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * TRACK 03 — "Bars" (Visual Stability)
 *
 * Bars are where the verse lands. Every bar reserves its space on the beat —
 * a record doesn't jump forward when a snare hits.
 * These tests keep the layout honest: no layout shift while covers stream in.
 *
 * The hook: covers are intercepted and delayed by 1.5s, so every card
 * starts out bare. If the page holds its shape, it holds it for real users.
 */

test.describe("Track 03 — Bars", () => {
  test.beforeEach(async ({ page, boombox }) => {
    await page.route("**/covers/*.svg", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });

    // Simulate slow connection using CDP throttling
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: 400 * 1024,
      uploadThroughput: 400 * 1024,
      latency: 400,
    });

    await boombox.goto();
  });

  test("Verify that cards still hold their layout on a slow connection", async ({
    boombox,
  }) => {
    await boombox.page.evaluate(() => document.fonts.ready);
    const card = boombox.albumCards.first();
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

  test("Verify that CLS remains acceptable on slow connection", async ({
    page,
  }) => {
    const clsValue = await page.evaluate(async () => {
      return new Promise<number>((resolve) => {
        let cls = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & {
              hadRecentInput: boolean;
              value: number;
            };
            if (!shift.hadRecentInput) cls += shift.value;
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(cls);
        }, 2000);
      });
    });
    expect(clsValue, "CLS exceeds 0.1 on slow connection").toBeLessThanOrEqual(
      0.1,
    );
  });
});
