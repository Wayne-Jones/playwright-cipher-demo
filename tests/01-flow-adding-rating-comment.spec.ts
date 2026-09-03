import { test, expect } from "@playwright/test";

/**
 * TRACK 01 — "Flow"
 *
 * These tests describe the keyboard journey a user takes:
 *   1. User navigates to the homepage and clicks on an album review button.
 *   2. User rates the album and album art.
 *   3. User adds a comment review for the album.
 */

test.describe("Track 01 — Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    let illmaticCard = page
      .getByRole("article")
      .filter({ hasText: "Illmatic — Nas5★IllmaticNas" });
    await expect(illmaticCard).toBeVisible();
    await illmaticCard.getByRole("button").click();
    let modal = page.getByRole("dialog", { name: "Illmatic" });
    await expect(modal).toBeVisible();
  });

  test("User rates an album and album art", async ({ page }) => {
    let rating = page.getByTestId("rate-value");
    await expect(rating).toHaveText("Your rating: not rated yet");
    await page.getByRole("button", { name: "4 out of 5 mics" }).click();

    //Mic ratings should light up
    await expect(
      page.getByRole("button", { name: "1 out of 5 mics" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: "2 out of 5 mics" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: "3 out of 5 mics" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: "4 out of 5 mics" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: "5 out of 5 mics" }),
    ).not.toHaveAttribute("aria-pressed", "true");

    //User Rating should appear below
    await expect(rating).toHaveText("Your rating: 4 mics");
  });

  test("User leaves a comment review for album art", async ({ page }) => {
    const comment =
      "This album is a timeless masterpiece from the Queensbridge empire.";
    const expectedName = "Crate digger";

    const nameInput = page.getByLabel("Name (optional)");
    const textInput = page.getByLabel("Your comment");
    const submit = page.getByRole("button", { name: "Drop a comment" });

    await expect(nameInput).toBeVisible();
    await expect(textInput).toBeVisible();

    await nameInput.fill(expectedName);
    await textInput.fill(comment);
    await submit.click();

    // The comment thread should show the just-posted comment
    const thread = page.getByTestId("comments");
    await expect(thread.getByText(expectedName)).toBeVisible();
    await expect(thread.getByText(comment)).toBeVisible();

    // Posting should also clear the form, ready for the next drop
    await expect(nameInput).toHaveValue("");
    await expect(textInput).toHaveValue("");
  });
});
