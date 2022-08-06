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
const fs = require("fs");
const puppeteer = require('puppeteer');
const urls = ["https://phys.org/news/2022-08-miniature-lens-atoms.html&p=1"];
const createJson = (obj) => {
    fs.writeFile("output.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if (error)
            throw error;
        console.log("Sale todo bien");
    });
};
const visitanyPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://phys.org/news/2022-08-miniature-lens-atoms.html");
    [];
    const breadcrumbs = yield page.evaluate(() => {
        var _a;
        const result = (_a = document.querySelector('[aria-label="breadcrumb"]')) === null || _a === void 0 ? void 0 : _a.textContent;
        return result;
    });
    const discos = yield page.evaluate(() => {
        var _a, _b;
        const result2 = [];
        const discos = Array.from(document.querySelectorAll("ul.products-grid li.item"));
        for (let disco of discos) {
            const name = (_a = disco.querySelector("h5.product-name a")) === null || _a === void 0 ? void 0 : _a.textContent;
            const price = (_b = disco.querySelector("span.price")) === null || _b === void 0 ? void 0 : _b.textContent;
            result2.push({ name, price });
        }
        return result2;
    });
    const result = { breadcrumbs };
    createJson(discos);
    createJson(result);
    const nextUrl = yield page.evaluate(() => {
    });
    yield browser.close();
    return discos;
});
const crawlSite = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (let url of urls) {
        const discos = yield scraperPage(url);
        result.push(...discos);
    }
    createJson(result);
});
crawlSite();
