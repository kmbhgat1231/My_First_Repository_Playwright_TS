import {test,expect,Locator} from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { validUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';
import { invalidUser } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';
import { missingUsername,missingPassword } from '../../src/testData/InterfaceOrangeHRMLoginTestdata';


test('Valid Login',async({page}) =>{

    const loginPageObj=new LoginPage(page);
    await loginPageObj.open();
    await loginPageObj.login(validUser.userName,validUser.password);//red error is bcs of ? in interface but program run hoto
    await loginPageObj.verifyDashboard();// why not verifying
})

test('Invalid Login',async({page}) =>{

    const loginPageObj=new LoginPage(page);

    await loginPageObj.open();
    await loginPageObj.login(invalidUser.userName,invalidUser.password);//red error is bcs of ? in interface but program run hoto
   await loginPageObj.verifyDashboard();
})

test('Missing Username',async({page}) =>{

    const loginPageObj=new LoginPage(page);

    await loginPageObj.open();
    await loginPageObj.login('' , missingUsername.password);//red error is bcs of ? in interface but program run hoto
   await loginPageObj.verifyDashboard();
})

test('Missing Password',async({page}) =>{

    const loginPageObj=new LoginPage(page);

    await loginPageObj.open();
    await loginPageObj.login(missingPassword.userName,'');//red error is bcs of ? in interface but program run hoto
   await loginPageObj.verifyDashboard();
})