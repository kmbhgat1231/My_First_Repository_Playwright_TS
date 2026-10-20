import {test, expect} from '@playwright/test'

test('checking TextBox, Heading and Button', async ({page}) => {


    await page.goto('https://the-internet.herokuapp.com/forgot_password')
    let headingText = await page.getByRole('heading',{name: 'Forgot Password'}).innerText()
    console.log("Heading Text is : "+headingText)
    await expect(headingText).toBe('Forgot Password')
    await page.getByRole('textbox',{name: 'E-mail'}).fill('hello@example.com')
    await page.getByRole('button', {name:'Retrieve password'}).click()
    let sentMailText= await page.getByText("Your e-mail's been sent!").innerText()
    console.log("****************")
    console.log("Sent Mail Text Is :"+sentMailText)
    await expect(sentMailText).toBe("Your e-mail's been sent!")
   //await expect(page.getByText("Your e-mail's been sent!")).toBeVisible() //try to fail to see error msg
   // await page.pause(); //headed mode madhe pause kel tar page disate contunue kara ani next exicution hoil
})
// npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --project=chromium --headed
//above cmd u can see the page while opening 

// npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --project=chromium
// above cmd u can not see the page while opening on browser it is headless mode

//npx playwright test tests/day02/TextBox_Heading_Button.spec.ts --headed // 3 browser var headed mode ughdatana disel page.pause() namtar continue kar for next exucution