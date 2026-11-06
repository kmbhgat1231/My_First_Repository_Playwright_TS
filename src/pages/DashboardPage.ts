
//This page script is written by copilot using mcp server pure AI Script

import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly dashboardHeading: Locator;
  private readonly widgetTitles: Locator[];
  private readonly applicationVersion: Locator;
  private readonly copyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.widgetTitles = [
      page.getByText('Time at Work', { exact: true }),
      page.getByText('My Actions', { exact: true }),
      page.getByText('Quick Launch', { exact: true }),
      page.getByText('Buzz Latest Posts', { exact: true }),
      page.getByText('Employees on Leave Today', { exact: true }),
      page.getByText('Employee Distribution by Sub Unit', { exact: true }),
      page.getByText('Employee Distribution by Location', { exact: true }),
    ];
    this.applicationVersion = page.getByText('OrangeHRM OS 5.9', { exact: true });
    this.copyright = page.getByText(/© 2005 - \d{4}/);
  }

  async verifyDashboardPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(this.page).toHaveTitle('OrangeHRM');
    await expect(this.dashboardHeading).toBeVisible();
    await expect(this.dashboardHeading).toHaveText('Dashboard');
  }

  async verifyAllWidgetsAreVisible(): Promise<void> {
    for (const widgetTitle of this.widgetTitles) {
      await expect(widgetTitle).toBeVisible();
    }
  }

  async verifyApplicationFooterIsVisible(): Promise<void> {
    await expect(this.applicationVersion).toBeVisible();
    await expect(this.copyright).toBeVisible();
  }
}

/*prompt>> Open OrangeHRM application using url https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
with mcp server explore dashboard page and wright all the script in DadhboardPage and generate spec file 
day09 folder for it*/