import { expect, Locator, Page } from '@playwright/test';

export type PIMEmployeeDetails = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export class PIMPage {
  private readonly page: Page;
  private readonly pimModuleLink: Locator;
  private readonly addEmployeeLink: Locator;
  private readonly configurationMenu: Locator;
  private readonly employeeIdInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly employeeTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimModuleLink = page.getByRole('link', { name: 'PIM', exact: true });
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
    this.configurationMenu = page.getByText('Configuration', { exact: true });
    this.employeeIdInput = this.fieldGroup('Employee Id').locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.employeeTable = page.getByRole('table');
  }

  private fieldGroup(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ hasText: label });
  }

  async open(): Promise<void> {
    await this.pimModuleLink.click();
    await this.page.getByRole('heading', { name: 'Employee Information' }).waitFor();
    await this.employeeTable.getByRole('row').nth(1).waitFor();
  }

  async verifyEmployeeListLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList$/);
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
    const columnHeaders = this.employeeTable.getByRole('columnheader');
    await expect(columnHeaders.filter({ hasText: 'Id' }).first()).toBeVisible();
    await expect(columnHeaders.filter({ hasText: 'First (& Middle) Name' })).toBeVisible();
    await expect(columnHeaders.filter({ hasText: 'Last Name' })).toBeVisible();
  }

  async searchEmployeesById(employeeId: string): Promise<void> {
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
  }

  async resetEmployeeSearch(): Promise<void> {
    await this.resetButton.click();
  }

  async verifyEmployeeIdFilterCleared(): Promise<void> {
    await expect(this.employeeIdInput).toHaveValue('');
  }

  async getEmployeeRowCount(): Promise<number> {
    return Math.max(0, (await this.employeeTable.getByRole('row').count()) - 1);
  }

  async openAddEmployee(): Promise<void> {
    await this.addEmployeeLink.click();
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async fillNewEmployee(details: PIMEmployeeDetails): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(details.firstName);
    await this.page.getByPlaceholder('Middle Name').fill(details.middleName ?? '');
    await this.page.getByPlaceholder('Last Name').fill(details.lastName);
  }

  async saveNewEmployee(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifyRequiredEmployeeFields(): Promise<void> {
    const requiredMessages = this.page.getByText('Required', { exact: true });
    await expect(requiredMessages).toHaveCount(2);
  }

  async openReports(): Promise<void> {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDefinedPredefinedReports',
      { waitUntil: 'domcontentloaded' }
    );
    await expect(this.page.getByRole('heading', { name: 'Employee Reports' })).toBeVisible();
    await this.employeeTable.getByRole('row').nth(1).waitFor();
  }

  async searchReportsByName(name: string): Promise<void> {
    const reportNameGroup = this.fieldGroup('Report Name');
    await reportNameGroup.getByRole('textbox').fill(name);
    await this.page.getByRole('option', { name, exact: true }).click();
    await this.searchButton.click();
  }

  async verifyReportVisible(name: string): Promise<void> {
    await expect(this.employeeTable.getByRole('row').filter({ hasText: name })).toBeVisible();
  }

  async getReportRowCount(): Promise<number> {
    return Math.max(0, (await this.employeeTable.getByRole('row').count()) - 1);
  }

  async resetReportSearch(): Promise<void> {
    await this.resetButton.click();
  }

  async openConfigurationMenu(): Promise<void> {
    await this.configurationMenu.click();
  }

  async verifyConfigurationOptions(): Promise<void> {
    for (const option of [
      'Optional Fields',
      'Custom Fields',
      'Data Import',
      'Reporting Methods',
      'Termination Reasons',
    ]) {
      await expect(this.page.getByRole('menuitem', { name: option })).toBeVisible();
    }
  }
}