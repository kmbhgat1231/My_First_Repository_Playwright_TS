//Handling Multiple links>> finding all links and navigating to all links and printing title
//vvimp >>in navigating to links lot of pop ups come >>they are not handled so script will failed 
//so just keep in mind the flow of code for practce purpose 
import {test, expect,Locator} from '@playwright/test';

test('Handling Multiple Links', async({page}) =>{


    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForTimeout(2000);

    let linksLocator= page.getByRole('link');//all links will stored here
    let linksCount= await linksLocator.count();
    console.log("Links Count is : "+linksCount)

    for(let i=0;i<linksCount;i++)
    {
        let link=linksLocator.nth(i); //it will bring the link from linksLocator and stored in link
       let linkText=await link.textContent();    //link text will fetch
      let linkHref=await link.getAttribute('href');

   if(! linkHref?.includes('http'))// will ckeck condin that http is apend or not  >> not paerator >>to print comple lonk
        { 
         // console.log(`Link ${i + 1}: ${linkText} - ${'https://the-internet.herokuapp.com' +linkHref}`);//complete url print karel >>text of link  and value of href from dom will printing
         await page.goto('https://the-internet.herokuapp.com' +linkHref);
        }
    else{
       // console.log(`Link ${i + 1}: ${linkText} - ${linkHref}`);
       await page.goto(linkHref);
    }

    console.log(await page.title());
    await page.waitForLoadState();
    await page.goto('https://the-internet.herokuapp.com');

    }
})

//cmd >>  npx playwright test tests/day05/MultipleLinksHandling03.spec.ts --project=chromium 