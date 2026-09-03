// tests/02-hooks-keyboard-nav-v2.spec.ts
import { test as base, expect } from "@playwright/test";
import { BoomboxPage } from "./pages/boombox.page";

/**
 * TRACK 02 — "Hooks"
 * A hook is the part everyone sings back — its the part of a song that everyone sings.
 * Fixtures allow you to set up a test with confidence. Using the Page Object Model (POM) pattern
 * it allows for reuse and better readability of tests. Especially if you have repeat tasks.
 */

type HooksTestFixture = {
  boomboxPage: BoomboxPage;
};

export const test = base.extend<HooksTestFixture>({
  boomboxPage: async ({ page }, use) => {
    const boomboxPage = new BoomboxPage(page);
    await boomboxPage.goto();
    await use(boomboxPage);
  },
});

test.describe("Track 02 — Hooks (POM Fixture)", () => {
  test("Verify modalClose button is focused when modal is open", async ({
    boomboxPage,
  }) => {
    await boomboxPage.openReview("illmatic");
    await expect(boomboxPage.modalCloseButton).toBeFocused();
  });

  test("Verify that focus cycles through elements when modal is open", async ({ boomboxPage }) => {
    await boomboxPage.openReview("illmatic");
    await expect(boomboxPage.modalCloseButton).toBeFocused();

    // Use POM focus cycle method (reusable action)
    await boomboxPage.cycleFocusForward();
    // Verify focus is still within modal (doesn't escape to page)
    await expect(boomboxPage.modal).toBeVisible();
    // One more Tab wraps focus back to first element
    await boomboxPage.tabToModal();
    await expect(boomboxPage.modalCloseButton).toBeFocused();
  });

  test("Verify when modal closes, focus is returned to element that opened it", async ({
    boomboxPage,
    page,
  }) => {
    // Get reference to the opener button before opening
    const opener = page
      .locator('[data-album="illmatic"]')
      .getByRole("button", { name: /read review/i });

    await boomboxPage.openReview("illmatic");
    await expect(boomboxPage.modalCloseButton).toBeFocused();
    
    // Close modal with Escape
    await boomboxPage.closeModal();
    await boomboxPage.expectModalClosed();

    // Focus should return to the opener
    await expect(opener).toBeFocused();
  });
});
