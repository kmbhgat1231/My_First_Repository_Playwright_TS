import { Given, Then, When } from '@cucumber/cucumber';
import { loginTestData } from '../testData/loginData';
import { OrangeHRMWorld } from '../support/world';

function getLoginPage(world: OrangeHRMWorld) {
  if (!world.loginPage) {
    throw new Error('Login page fixture was not initialized by the Cucumber hook.');
  }

  return world.loginPage;
}

Given('I open the OrangeHRM login page', async function (this: OrangeHRMWorld) {
  await getLoginPage(this).open();
});

When('I log in with valid credentials', async function (this: OrangeHRMWorld) {
  const { username, password } = loginTestData.validUser;
  await getLoginPage(this).login(username, password);
});

When('I log in with invalid credentials', async function (this: OrangeHRMWorld) {
  const { username, password } = loginTestData.invalidUser;
  await getLoginPage(this).login(username, password);
});

When('I log in without a username', async function (this: OrangeHRMWorld) {
  const { username, password } = loginTestData.missingUsername;
  await getLoginPage(this).login(username, password);
});

When('I log in without a password', async function (this: OrangeHRMWorld) {
  const { username, password } = loginTestData.missingPassword;
  await getLoginPage(this).login(username, password);
});

Then(
  'I should be taken to the OrangeHRM dashboard',
  async function (this: OrangeHRMWorld) {
    await getLoginPage(this).verifyDashboard();
  },
);

Then(
  'I should see an invalid credentials message',
  async function (this: OrangeHRMWorld) {
    await getLoginPage(this).verifyInvalidCredentialsMessage();
  },
);

Then(
  'I should see a required message for the username',
  async function (this: OrangeHRMWorld) {
    await getLoginPage(this).verifyUsernameRequired();
  },
);

Then(
  'I should see a required message for the password',
  async function (this: OrangeHRMWorld) {
    await getLoginPage(this).verifyPasswordRequired();
  },
);
//cmd>> npm test  