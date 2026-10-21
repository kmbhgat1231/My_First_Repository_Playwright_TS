
import {test,expect,Locator} from '@playwright/test';
import { UIHelper } from '../../src/utils/UIHelpers';

test('TextBox and Heading button test', async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/forgot_password');
    await page.waitForTimeout(2000);

    let headingLocator:Locator=page.getByRole('heading',{name:'Forgot Password'});
   await UIHelper.verifyHeading(headingLocator , 'Forgot Password');

   let textBoxLocator:Locator=page.getByRole('textbox',{name:'E-mail'});
   await UIHelper.fillTextBox(textBoxLocator , 'kishor123@gmail.com');
   
   let btnLocator:Locator=page.getByRole('button',{name:'Retrieve password'});
   await UIHelper.clickElement(btnLocator);

   let sentMailTextLocator:Locator=page.getByText("Your e-mail's been sent!")
   await UIHelper.verifyHeading(sentMailTextLocator ,"Your e-mail's been sent!") //madhi single cote(') ahe mhanunu ""
   
})

//we have used generic methods verifiHeading(),fillText(),clickElement(),fillText() in above script 

