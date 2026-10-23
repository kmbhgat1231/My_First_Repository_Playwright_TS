
//Handling switch tab
import {test,expect} from '@playwright/test';

test('Handle new tab in Playwright',async({page}) =>{

 // Navigate to application   
await page.goto('https://the-internet.herokuapp.com/');

// wait for the new tab popup
const popupPromise=page.waitForEvent('popup');//new tab will taken care

//click on Elemental Selenium >> at bottom
await page.getByRole('link', { name: 'Elemental Selenium' }).click();

//Get the new tab
const newTab=await popupPromise;//will perform actions on new tab

//wait for the new tab to load
await newTab.waitForLoadState();

//get and print the new tab title
const newTabTitle=await newTab.title();
console.log("New Tab Title is : "+newTabTitle);

//close the new tab
await newTab.close();

//back to home page and print homepage title
console.log('Home Page Title is :', await page.title());//no need to switch back method to go home page direct action can perform

//verify home page title
await expect(page).toHaveTitle('The Internet');
})

//cmd>>  npx playwright test tests/day06/SwitchTab.spec.ts --project=chromium --headed