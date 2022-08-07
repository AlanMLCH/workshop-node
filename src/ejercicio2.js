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
const visitanyPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://www.tematika.com/libros?limit=40&p=1");
    const booksList = yield page.evaluate(() => {
        var _a, _b, _c, _d;
        const discoResult = [];
        const books = Array.from(document.querySelectorAll("ul.products-grid li.item"));
        for (let book of books) {
            const name = (_a = book.querySelector("h5.product-name a")) === null || _a === void 0 ? void 0 : _a.textContent;
            const price = (_b = book.querySelector("span.price")) === null || _b === void 0 ? void 0 : _b.textContent;
            const image = (_c = book.querySelector(".product-image img")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
            const author = (_d = book.querySelector(".product-information .author")) === null || _d === void 0 ? void 0 : _d.textContent;
            discoResult.push({ name, price, image, author });
        }
        return discoResult;
    });
    createJson({ booksList });
    yield browser.close();
});
const createJson = (obj) => {
    fs.writeFile("ejercicio1.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if (error)
            throw error;
        console.log("Todo está OK nwn");
    });
};
visitanyPage();
