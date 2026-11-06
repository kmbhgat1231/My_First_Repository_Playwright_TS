//Functional flow of OrangeHRM>>log in with UN and Pw >>go to dashboard>>validate dashboard heading
//then find seven section and validate their inner text

import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';

test('OrangeHRM Functional Flow',async({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
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
    console.log("Heading Text is : "+headingText);
    expect(headingText).toBe('Dashboard');

   let allDivisionsLocator=page.locator("//p[text()='Time at Work']/parent::div/parent::div/parent::div/parent::div/parent::div//i/following-sibling::p");

    let data:string[]=[] ;
    data.push('Time at Work');
    data.push('My Actions');
    data.push('Quick Launch');
    data.push('Buzz Latest Posts');
    data.push('Employee Distribution by Sub Unit');
    data.push('Employee Distribution by Location');
    await page.pause();
    let count=await allDivisionsLocator.count();
    for(let i=0;i<count;i++){
     let text=await allDivisionsLocator.nth(i).innerText();
      //  console.log(text);//above push data will print it just for our understanding
      expect(data.includes(text)).toBeTruthy();
    }

})

/*
//this code generatrd by AI and paased
import {test,expect,Locator} from '@playwright/test'
import { UIHelper } from '../src/utils/UIHelpers'

test('Functional Flow of Application',async({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  await page.waitForLoadState()
  //await page.pause();
  let username:Locator=page.locator("//input[@name='username']")
  let password:Locator=page.locator("//input[@name='password']")
  let loginBtn:Locator=page.locator("//button[@type='submit']")
 await page.waitForTimeout(3000)

 await UIHelper.fillTextBox(username,"Admin")
 await UIHelper.fillTextBox(password,"admin123")
 await UIHelper.clickElement(loginBtn)

 let dashboard:Locator=page.getByRole('heading',{name:'Dashboard'})
 await page.waitForLoadState()
 const headingText=await dashboard.innerText()
 console.log("Heading Text is : "+headingText)
 await expect(headingText).toBe("Dashboard")
 let allDiv:Locator=page.locator("//p[text()='Time at Work']/parent::div/parent::div/parent::div/parent::div/parent::div//i/following-sibling::p")
await page.pause()
const expectedTexts:string[]=[
  'Time at Work',
  'My Actions',
  'Quick Launch',
  'Buzz Latest Posts',
  'Employee Distribution by Sub Unit',
  'Employee Distribution by Location'
]

 const count=await allDiv.count()
console.log("Division count is : "+count)

for(const expectedText of expectedTexts)
{
 await expect(allDiv.filter({hasText: expectedText})).toHaveCount(1)
}

})*/