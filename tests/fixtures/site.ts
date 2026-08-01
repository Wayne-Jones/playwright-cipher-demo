import { test as base, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

/**
 * The Hook — the shared sample every track drops into.
 * A custom fixture that gives each test a fully-loaded Boombox page,
 * plus a reusable accessibility scan that reports serious violations.
 */

export interface Boombox {
  goto: () => Promise<void>;
  openReview: (slug: string) => Promise<void>;
}

export const test = base.extend<{
  boombox: Boombox;
  a11yScan: () => Promise<AxeResults>;
}>({
  boombox: async ({ page }, use) => {
    await use({
      async goto() {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: /every album/i })).toBeVisible();
      },
      async openReview(slug) {
        await page.locator(`[data-album="${slug}"]`).getByRole("button", { name: /read review/i }).click();
      },
    });
  },
  a11yScan: async ({ page }, use) => {
    use(async () => new AxeBuilder({ page }).analyze());
  },
});

export { expect };

/**
 * Which violations count as a broken flow — serious impact only,
 * so we don't drown the suite in noise.
 */
export function seriousViolations(results: AxeResults) {
  return results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
}
