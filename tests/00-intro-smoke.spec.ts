import { test, expect } from "@playwright/test";
import { albums } from "../src/data/albums";

/**
 * THE SOUND CHECK - Smoke Tests.
 * A warm-up track: The website loads, the albums are all loaded,
 * and the 5-mic rating system is visible amd in place.
 * If this track is red, there could be an issue with the website.
 */

test.describe("Sound Check - Smoke Test for Website", () => {
  test("The website loads with every album in the record bin", async ({
    page,
  }) => {
    await page.goto("/");
    let heading = page.getByRole("heading", { name: /every album/i });
    await expect(heading).toBeVisible();
    let albumCards = page.locator("[data-testid='album-card']");
    await expect(albumCards).toHaveCount(albums.length);
  });
});
