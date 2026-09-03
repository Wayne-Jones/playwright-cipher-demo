import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { BoomboxPage } from "./pages/boombox.page";

const test = base.extend<{ boombox: BoomboxPage }>({
  boombox: async ({ page }, use) => {
    const boomboxPage = new BoomboxPage(page);
    await use(boomboxPage);
  },
});

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

  test("Verify that CLS remains acceptable on slow connection", async ({
    boombox,
  }) => {
    const clsValue = await boombox.measureCLS(2000);
    expect(clsValue, "CLS exceeds 0.1 on slow connection").toBeLessThanOrEqual(
      0.1,
    );
  });
});
