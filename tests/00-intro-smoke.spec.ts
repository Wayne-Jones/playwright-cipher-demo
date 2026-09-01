import { expect } from "@playwright/test";
import { test } from "./fixtures/site";
import { albums } from "../src/data/albums";

/**
 * THE SOUND CHECK - Smoke Tests.
 * A warm-up track: The website loads, the albums are all loaded,
 * and the 5-mic rating system is visible amd in place.
 * If this track is red, there could be an issue with the website.
 */

test.describe("Sound Check - Smoke Test for Website", () => {
  test("The website loads with every album in the record bin as well as ratings", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /every album/i }),
    ).toBeVisible();
    await expect(page.locator("[data-testid='album-card']")).toHaveCount(
      albums.length,
    );
    await expect(page.getByText("Boombox Reviews").first()).toBeVisible();
  });

  test("every album is rated on the 5-mic scale", async ({ page, boombox }) => {
    await boombox.goto();

    const mics = page.locator("[data-testid='mics']");
    await expect(mics).toHaveCount(albums.length);

    for (let i = 0; i < albums.length; i++) {
      await expect(mics.nth(i)).toHaveAttribute(
        "aria-label",
        /^[1-5] out of 5 mics$/,
      );
    }
  });

  test("clicking a card opens the review in a dialog", async ({
    page,
    boombox,
  }) => {
    await boombox.goto();
    await boombox.openReview("illmatic");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Illmatic");
    await expect(dialog).toContainText("5 mics");
  });
});
