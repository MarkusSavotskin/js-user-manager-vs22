const puppeteer = require('puppeteer');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);
    // 'inputs' array.
    const inputs = [['Ville', '50'], ['Pillu', '65'], ['Uibo', '32']]

    try {
        // Navigate to page URL.
        await page.goto("http://localhost:3000");

        for (let i = 0; i < inputs.length; i++) {
            // Insert into 'username' field.
            await page.type('#username', inputs[i][0]);
            // Insert into 'age' field.
            await page.type('#age', inputs[i][1]);
            // Click 'Add User' button.
            await page.click('#root > div.AddUser_add_user__K8TWf.Card_card__k2Up5 > form > button');
        }
        // Find all added elements.
        let elements = await page.evaluate(() => Array.from(document.querySelectorAll('li'), element => element.textContent));
        // Iterate through all the elements.
        for (let i = 0; i < elements.length; i++) {
            // Print element value.
            console.log(elements[i])
        }

        // If the length of the 'elements' array equals with the length of the 'inputs' array, print 'Success!'
        if (elements.length === inputs.length) {
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