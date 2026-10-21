//these are generic(common) methods used in tests  

import { expect, Locator } from "@playwright/test";

export class UIHelper
{
static async isReady(locator:Locator):Promise<boolean>{

return (await locator.isVisible()) && (await locator.isEnabled());
}

static async verifyHeading(locator: Locator ,expectedText: string){

    if(await this.isReady(locator)){
        const actualText=await locator.innerText();
        console.log("Heading Text : ",actualText);
        await expect(locator).toHaveText(expectedText);
    }
    else {
        console.log("Heading is not Visible or Enabled");
    }
}

static async fillTextBox(locator:Locator , text:string){
    if(await this.isReady(locator)){
        await locator.clear();
        await locator.fill(text);
    }
    else{
        console.log("TextBox is not visible or Enabled");
    }
}

static async clickElement(locator:Locator){
    if(await this.isReady(locator)){
        await locator.click();
    }
    else{
        console.log("Element is not Visible or Enabled");
    }
}

}