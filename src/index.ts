"use strict";

import * as puppeteer from "puppeteer"
//const puppeteer = require('puppeteer');
let url = "https://phys.org/news/2022-08-miniature-lens-atoms.html";
let url2 = "https://www.tematika.com/libros?limit=40&p=1";
let url3 = "https://fauux.neocities.org/yearning.html";

const visitanyPage = async (url:string):Promise<any> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    let urlName = url.toString().replace(/(https:\/\/|\.)/g, "").replace(/(?=\/)([\s\S]+)/g, "");
    await page.goto(url);
    await page.screenshot({path: `${urlName}.png`});

    await browser.close();
};

visitanyPage(url);
visitanyPage(url2);
visitanyPage(url3);