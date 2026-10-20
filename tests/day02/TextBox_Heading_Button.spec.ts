import {test, expect,Locator} from '@playwright/test'

test('checking TextBox, Heading and Button', async ({page}) => {


    await page.goto('https://the-internet.herokuapp.com/forgot_password')
     //await page.waitForLoadState('networkidle')// wait till coplete page load and network idle state
  // await page.waitForTimeout(2000)// wait for 2 sec
     let headingText = await page.getByRole('heading',{name: 'Forgot Password'}).innerText()
    console.log("Heading Text is : "+headingText)
    await expect(headingText).toBe('Forgot Password')
    await page.pause()
    await page.getByRole('textbox',{name: 'E-mail'}).fill('hello@example.com')
     await page.pause()
    await page.getByRole('button', {name:'Retrieve password'}).click()
    await page.pause(); //headed mode madhe pause kel tar page disate contunue kara ani next exicution hoil
})
// npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --project=chromium --headed
//above cmd u can see the page while opening on browser

// npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --project=chromium
// above cmd u can not see the page while opening on browser it is headless mode

//npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --headed // 3 browser var headed mode ughdatana disel page.pause() namtar continue kar for next exucution