"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const fs = require("fs");
let urls = "https://www.tematika.com/libros?limit=40&p=1";
let results = [];
const scrapAnyPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    let urls = "";
    urls = url;
    const page = yield browser.newPage();
    yield page.goto(url);
    [];
    const booksList = yield page.evaluate(() => {
        var _a, _b, _c, _d;
        const bookResult = [];
        const books = Array.from(document.querySelectorAll("ul.products-grid li.item"));
        for (let book of books) {
            const name = (_a = book.querySelector("h5.product-name a")) === null || _a === void 0 ? void 0 : _a.getAttribute("title");
            const price = parseFloat((_b = book.querySelector("span.price")) === null || _b === void 0 ? void 0 : _b.textContent.replace(/\$|\./g, '').replace(/,/g, '.').trim());
            const image = (_c = book.querySelector(".product-image img")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
            const author = (_d = book.querySelector(".product-information .author")) === null || _d === void 0 ? void 0 : _d.textContent;
            bookResult.push({ name, price, image, author });
        }
        return bookResult;
    });
    function recursivePages() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentPage = yield page.$eval(".pages .current", el => el.textContent);
            let nextPage = yield page.$eval(".pages .next ", el => el.getAttribute("href"));
            if (Number(currentPage) < 25) {
                //await page.click(".pages .next")
                urls = nextPage;
                //await page.goto(urls);
                scrapAnyPage(urls);
            }
        });
    }
    results.push(...booksList);
    recursivePages();
    createJson(results);
    yield browser.close();
});
const createJson = (obj) => {
    fs.writeFile("ejercicio2.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if (error)
            throw error;
        console.log("Todo está OK nwn");
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
