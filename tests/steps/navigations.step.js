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

When('I click the try it for free button', async function () {

    await page.locator("//a[contains(text(),'TRY IT FOR FREE')]").waitFor();

    await page.locator("//a[contains(text(),'TRY IT FOR FREE')]").click();

});

Then('I am directed to the cloud page', async function () {

    await page.waitForLoadState('domcontentloaded'); // Ensure page load completion
    const currentURL = await page.url();
    if (currentURL !== 'https://matomo.org/matomo-cloud/') {
        throw new Error(`Expected URL to be 'https://matomo.org/matomo-cloud/' but got '${currentURL}'`);
    }
    console.log('Successfully navigated to the cloud page');
});

Then('I am directed to the free analytics trial page', async function () {

    await page.waitForLoadState('domcontentloaded'); // Ensure page load completion
    const currentURL = await page.url();
    if (currentURL !== 'https://matomo.org/start-free-analytics-trial/') {
        throw new Error(`Expected URL to be 'https://matomo.org/start-free-analytics-trial/' but got '${currentURL}'`);
    }
    console.log('Successfully navigated to the free analytics trial page');
});


When('I hover the pricing link', async function () {

    await page.locator("(//a[normalize-space()='Pricing'])[1]").waitFor();

    await page.locator("(//a[normalize-space()='Pricing'])[1]").hover();

});

Then('the contact sales link should be displayed', async function () {

    const linkItem = await page.locator("//a[@class='mega-menu-link'][normalize-space()='Contact Sales']");

    await linkItem.waitFor({ state: 'visible' });
    const isVisible = await linkItem.isVisible();
    expect(isVisible).toBe(true)
    
});

Then('I click the contact sales link', async function () {

    await page.locator("//a[@class='mega-menu-link'][normalize-space()='Contact Sales']").waitFor();

    await page.locator("//a[@class='mega-menu-link'][normalize-space()='Contact Sales']").click();

});

Then('I am directed to the contact sales page', async function () {

    await page.waitForLoadState('domcontentloaded'); // Ensure page load completion
    const currentURL = await page.url();
    if (currentURL !== 'https://matomo.org/contact-sales/') {
        throw new Error(`Expected URL to be 'https://matomo.org/contact-sales/' but got '${currentURL}'`);
    }
    console.log('Successfully navigated to the Contact sales page');
});

After(async function () {
    await browser.close();
})