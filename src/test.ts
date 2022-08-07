"use strict";

import * as puppeteer from "puppeteer"
import * as fs from "fs";

const visitanyPage = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.tematika.com/libros?limit=40&p=1");
    
    const pageTitle = await page.evaluate(()=>{
        const result = document.querySelector("#jm-container .page-title")?.textContent;
        return result;
    });

    const pageBreadcrumbs = await page.evaluate(()=>{
        const result = [];
        if(document.querySelectorAll(".breadcrumbs li")){
            const unclearBreadcrumb = Array.from(document.querySelectorAll(".breadcrumbs li"));
             for(let breadcrumb of unclearBreadcrumb){
                result.push(breadcrumb.textContent);
            }
             return result.filter((element)=>{
                return element.replace(/\s/g, '');
            });
        }
        return result;
    });

    const pageCategories = await page.evaluate(()=>{
        const resultArr = [];
        const result = Array.from(document.querySelectorAll("#narrow-by-list ol li"));
        for(let e of result){
            resultArr.push(e.textContent)
        };
        return resultArr;
    });

    createJson({pageTitle, pageCategories, pageBreadcrumbs})
    await browser.close();
};

const createJson = (obj) =>{
    fs.writeFile("test.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if(error) throw error;
        console.log("Todo está OK nwn")
    });
};

visitanyPage();