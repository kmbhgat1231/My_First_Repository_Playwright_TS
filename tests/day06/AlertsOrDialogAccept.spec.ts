// Handling alert or Dialog >> accept 
import {test,expect,Locator} from '@playwright/test';

test('Handle Js Alert' , async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(2000);

    page.on('dialog' , async dialog =>{ //syntax keep in mind
         expect(dialog.type()).toBe('alert');//these assertion is not manadatory
        expect(dialog.message()).toBe('I am a JS Alert'); ////these assertion is not manadatory
        await dialog.accept();
    });

    await page.getByText('Click for JS Alert').click(); //click on JS Confirm btn
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');//Asserting msg using css
})