import {test, expect} from '@playwright/test'

test('checking A/B testing', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/')
    

    let bool = await page.getByRole('link', {name: 'A/B Testing'}).isVisible()
    
    console.log("Element is visible : "+bool)

    //below line retrevind dada from WE and coparing with expected data if not match TC fails
    expect(await page.getByRole('heading',{name: 'Welcome to the-internet'}).textContent(),"Welcome to the-internet")
} )