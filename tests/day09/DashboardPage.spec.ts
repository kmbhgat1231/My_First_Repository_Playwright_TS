
//This page script is written by copilot using mcp server pure AI Script
import { expect, test } from '../fixtures';
import { validUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';

test.describe('OrangeHRM Dashboard', () => {
  test.beforeEach(async ({ loginPage }) => {
    if (!validUser.userName || !validUser.password) {
      throw new Error('Valid OrangeHRM login credentials are not configured.');
    }

    await loginPage.open();
    await loginPage.login(validUser.userName, validUser.password);
  });

  test('opens the dashboard after a valid login', async ({ dashboardPage }) => {
    await dashboardPage.verifyDashboardPageLoaded();
  });

  test('displays all seven dashboard widgets', async ({ dashboardPage }) => {
    await dashboardPage.verifyAllWidgetsAreVisible();
  });

  test('displays the OrangeHRM version and copyright in the footer', async ({ page, dashboardPage }) => {
    await dashboardPage.verifyApplicationFooterIsVisible();
    await expect(page.getByRole('link', { name: 'OrangeHRM, Inc' })).toBeVisible();
  });
});
//cmd>> npx playwright test tests/day09/DashboardPage.spec.ts --project=chromium --headed

/*prompt>> Open OrangeHRM application using url https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
with mcp server explore dashboard page and wright all the script in DadhboardPage and generate spec file 
day09 folder for it*/
