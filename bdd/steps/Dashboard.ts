import { Given, Then, When } from '@cucumber/cucumber';
import { loginTestData } from '../testData/loginData';
import { OrangeHRMWorld } from '../support/world';

function getLoginPage(world: OrangeHRMWorld) {
  if (!world.loginPage) {
    throw new Error('Login page fixture was not initialized by the Cucumber hook.');
  }
  return world.loginPage;
}

function getPage(world: OrangeHRMWorld) {
  if (!world.page) {
    throw new Error('Page fixture was not initialized by the Cucumber hook.');
  }
  return world.page;
}

Given('I open the OrangeHRM login page', async function (this: OrangeHRMWorld) {
  await getLoginPage(this).open();
});

Given('I login with valid credentials', async function (this: OrangeHRMWorld) {
  const { username, password } = loginTestData.validUser;
  await getLoginPage(this).login(username, password);
});

When('I open the dashboard URL', async function (this: OrangeHRMWorld) {
  const dashboardUrl =
    'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

  await getPage(this).goto(dashboardUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
});

Then('I should see the dashboard page', async function (this: OrangeHRMWorld) {
  await getLoginPage(this).verifyDashboard();
});

Then('I should see the Dashboard heading', async function (this: OrangeHRMWorld) {
  await getLoginPage(this).verifyDashboard();
});