const puppeteer = require('puppeteer');

const visitanyPage = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://phys.org/news/2022-08-miniature-lens-atoms.html");
    await page.screenshot({path: "physPage.png"});

    await browser.close();
};

visitanyPage();
