"use strict";

import * as puppeteer from "puppeteer"
import * as fs from "fs";
let url = "https://www.tematika.com/libros?limit=40&p=1"; 

const  scrapAnyPage= async (url:string):Promise<any> => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    
    interface iBooks{
        name: string;
        price: number;
        image: string;
        author: string
    }[];

    const booksList:iBooks[] = await page.evaluate(() =>{
        const discoResult:iBooks[] = [];
        const books = Array.from(
            document.querySelectorAll("ul.products-grid li.item")
        );

        for(let book of books){
            const name = book.querySelector("h5.product-name a")?.getAttribute("title");
            const price = parseFloat(book.querySelector("span.price")?.textContent.replace(/\$|\./g, '').replace(/,/g, '.').trim());
            const image = book.querySelector(".product-image img")?.getAttribute("src");
            const author = book.querySelector(".product-information .author")?.textContent;
            discoResult.push({ name, price, image, author});
        }

        return discoResult;
    })

    createJson({booksList})
    await browser.close();
};

const createJson = (obj:{}):void =>{
    fs.writeFile("ejercicio1.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Todo está OK nwn")
    });
};

scrapAnyPage(url);