//Handling Alert or Dialoge >> sending data into alert textbox
import {test,expect,Locator} from '@playwright/test';

test('Handle JS Promt' , async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(2000);

    page.on('dialog' , async dialog =>{
    await dialog.accept('Hello Kishor');// pass data in alert text box
    })

await page.getByText('Click for JS Prompt').click(); //click on JS Prompt btn 
await expect(page.locator('#result')).toHaveText('You entered: Hello Kishor'); //aserting msg using css

})

// cmd>> npx playwright test tests/day06/AlertSendData.spec.ts --project=chromium --headed