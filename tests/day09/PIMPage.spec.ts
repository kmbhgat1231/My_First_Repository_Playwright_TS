import { expect, test } from '../fixtures';
import { validUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';

test.describe('OrangeHRM PIM', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, pimPage }) => {
    const { userName, password } = validUser;
    if (!userName || !password) {
      throw new Error('Valid OrangeHRM login credentials are not configured.');
    }

    await loginPage.open();
    await loginPage.login(userName, password);
    await dashboardPage.verifyDashboardPageLoaded();
    await pimPage.open();
  });

  test('displays the employee list and its columns', async ({ pimPage }) => {
    await pimPage.verifyEmployeeListLoaded();
    expect(await pimPage.getEmployeeRowCount()).toBeGreaterThan(0);
  });

  test('searches for an unknown employee and resets the filter', async ({ pimPage }) => {
    const initialRowCount = await pimPage.getEmployeeRowCount();
    expect(initialRowCount).toBeGreaterThan(0);

    await pimPage.searchEmployeesById('PIM-EMPLOYEE-NOT-FOUND');
    await expect.poll(() => pimPage.getEmployeeRowCount()).toBe(0);

    await pimPage.resetEmployeeSearch();
    await expect.poll(() => pimPage.getEmployeeRowCount()).toBe(initialRowCount);
    await pimPage.verifyEmployeeIdFilterCleared();
  });

  test('validates required fields when adding an employee', async ({ pimPage }) => {
    await pimPage.openAddEmployee();
    await pimPage.saveNewEmployee();
    await pimPage.verifyRequiredEmployeeFields();
  });

  test('searches for a report and resets the report filter', async ({ pimPage }) => {
    await pimPage.openReports();
    const initialRowCount = await pimPage.getReportRowCount();
    expect(initialRowCount).toBeGreaterThan(0);

    await pimPage.searchReportsByName('PIM Sample Report');
    await expect.poll(() => pimPage.getReportRowCount()).toBe(1);
    await pimPage.verifyReportVisible('PIM Sample Report');

    await pimPage.resetReportSearch();
    await expect.poll(() => pimPage.getReportRowCount()).toBe(initialRowCount);
  });

  test('shows all PIM configuration options', async ({ pimPage }) => {
    await pimPage.openConfigurationMenu();
    await pimPage.verifyConfigurationOptions();
  });
});