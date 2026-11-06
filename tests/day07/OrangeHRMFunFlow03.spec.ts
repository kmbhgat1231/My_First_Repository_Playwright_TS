import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';

test('OrangeHRM Functional Flow',async({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(2000);
    await page.waitForLoadState();

    let userNameLocator=page.locator("//input[@name='username']");
    let passwordLocator=page.locator("//input[@name='password']");
    let loginBtnLocator=page.locator("//button[@type='submit']");
    await page.waitForTimeout(3000);//3 sec

    await UIHelper.fillTextBox(userNameLocator , 'Admin');
    await UIHelper.fillTextBox(passwordLocator , 'admin123');
    await UIHelper.clickElement(loginBtnLocator);

    let dashboardLocator=page.getByRole('heading',{name:'Dashboard'});
    await page.waitForLoadState();
    let headingText=await dashboardLocator.innerText();
    expect(headingText).toBe('Dashboard');

    //1 of 6 for buttons 
    let sectQuickLaunchBtnsLocator=page.locator("//p[text()='Quick Launch']/../../..//button");//1 of 6

    let count=await sectQuickLaunchBtnsLocator.count();
    console.log("Quick Launch section buttons count is :  "+count);//6
    
    for(let i=0;i<count;i++)
    {
        await UIHelper.clickElement(sectQuickLaunchBtnsLocator.nth(i));//bring ele and click
         let title=await page.title();
         expect(title).toBe('OrangeHRM');
         await page.waitForLoadState();
        
        await page.goBack();
        }






})