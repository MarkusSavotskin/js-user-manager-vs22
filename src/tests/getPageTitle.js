const puppeteer = require('puppeteer');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    try {
        // Navigate to page URL.
        await page.goto("http://localhost:3000");
        // Get page title.
        const title = await page.title();
        // Print page title
        console.log(title);
        // If page title is 'React App', print 'Success!'
        if (title === 'React App') {
            console.log('\nSuccess!')
        }
    } catch (err) {
        console.log(err);
    } finally {
        await sleep(5000)
        console.log('\nClosing browser...')
        await browser.close();
    }
})();