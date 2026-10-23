import {test,expect,Locator} from '@playwright/test';

test('Handling Web Tables', async({page}) =>{


    await page.goto('https://the-internet.herokuapp.com/tables');
    await page.waitForTimeout(2000);

    let cellLocator=page.locator("xpath=//table[@id='table1']/tbody/tr[2]/td");//2nd row cell count
    let cellCount=await cellLocator.count();
    console.log("Cell Count is : "+cellCount);

    for(let i=0;i<cellCount;i++)
    {
//fetching data from each cell of 2nd row with the help of for loop
        let cellText=await page.locator("xpath=//table[@id='table1']/tbody/tr[2]/td").nth(i).textContent();

        console.log("Cell "+(i+1)+": "+cellText?.trim().replace(/\s+/g," "));
    }
})