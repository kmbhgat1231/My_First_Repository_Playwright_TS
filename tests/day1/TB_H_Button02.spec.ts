import {test, expect,Locator} from '@playwright/test'

test('checking TextBox, Heading and Button', async ({page}) => {


    await page.goto('https://the-internet.herokuapp.com/forgot_password')
    await page.waitForTimeout(2000)
    let headingLocator: Locator =page.getByRole('heading',{name: 'Forgot Password'})
    let flag =await headingLocator.isVisible()

    flag=await headingLocator.isEnabled() && flag

    if(flag){
        console.log("*************************************")
        console.log("heading is visible and enabled")

        let headingText =await headingLocator.innerText()
        console.log("**********************")
        console.log("Heading Text is : "+headingText)
        await expect(headingText).toBe('Forgot Password') //expect is an asertion for campare
    }
    else{
        console.log("heading is not visible or enabled")
    }
    
    let emailtextboxLocator: Locator = page.getByRole('textbox',{name: 'E-mail'})
    let flag1 =await emailtextboxLocator.isVisible()

    flag1=await emailtextboxLocator.isEnabled() && flag1

    if(flag1){
console.log("******************************")
console.log("Email textbox is visible amd enabled")

 await emailtextboxLocator.fill("kishor@234.com")
    }
    else{
        console.log("Email Textbox is not visible or enabled")
    }

    let retrievePwButton: Locator=page.getByRole('button',{name:'Retrieve password'})
    await retrievePwButton.click()

    let sentMailTextLocator= page.getByText("Your e-mail's been sent!")
   let  sentMailText=await sentMailTextLocator.innerText()
    console.log("****************")
    console.log("Sent Mail Text Is :"+sentMailText)
    await expect(sentMailText).toBe("Your e-mail's been sent!")
    


}

)