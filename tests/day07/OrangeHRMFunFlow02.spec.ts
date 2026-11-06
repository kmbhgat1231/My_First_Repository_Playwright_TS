// Functional flow of OrangeHRM: log in, open the dashboard, and validate its section titles.

import { expect, test } from '@playwright/test';

test('OrangeHRM Functional Flow', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.locator("//input[@name='username']").fill('Admin');
    await page.locator("//input[@name='password']").fill('admin123');
    await page.locator("//button[@type='submit']").click();

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');

    const sectionTitles = [
        'Time at Work',
        'My Actions',
        'Quick Launch',
        'Buzz Latest Posts',
        'Employee Distribution by Sub Unit',
        'Employee Distribution by Location',
    ];

    for (const title of sectionTitles) {
        await expect(page.getByText(title, { exact: true })).toBeVisible();
    }
});
