"use strict";

import * as puppeteer from "puppeteer"
//const puppeteer = require('puppeteer');
let url = "https://phys.org/news/2022-08-miniature-lens-atoms.html";

const visitanyPage = async (url:string):Promise<any> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: "physPage.png"});

    await browser.close();
};

visitanyPage(url);