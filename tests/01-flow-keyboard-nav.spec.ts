import { expect } from "@playwright/test";
import { test } from "./fixtures/site";

/**
 * TRACK 01 — "Flow"
 * A verse flows: the mic never leaves the rapper's hands.
 * A modal flows: focus never leaves the dialog, and Escape always cuts.
 *
 * These tests describe the keyboard journey a user takes:
 *   1. Open a review with one click.
 *   2. Focus lands INSIDE the dialog (the mic gets passed in).
 *   3. Tab orbits inside the dialog — never the page behind.
 *   4. Escape drops the needle, closes the dialog, returns to the card.
 */

test.describe("Track 01 — Flow (keyboard navigation)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    let illmaticCard = page.locator('[data-album="illmatic"]');
    await expect(illmaticCard).toBeVisible();
    await illmaticCard.getByRole("button").click();
    await expect(page.getByText("Ten tracks, zero filler")).toBeVisible();
  });

  test("focus lands inside the dialog when it opens", async ({ page }) => {
    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await expect(dialog.locator(":focus")).toHaveCount(1);
  });

  test("Tab orbits inside the dialog and never escapes to the page behind", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");

    // Verify dialog is open and has focusable content
    await expect(dialog).toBeVisible();

    // Orbit through every focusable element inside the dialog.
    // The focus trap (useFocusTrap) keeps focus inside via Tab wrapping.
    // :focus-within matches any element inside the dialog that contains
    // a focused descendant — the dialog itself rarely holds focus.
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press("Tab");
      // Direct Playwright focus locator (uses browser focus state directly)
      await expect(dialog.locator(":focus")).toBeVisible();
    }
  });

  test("Escape closes the dialog and returns focus to the review trigger", async ({
    page,
  }) => {
    const trigger = page.locator('[data-album="illmatic"]').getByRole("button");

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});
