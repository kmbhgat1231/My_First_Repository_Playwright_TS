# Playwright page fixtures

`tests/fixtures.ts` is the shared entry point for page-object fixtures. It
provides `loginPage`, `dashboardPage`, and `pimPage`, each constructed with the
test's built-in Playwright `page`. Playwright creates a fresh page and fixture
instances for each test.

## Use the shared fixtures

Import `test` and `expect` from the shared fixture module instead of directly
from `@playwright/test` when a test needs page objects:

```ts
import { expect, test } from '../fixtures';
import { validUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';

test('opens the dashboard after login', async ({ loginPage, dashboardPage, page }) => {
  const { userName, password } = validUser;
  if (!userName || !password) {
    throw new Error('Valid OrangeHRM login credentials are not configured.');
  }

  await loginPage.open();
  await loginPage.login(userName, password);

  await dashboardPage.verifyDashboardPageLoaded();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Use the correct relative path for the test's directory. For example, a test in
`tests/day09` imports the fixtures with `../fixtures`.

The built-in `page` fixture remains available alongside the page-object
fixtures when a test needs direct access to a locator or browser API.

## PIM fixture and coverage

The `pimPage` fixture wraps `src/pages/PIMPage.ts`. The PIM tests in
`tests/day09/PIMPage.spec.ts` log in before using it and cover:

- Employee List loading and table columns
- Searching by an employee ID, no-results behavior, and resetting filters
- Required-field validation on the Add Employee form
- Searching and resetting Employee Reports
- The five PIM Configuration menu options

These tests avoid saving or deleting employee/report records in the shared
OrangeHRM demo environment.

## Add a fixture for another page object

After implementing a page object under `src/pages`, import its class in
`tests/fixtures.ts`, add its type to `PageFixtures`, and register it with
`base.extend` following the existing `pimPage` pattern.