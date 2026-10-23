import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';

test('Taking Screenshot' , async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForTimeout(2000);

    //every time will create same png so while adding new old one wipe out 
   // await page.screenshot({path: 'screenshots/the-intenet-homepage.png' , fullPage:true});

   //everytime will create unique png file so previously saves png file will not wipe out
    await page.screenshot({path: `screenshots/the-intenet-homepage+${UIHelper.generateRandomText()}.png` , fullPage:true});
})

// run either one 
// UIHelper.generateRandomText() >>this generic static method has been used to create unique .png file
// cmd>>  npx playwright test tests/day07/Screenshot.spec.ts --project=chromium --headed