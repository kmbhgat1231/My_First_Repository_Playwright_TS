import {test,expect,Locator} from '@playwright/test'
import { UIHelper } from '../../src/utils/UIHelpers';

test("Dealing with DropDown",async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/dropdown');

    let dropDownLocator:Locator=page.getByRole('combobox');
    dropDownLocator.selectOption('Option 2');
    await page.pause();

})

//cmd==>>  npx playwright test tests/day04/DropDown.spec.ts --project=chromium --headed
//combobox for dropdowns and we select option from give DD from Dom