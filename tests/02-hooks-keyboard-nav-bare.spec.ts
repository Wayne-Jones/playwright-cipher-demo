import { test, expect } from "@playwright/test";

/**
 * TRACK 02 — "Hooks" (bare, no fixtures / no POM)
 *
 * Same behaviors verified in 02-hooks-keyboard-nav.spec.ts but written
 * without a Page Object Model or custom fixtures. Each test is self-contained.
 *
 * A hook is the part everyone sings back — the part of a song that everyone
 * remembers. Test hooks (beforeEach/afterEach) let you set up and tear down
 * shared state with confidence.
 */

test.describe("Track 02 — Hooks (Without Fixtures & POM)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /every album/i }),
    ).toBeVisible();
  });

  test("Verify modalClose button is focused when modal is open", async ({
    page,
  }) => {
    // Open the review modal for "illmatic"
    await page
      .locator('[data-album="illmatic"]')
      .getByRole("button", { name: /read review/i })
      .click();

    // Modal should be visible
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // The close button should be focused
    const closeButton = modal.getByRole("button", { name: "Close dialog" });
    await expect(closeButton).toBeFocused();
  });

  test("Verify that focus cycles through elements when modal is open", async ({
    page,
  }) => {
    // Open the review modal
    await page
      .locator('[data-album="illmatic"]')
      .getByRole("button", { name: /read review/i })
      .click();

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    const closeButton = modal.getByRole("button", { name: "Close dialog" });
    await expect(closeButton).toBeFocused();

    // Cycle focus forward through all focusable elements in the modal.
    // Count them to know how many Tabs to press.
    const focusable = modal.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const count = await focusable.count();

    // Press Tab (count + 2) times to wrap around once.
    // cycleFocusForward() does count+1 tabs, then tabToModal() does 1 more.
    for (let i = 0; i < count + 2; i++) {
      await page.keyboard.press("Tab");
    }

    // Focus should still be within the modal (it wraps around)
    await expect(modal).toBeVisible();
    await expect(closeButton).toBeFocused();
  });

  test("Verify when modal closes, focus is returned to element that opened it", async ({
    page,
  }) => {
    // Grab a reference to the opener button before opening the modal
    const opener = page
      .locator('[data-album="illmatic"]')
      .getByRole("button", { name: /read review/i });

    // Open the review modal
    await opener.click();

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    const closeButton = modal.getByRole("button", { name: "Close dialog" });
    await expect(closeButton).toBeFocused();

    // Close the modal with Escape
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();

    // Focus should return to the opener button
    await expect(opener).toBeFocused();
  });
});
