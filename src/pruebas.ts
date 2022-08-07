import * as fs from 'fs';
import * as puppeteer from "puppeteer"


const urls = ["https://www.tematika.com/libros?limit=40&p=1"];

const createJson = (obj:{}): void =>{
    fs.writeFile("output.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Sale todo bien")
    });
};

const visitanyPage = async (url: string): Promise<any> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);


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

const crawlSite = async (urls) => {
    const result = [];

    for (let url of urls) {
        const discos = await visitanyPage(url);
        result.push(...discos);
    }

    createJson(result);
};

crawlSite(urls); 