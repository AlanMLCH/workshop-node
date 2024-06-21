"use strict";

import * as puppeteer from "puppeteer"
import * as fs from "fs";
let urls = "https://www.tematika.com/libros?limit=40&p=1"; 
let results = [];

const  scrapAnyPage= async (url:string):Promise<any> => {
    const browser = await puppeteer.launch({headless: false});
    let urls = "";
    urls = url;
    const page = await browser.newPage();
    await page.goto(url);
    
    interface iBooks{
        name: string;
        price: number;
        image: string;
        author: string
    }[];

    const booksList:iBooks[] = await page.evaluate(() =>{
        const bookResult:iBooks[] = [];
        const books = Array.from(
            document.querySelectorAll("ul.products-grid li.item")
        );

        for(let book of books){
            const name = book.querySelector("h5.product-name a")?.getAttribute("title");
            const price = parseFloat(book.querySelector("span.price")?.textContent.replace(/\$|\./g, '').replace(/,/g, '.').trim());
            const image = book.querySelector(".product-image img")?.getAttribute("src");
            const author = book.querySelector(".product-information .author")?.textContent;
            bookResult.push({ name, price, image, author});
        }

        return bookResult;
    })

    
   async function recursivePages():Promise<void>{
    let currentPage = await page.$eval(".pages .current", el => el.textContent)
    let nextPage = await page.$eval(".pages .next ", el => el.getAttribute("href"))
    if (Number(currentPage) < 25) {
        //await page.click(".pages .next")
        urls = nextPage;
        //await page.goto(urls);
        
        scrapAnyPage(urls);
    }
   }
   results.push(...booksList);
    recursivePages();
    createJson(results);
    await browser.close();
    
};

const createJson = (obj:{}):void =>{
    fs.writeFile("ejercicio2.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Todo está OK nwn")
    });
};


// const crawlSite = async (scrapAnyPage: string[]) => {
//     const result = [];

//     for (let url of urls) {
//         const discos = await scrapAnyPage(url);
//         result.push(...discos);
//     }

//     createJson({result});
// };

// crawlSite(urls);

scrapAnyPage(urls);