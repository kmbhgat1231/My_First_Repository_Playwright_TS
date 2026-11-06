import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const testDataPath = path.resolve(__dirname, '../../src/testData/TestData.json');
const loginData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

test('Login using JSON data from TestData.json', async ({ page }) => {
  const username = loginData.username;
  const password = loginData.password;
  const url = loginData.url;
  await page.pause();
  if (!username || !password || !url) {
    throw new Error('Missing login data in TestData.json');
  }

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.locator("input[name='username']").fill(username);
  await page.locator("input[name='password']").fill(password);
  await page.locator("button[type='submit']").click();

  await page.waitForURL(/.*dashboard.*/i, { timeout: 60000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});