import { expect, test as base } from "@playwright/test";
import { BoomboxPage } from "./pages/boombox.page";

const test = base.extend<{ boombox: BoomboxPage }>({
  boombox: async ({ page }, use) => {
    let boomboxPage = new BoomboxPage(page);
    await use(boomboxPage);
  },
});

test.describe("TRACK 04 - Cadence", () => {
  test("Verify that album art fallback shown when network cuts", async ({
    page,
    boombox,
  }) => {
    await page.route("**/covers/*.jpg", (route) => route.abort());
    await boombox.goto();
    await expect(
      page.locator(
        '[data-album="madvillainy"] [data-testid="album-art-fallback"]',
      ),
    ).toBeVisible();
    await expect(page.locator("img")).toHaveCount(0);
  });

  test("Verify that comment form shows retry error when network cuts", async ({
    page,
    boombox,
  }) => {
    await page.route("**/*", (route) => {
      if (route.request().url().includes("cover")) return route.abort();
      return route.continue();
    });
    await boombox.goto();
    await boombox.openReview("madvillainy");
    await page.locator("textarea[placeholder*='review']").fill("great beat");
    await page.locator("button[type='submit']").click();
    await expect(page.getByText(/retry/i)).toBeVisible();
  });
});
