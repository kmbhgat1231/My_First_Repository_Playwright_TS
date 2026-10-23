import{test} from '@playwright/test';

test('Record Video', async({browser}) =>{

    const context=await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: { width : 1280 , height : 720 }
        }
    });

    const page=await context.newPage(); //page will get control of Page here

    await page.goto('https://the-internet.herokuapp.com/'); // vid will start  here
    await page.waitForTimeout(2000);
    let ABTestingLocator=page.getByRole('link',{name:'A/B Testing'});
    await ABTestingLocator.click();
    await page.goBack();

    //close the context to save the video
    await context.close();
})

// cmd >>npx playwright test tests/day07/VideoRecording.spec.ts --project=chromium --headed
//videos will stored in videos folder 
//browser have complete authority having page in it
//every time new video will stored with old will remain there
// here we record opening of the page to going back to page