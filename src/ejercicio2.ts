"use strict";


import * as puppeteer from "puppeteer";
import * as fs from "fs";

const urls = "https://phys.org/news/2022-08-miniature-lens-atoms.html&p=1";

const createJson = (obj:{}): void =>{
    fs.writeFile("output.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Sale todo bien")
    });
};

interface IDisco{
    name: string;
    price: string;
}[];

const visitanyPage = async (urls: string): Promise<IDisco[]> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(urls);


    const breadcrumbs = await page.evaluate(()=>{
        const result = document.querySelector('[aria-label="breadcrumb"]')?.textContent
        return result;
    })

    const discos: IDisco[] = await page.evaluate(()=>{
        const result2: IDisco[] = []
        const discos = Array.from(
            document.querySelectorAll("ul.products-grid li.item")
        );

        for(let disco of discos){
            const name = disco.querySelector("h5.product-name a")?.textContent;
            const price = disco.querySelector("span.price")?.textContent;
            result2.push({ name, price});
        }

        return result2;
    })

    const result = {discos};
    createJson(result)

    const nextUrl = await page.evaluate((urldeseada)=>{
        let nuevaUrl = document.querySelector(".pages .next").getAttribute("href");
        if(Number(nuevaUrl.match(/(?<=p\=)([\s\S])/g)) <= urldeseada){
            location.href = nuevaUrl;
        }
    })
    await browser.close();
};

const crawlSite = async () => {
    const result = [];

    for (let url of urls) {
        const discos = await visitanyPage(url);
        result.push(...discos);
    }

    createJson(result);
};

crawlSite();