// tests/pom/boombox-pom.ts
import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Boombox Page Object Model (POM) for shared UI interactions.
 * Encapsulates all Boombox page actions in one place for reuse.
 */
export class BoomboxPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to homepage and verify header */
  async goto() {
    await this.page.goto("/");
    await expect(
      this.page.getByRole("heading", { name: /every album/i }),
    ).toBeVisible();
  }

  /** Open review for album by slug */
  async openReview(slug: string) {
    await this.page.goto("/");
    await this.page
      .locator(`[data-album="${slug}"]`)
      .getByRole("button", { name: /read review/i })
      .click();
    // Wait for the modal to be visible
    await expect(this.modal).toBeVisible();
  }

  /** Open review by album title */
  async openReviewByTitle(title: string) {
    const slug = await this.page
      .locator(`h3.card__title:has-text("${title}")`)
      .getAttribute("data-album");
    if (!slug) throw new Error(`Album "${title}" not found`);
    await this.openReview(slug);
  }

  /** Get modal dialog element */
  get modal() {
    return this.page.getByRole("dialog");
  }

  /** Get the close button in the modal */
  get modalCloseButton() {
    return this.modal.getByRole("button", { name: "Close dialog" });
  }

  /** Get tracklist within modal using semantic role instead of data-testid */
  get modalTracklist() {
    return this.modal.getByRole("list");
  }

  /** Get album cards within modal using semantic role instead of data-testid */
  get modalAlbumCards() {
    return this.modal.getByRole("article");
  }

  /** Get album cards using semantic role */
  get albumCards() {
    return this.page.getByRole("article");
  }

  /** Close modal */
  async closeModal() {
    await this.page.keyboard.press("Escape");
  }

  /** Verify modal is closed */
  async expectModalClosed() {
    await expect(this.modal).not.toBeVisible();
  }

  /** Tab once to focus first interactive element in modal */
  async tabToModal() {
    await this.page.keyboard.press("Tab");
  }

  /** Cycle focus forward through all focusable elements in modal */
  async cycleFocusForward() {
    const focusable = this.modal.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const count = await focusable.count();
    for (let i = 0; i < count + 1; i++) {
      await this.page.keyboard.press("Tab");
    }
  }

  /** Cycle focus backward through all focusable elements in modal */
  async cycleFocusBackward() {
    const focusable = this.modal.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const count = await focusable.count();
    for (let i = 0; i < count + 1; i++) {
      await this.page.keyboard.press("Shift+Tab");
    }
  }

  /** Run accessibility scan */
  async scanForAccessibility() {
    return new AxeBuilder({ page: this.page }).analyze();
  }

  /** Measure CLS (Cumulative Layout Shift) over a duration */
  async measureCLS(durationMs = 2000): Promise<number> {
    return this.page.evaluate(
      (duration) =>
        new Promise<number>((resolve) => {
          let cls = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const shift = entry as PerformanceEntry & {
                hadRecentInput: boolean;
                value: number;
              };
              if (!shift.hadRecentInput) cls += shift.value;
            }
          });
          observer.observe({ type: "layout-shift", buffered: true });
          setTimeout(() => {
            observer.disconnect();
            resolve(cls);
          }, duration);
        }),
      durationMs,
    );
  }

  /** Wait for album card images to load */
  async waitForImagesToLoad(locator: import("@playwright/test").Locator) {
    await expect
      .poll(async () => {
        const img = locator.locator("img");
        return (
          (await img.count()) > 0 &&
          (await img.evaluate((el) => (el as HTMLImageElement).complete))
        );
      })
      .toBe(true);
  }

  /** Get bounding box of first album card */
  async getFirstCardBoundingBox() {
    const card = this.albumCards.first();
    return card.boundingBox();
  }
}
