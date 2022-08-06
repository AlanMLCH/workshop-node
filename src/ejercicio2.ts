import * as fs from 'fs';
const puppeteer = require('puppeteer');


const urls = ["https://phys.org/news/2022-08-miniature-lens-atoms.html&p=1"];

const createJson = (obj:{}): void =>{
    fs.writeFile("output.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Sale todo bien")
    });
};

const visitanyPage = async (url: string): Promise<IDisco[]> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://phys.org/news/2022-08-miniature-lens-atoms.html");


    interface IDisco{
        name: string;
        price: string;
    }[];


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

    const result = {breadcrumbs}
    createJson(discos)
    createJson(result)

    const nextUrl = await page.evaluate(()=>{

    })

    await browser.close();
    return discos;
};

const crawlSite = async () => {
    const result = [];

    for (let url of urls) {
        const discos = await scraperPage(url);
        result.push(...discos);
    }

    createJson(result);
};

crawlSite();