const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");

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

When("I click on the cloud link", async function () {
    const cloudLink = page.locator("//a[text()='Cloud']");
    await cloudLink.waitFor();
    await cloudLink.click();
});

When("I click on the try it for free button", async function () {
    const freeTrialButton = page.locator("//a[contains(text(),'TRY IT FOR FREE')]");
    await freeTrialButton.waitFor();
    await freeTrialButton.click();
});

Then("I am directed to the cloud page", async function () {
    await page.waitForLoadState("domcontentloaded");
    const currentURL = await page.url();
    const expectedURL = "https://matomo.org/matomo-cloud/";

    if (currentURL !== expectedURL) {
        throw new Error(`Expected URL to be '${expectedURL}' but got '${currentURL}'`);
    }
    console.log("Successfully navigated to the cloud page");
});

Then("I am directed to the free analytics trial page", async function () {
    await page.waitForLoadState("domcontentloaded");
    const currentURL = await page.url();
    const expectedURL = "https://matomo.org/start-free-analytics-trial/";

    if (currentURL !== expectedURL) {
        throw new Error(`Expected URL to be '${expectedURL}' but got '${currentURL}'`);
    }
    console.log("Successfully navigated to the free analytics trial page");
});

When("I hover over the pricing link", async function () {
    const pricingLink = page.locator("(//a[normalize-space()='Pricing'])[1]");
    await pricingLink.waitFor();
    await pricingLink.hover();
});

Then("the contact sales link should be displayed", async function () {
    const contactSalesLink = page.locator("//a[@class='mega-menu-link'][normalize-space()='Contact Sales']");
    await contactSalesLink.waitFor({ state: "visible" });
    const isVisible = await contactSalesLink.isVisible();
    expect(isVisible).toBe(true);
});

Then("I click on the contact sales link", async function () {
    const contactSalesLink = page.locator("//a[@class='mega-menu-link'][normalize-space()='Contact Sales']");
    await contactSalesLink.waitFor();
    await contactSalesLink.click();
});

Then("I am directed to the contact sales page", async function () {
    await page.waitForLoadState("domcontentloaded");
    const currentURL = await page.url();
    const expectedURL = "https://matomo.org/contact-sales/";

    if (currentURL !== expectedURL) {
        throw new Error(`Expected URL to be '${expectedURL}' but got '${currentURL}'`);
    }
    console.log("Successfully navigated to the contact sales page");
});

Then("I check for broken links and images", async function () {
    // Check for broken links
    const links = await page.$$eval("a[href]", (anchors) =>
        anchors.map((anchor) => anchor.href)
    );

    const brokenLinks = [];

    for (const link of links) {
        try {
            const response = await page.goto(link, { waitUntil: "networkidle" });

            if (response.status() !== 200) {
                brokenLinks.push({ link, status: response.status() });
            }
        } catch (error) {
            brokenLinks.push({ link, status: "Failed to load" });
        }
    }

    if (brokenLinks.length > 0) {
        console.log("Broken Links:");
        brokenLinks.forEach((brokenLink) =>
            console.log(`URL: ${brokenLink.link} - Status: ${brokenLink.status}`)
        );
    } else {
        console.log("No broken links found");
    }

    // Check for broken images
    const imageSources = await page.$$eval("img", (images) =>
        images.map((img) => ({
            src: img.src,
            alt: img.alt || "No alt text",
        }))
    );

    const brokenImages = [];

    for (const image of imageSources) {
        try {
            const response = await page.goto(image.src, { waitUntil: "networkidle" });

            if (response.status() !== 200) {
                brokenImages.push({ src: image.src, status: response.status, alt: image.alt });
            }
        } catch (error) {
            brokenImages.push({ src: image.src, status: "Failed to load", alt: image.alt });
        }
    }

    if (brokenImages.length > 0) {
        console.log("Broken Images:");
        brokenImages.forEach((brokenImage) =>
            console.log(
                `Image Source: ${brokenImage.src} - Status: ${brokenImage.status} - Alt Text: ${brokenImage.alt}`
            )
        );
    } else {
        console.log("No broken images found");
    }
});

After(async function () {
    await browser.close();
});