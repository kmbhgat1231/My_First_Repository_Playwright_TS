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

 
 let quickLaunch:Locator=page.locator("//p[text()='Quick Launch']/parent::div/parent::div/parent::div/parent::div//button")
 
  let count=await quickLaunch.count()

  console.log("Quick launch Count is : "+count)
})