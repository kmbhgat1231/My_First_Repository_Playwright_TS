import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';
import { validUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';//same for invalidUser import
//same import for invalid user
test('OrangeHRM Functional Flow',async({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForLoadState();

    let userNameLocator=page.locator("//input[@name='username']");
    let passwordLocator=page.locator("//input[@name='password']");
    let loginBtnLocator=page.locator("//button[@type='submit']");
    await page.waitForTimeout(3000);//3 sec
    await page.pause();
    await UIHelper.fillTextBox(userNameLocator , validUser.userName);//error bcs of ? for sting but run hote
    await UIHelper.fillTextBox(passwordLocator , validUser.password);
    await UIHelper.clickElement(loginBtnLocator);
})

//same for invalidUser
//cmd >>  npx playwright test tests/day08_OHRMLoginUsingTestDataFromInterface/OHRMLoginUsingTestData.spec.ts --project=chromium --headed
