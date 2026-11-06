import { expect, type Locator, type Page } from '@playwright/test';
import { UIHelper } from '../utils/UIHelper';

const defaultLoginUrl =
  'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly dashboardHeading: Locator;
  private readonly invalidCredentialsMessage: Locator;
  private readonly usernameGroup: Locator;
  private readonly passwordGroup: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.invalidCredentialsMessage = page.getByText('Invalid credentials', {
      exact: true,
    });
    this.usernameGroup = page
      .locator('.oxd-input-group')
      .filter({ has: this.usernameInput });
    this.passwordGroup = page
      .locator('.oxd-input-group')
      .filter({ has: this.passwordInput });
  }

  async open(): Promise<void> {
    const loginUrl = process.env.ORANGEHRM_URL ?? defaultLoginUrl;
    await this.page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await UIHelper.verifyVisible(this.usernameInput);
  }

  async login(username: string, password: string): Promise<void> {
    await UIHelper.fillTextBox(this.usernameInput, username);
    await UIHelper.fillTextBox(this.passwordInput, password);
    await UIHelper.clickElement(this.loginButton);
  }

  async verifyDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/web\/index\.php\/dashboard\/index/,
      { timeout: 15_000 },
    );
    await expect(this.dashboardHeading).toBeVisible({ timeout: 15_000 });
  }

  async verifyInvalidCredentialsMessage(): Promise<void> {
    await UIHelper.verifyVisible(this.invalidCredentialsMessage);
  }

  async verifyUsernameRequired(): Promise<void> {
    await UIHelper.verifyText(
      this.usernameGroup.getByText('Required', { exact: true }),
      'Required',
    );
  }

  async verifyPasswordRequired(): Promise<void> {
    await UIHelper.verifyText(
      this.passwordGroup.getByText('Required', { exact: true }),
      'Required',
    );
  }
}
