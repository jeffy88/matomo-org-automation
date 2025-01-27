const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");

setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});

Given("I am on the home page", async () => {

    await page.goto("https://matomo.org/");

});

When('I click the cloud link', async function () {

    await page.locator("//a[text()='Cloud']").waitFor();

    await page.locator("//a[text()='Cloud']").click();

});

Then('I am directed to the cloud page', async function () {

    await page.waitForLoadState('domcontentloaded'); // Ensure page load completion
    const currentURL = await page.url();
    if (currentURL !== 'https://matomo.org/matomo-cloud/') {
        throw new Error(`Expected URL to be 'https://matomo.org/matomo-cloud/' but got '${currentURL}'`);
    }
    console.log('Successfully navigated to the cloud page');
});

After(async function () {

    await browser.close();

})