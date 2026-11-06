import { expect, type Locator } from '@playwright/test';

export class UIHelper {
  static async fillTextBox(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.fill(value);
  }

  static async clickElement(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  static async verifyText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  static async verifyVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
