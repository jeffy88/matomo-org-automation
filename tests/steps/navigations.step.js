const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");

setDefaultTimeout(300 * 1000);

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

Then('I check the broken links', async function () {
    // Extract all the anchor tags with href attributes
    const links = await page.$$eval('a[href]', anchors => {
        return anchors.map(anchor => anchor.href);
    });

    const brokenLinks = [];

    // Check each link's status
  for (const link of links) {
    try {
      // Make a network request to check the link status
      const response = await page.goto(link, { waitUntil: 'networkidle' });
      
      // If status code is not 200, it's a broken link
      if (response.status() !== 200) {
        brokenLinks.push({ link, status: response.status() });
      }
    } catch (error) {
      // Handle any errors, like network issues, which could also indicate broken links
      brokenLinks.push({ link, status: 'Failed to load' });
    }
  }

  // Log broken links
  if (brokenLinks.length > 0) {
    console.log('Broken Links:');
    brokenLinks.forEach(brokenLink => {
    console.log(`URL: ${brokenLink.link} - Status: ${brokenLink.status}`);
    });
  } else {
    console.log('No broken links found');
  }

});

After(async function () {
    await browser.close();
})