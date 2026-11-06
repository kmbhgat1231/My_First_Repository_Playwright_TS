import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const jsonFilePath = path.resolve(__dirname, '../../src/testData/OrangeHRMLoginTestData.json');
const loginData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

test('OrangeHRM login using JSON data', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const username = page.locator("input[name='username']");
  const password = page.locator("input[name='password']");
  const loginButton = page.locator("button[type='submit']");

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill(loginData.validUser.userName);
  await password.fill(loginData.validUser.password);
  await loginButton.click();

  await page.waitForURL(/.*dashboard.*/i, { timeout: 60000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
