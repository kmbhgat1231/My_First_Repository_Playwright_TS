import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OrangeHRMWorld } from './world';

export async function createScenarioFixtures(
  world: OrangeHRMWorld,
): Promise<void> {
  world.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
  });
  world.context = await world.browser.newContext();
  world.page = await world.context.newPage();
  world.loginPage = new LoginPage(world.page);
}

export async function closeScenarioFixtures(
  world: OrangeHRMWorld,
): Promise<void> {
  await world.context?.close();
  await world.browser?.close();
}
