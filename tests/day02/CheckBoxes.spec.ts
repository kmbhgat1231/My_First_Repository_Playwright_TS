import {test,expect,Locator} from "@playwright/test"

test('CheckBoxes Test', async({page}) => {

    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    await page.waitForTimeout(2000);

    let checkBox1Locator:Locator=page.getByRole('checkbox').nth(0)//using indexing find locator
    let checkBox2Locator:Locator=page.getByRole('checkbox').nth(1)//using indexing find locator

    let flag=await checkBox1Locator.isVisible()

    flag= await checkBox1Locator.isEnabled() && flag

    if(flag){

        let checkBox1Status=await checkBox1Locator.isChecked()
        console.log("********************************")
        console.log("CheckBox 1 checked Status is : "+checkBox1Status)

        if(! checkBox1Status){
    
            await checkBox1Locator.check()
          //  await page.pause() // npx playwright test tests/day02/CheckBoxes.spec.ts --project=chromium --headed >>cmd

        }
        else{
            console.log("CheckBox 1 is already ckecked")
        }
    }
    
let flag1=await checkBox2Locator.isVisible()

    flag1= await checkBox2Locator.isEnabled() && flag1

    if(flag1){

        let checkBox2Status=await checkBox2Locator.isChecked()
        console.log("********************************")
        console.log("CheckBox 2 checked Status is : "+checkBox2Status)

        if(! checkBox2Status){
    
            await checkBox2Locator.check()
           // await page.pause() // npx playwright test tests/day02/CheckBoxes.spec.ts --project=chromium --headed >>cmd
          
        }

        else{
            console.log("CheckBox 2 is already ckecked")
        }
    }
    // await page.pause()


})