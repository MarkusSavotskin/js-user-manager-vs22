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

        // Insert into 'username' field.
        await page.type('#username', 'Ville');
        // Insert into 'age' field.
        await page.type('#age', '50');
        // Click 'Add User' button.
        await page.click('#root > div.AddUser_add_user__K8TWf.Card_card__k2Up5 > form > button');

        // Find added element.
        let element = await page.$('#root > div.UsersList_users__sD0cK.Card_card__k2Up5 > ul > li')
        // Get the value of the added element.
        let value = await page.evaluate(el => el.textContent, element)
        // Print value.
        console.log(value)

        // If value is 'Ville - 50 years old', print 'Success!'
        if (value === 'Ville - 50 years old') {
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