import {test,expect,Locator} from '@playwright/test'
import { UIHelper } from '../../src/utils/UIHelpers'
 
test('Video Recording',async({browser})=>{
  const context=await browser.newContext({
    recordVideo:{
      dir:'videos/',
      size:{width:1280 ,height:720}
    }
  })
const page=await context.newPage()
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
await page.waitForTimeout(2000)
let username=page.locator("//input[@name='username']")
await UIHelper.fillTextBox(username,'Admin')
let password=page.locator("//input[@name='password']")
await UIHelper.fillTextBox(password,'admin123')
let loginBtn=page.locator("//button[text()=' Login ']")
await UIHelper.clickElement(loginBtn)
await page.waitForTimeout(2000)

await page.goBack();
await page.waitForTimeout(2000)
await context.close()

})