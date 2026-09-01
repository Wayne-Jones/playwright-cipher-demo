import { test as base, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

/**
 * Page Object Model for the Boombox application.
 * Encapsulates all UI interactions in one place.
 */
export class BoomboxPageObject {
  page: import("@playwright/test").Page;

  constructor(page: import("@playwright/test").Page) {
    this.page = page;
  }

  /** Navigate to the homepage and wait for it to load */
  async goto() {
    await this.page.goto("/");
    await expect(
      this.page.getByRole("heading", { name: /every album/i }),
    ).toBeVisible();
  }

  /** Open a review for an album by its slug */
  async openReview(slug: string) {
    await this.page
      .locator(`[data-album="${slug}"]`)
      .getByRole("button", { name: /read review/i })
      .click();
  }

  /** Open a review by album title (more user-friendly) */
  async openReviewByTitle(title: string) {
    const slug = await this.page
      .locator(`h3.card__title:has-text("${title}")`)
      .getAttribute("data-album");
    if (!slug) throw new Error(`Album "${title}" not found`);
    await this.openReview(slug);
  }

  /** Get the modal dialog element */
  get modal() {
    return this.page.locator(".modal");
  }

  /** Get the tracklist in the opened review */
  get tracklist() {
    return this.page.locator("[data-testid='tracklist']");
  }

  /** Get album cards */
  get albumCards() {
    return this.page.locator("[data-testid='album-card']");
  }

  /** Close the current dialog/modal */
  async closeModal() {
    await this.page.keyboard.press("Escape");
  }

  /** Verify the modal is closed */
  async expectModalClosed() {
    await expect(this.modal).toHaveCount(0);
  }

  /** Run an axe accessibility scan */
  async scanForAccessibility() {
    return new AxeBuilder({ page: this.page }).analyze();
  }
}

/**
 * The Hook — the shared sample every track drops into.
 * A custom fixture that provides a BoomboxPageObject instance.
 */

export interface Boombox {
  goto: () => Promise<void>;
  openReview: (slug: string) => Promise<void>;
  openReviewByTitle: (title: string) => Promise<void>;
  page: import("@playwright/test").Page;
  modal: import("@playwright/test").Locator;
  tracklist: import("@playwright/test").Locator;
  albumCards: import("@playwright/test").Locator;
  closeModal: () => Promise<void>;
  expectModalClosed: () => Promise<void>;
  scanForAccessibility: () => Promise<AxeResults>;
}

export const test = base.extend<{
  boombox: Boombox;
  a11yScan: () => Promise<AxeResults>;
}>({
  boombox: async ({ page }, use) => {
    const bot = new BoomboxPageObject(page);
    await use(bot);
  },
  a11yScan: async ({ page }, use) => {
    await use(async () => new AxeBuilder({ page }).analyze());
  },
});

export { expect };

/**
 * Which violations count as a broken flow — serious impact only,
 * so we don't drown the suite in noise.
 */
export function seriousViolations(results: AxeResults) {
  return results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
}
