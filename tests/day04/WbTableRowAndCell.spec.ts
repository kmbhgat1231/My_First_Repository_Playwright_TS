//Printing data from WebTable 

import {test} from '@playwright/test';

test('Reading Web Table' , async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/tables');
    await page.waitForTimeout(2000);
    
    let rowLocator=page.locator("xpath=//table[@id='table1']/tbody/tr");//cover 1 of 4 row
    let rowCount=await rowLocator.count();
    console.log("Row Count is : "+rowCount);

    let cellLocator=page.locator("xpath=//table[@id='table1']/tbody/tr[1]/td");//cover 1 of 6 cell of 1st row
    let cellCount=await cellLocator.count();
    console.log("Cell count is : "+cellCount);

    for(let j=0;j<rowCount;j++)
    {
    let actualData:string="";

    for(let i=0;i<cellCount;i++)
    {
        //below locator print the data from 1st R>1st cell like till 4th R>>6cell
        let cellText=await page.locator("xpath=//table[@id='table1']/tbody/tr").nth(j).locator('td').nth(i).innerText();

        actualData +=cellText.trim().replace(/\s+/g," ")+"\t";
    }
    console.log(actualData);

    }


})


// cmd to run >> npx playwright test tests/day04/WbTableRowAndCell.spec.ts --project=chromium --headed
//practice for another webtables
//OrangeHRM Admin table xpath for analysis play with number this is dynamic table
//(//div[text()='Admin'])[1]/parent::div/parent::div/parent::div/following-sibling::div[1]/child::div/child::div[1]
//findind xpath for dyanamic webtable is difficult