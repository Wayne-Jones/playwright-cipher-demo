import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * THE INTRO — the first 16 bars.
 * A warm-up track: the site loads, the crate is full, and the rule
 * is in place. If this track is red, don't touch the mixtape —
 * fix the hardware first.
 */

test.describe("Intro — the crate opens", () => {
  test("the site loads with nine albums in the record bin", async ({ page, boombox }) => {
    await boombox.goto();

    await expect(page.getByRole("heading", { name: /every album/i })).toBeVisible();
    await expect(page.locator("[data-testid='album-card']")).toHaveCount(9);
    await expect(page.getByText("Boombox Reviews").first()).toBeVisible();
  });

  test("every album is rated on the 5-mic scale", async ({ page, boombox }) => {
    await boombox.goto();

    const mics = page.locator("[data-testid='mics']");
    await expect(mics).toHaveCount(9);

    for (let i = 0; i < 9; i++) {
      await expect(mics.nth(i)).toHaveAttribute("aria-label", /^[1-5] out of 5 mics$/);
    }
  });

  test("clicking a card opens the review in a dialog", async ({ page, boombox }) => {
    await boombox.goto();
    await boombox.openReview("illmatic");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Illmatic");
    await expect(dialog).toContainText("5 mics");
  });
});
