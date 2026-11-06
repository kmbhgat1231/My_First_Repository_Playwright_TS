import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import {
  closeScenarioFixtures,
  createScenarioFixtures,
} from './fixtures';
import { OrangeHRMWorld } from './world';

setDefaultTimeout(30_000);

Before(async function (this: OrangeHRMWorld) {
  await createScenarioFixtures(this);
});

After(async function (this: OrangeHRMWorld) {
  await closeScenarioFixtures(this);
});
