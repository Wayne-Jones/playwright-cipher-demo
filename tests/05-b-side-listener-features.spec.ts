import { expect } from "@playwright/test";
import { albums } from "../src/data/albums";
import { test } from "./fixtures/site";

/**
 * TRACK 05 — "The B-Side"
 * Every album has a B-side: the features users actually touch.
 * The B-side behaviors:
 *   1. The review shows the full tracklist.
 *   2. A listener can rate the album out of 5 mics — and it sticks.
 *   3. A listener can drop a comment — and it joins the thread.
 */

const illmatic = albums.find((album) => album.slug === "illmatic")!;

test.describe("Track 05 — The B-Side (listener features)", () => {
  test("the review shows the full tracklist", async ({ page, boombox }) => {
    await boombox.goto();
    await boombox.openReview("illmatic");

    const tracks = page.locator("[data-testid='tracklist'] li");
    await expect(tracks).toHaveCount(illmatic.tracklist.length);
    await expect(tracks.first()).toContainText("The Genesis");
    await expect(tracks.last()).toContainText("It Ain't Hard to Tell");
  });

  test("a listener can rate the album out of 5 mics — and it sticks", async ({
    page,
    boombox,
  }) => {
    await boombox.goto();
    await boombox.openReview("illmatic");

    await page.getByRole("button", { name: "4 out of 5 mics" }).click();
    await expect(page.getByTestId("rate-value")).toContainText("4 mics");

    await page.keyboard.press("Escape");
    await boombox.openReview("illmatic");
    await expect(page.getByTestId("rate-value")).toContainText("4 mics");
  });

  test("a listener can drop a comment and it joins the thread", async ({
    page,
    boombox,
  }) => {
    await boombox.goto();
    await boombox.openReview("illmatic");

    await page.getByLabel("Your comment").fill("Instant classic, plays on loop.");
    await page.getByRole("button", { name: /drop a comment/i }).click();

    await expect(page.getByText("Instant classic, plays on loop.")).toBeVisible();
    await expect(page.locator("[data-testid='comments'] .comment")).toHaveCount(1);
  });
});
