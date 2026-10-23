//Handling Alert or Dialog >>dismiss or cancel 
import {test,expect,Locator} from '@playwright/test';

test('Handle JS Confirm - Dismiss' , async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(2000);

    page.on('dialog' , async dialog =>{
    await dialog.dismiss();// these 2 lines handled alert
    })

await page.getByText('Click for JS Confirm').click(); //click on JS confirm btn 
await expect(page.locator('#result')).toHaveText('You clicked: Cancel'); //aserting msg using css

})

// cmd>>  npx playwright test tests/day06/AlertOrDialogDismiss.spec.ts --project=chromium --headed