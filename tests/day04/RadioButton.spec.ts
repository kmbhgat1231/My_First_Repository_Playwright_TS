import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';

test('Dealing with Radio Button' , async({page}) => {

    await page.goto('https://demo.automationtesting.in/Register.html');

    let maleRadioBtnLocator:Locator=page.locator("//input[@type='radio' and @value='Male']")

    await UIHelper.clickElement(maleRadioBtnLocator);
    await page.pause();

})

//cmd>>  npx playwright test tests/day04/RadioButton.spec.ts --project=chromium --headed