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
    const pageTitle = yield page.evaluate(() => {
        var _a;
        const result = (_a = document.querySelector("#jm-container .page-title")) === null || _a === void 0 ? void 0 : _a.textContent;
        return result;
    });
    const pageBreadcrumbs = yield page.evaluate(() => {
        const result = [];
        if (document.querySelectorAll(".breadcrumbs li")) {
            const unclearBreadcrumb = Array.from(document.querySelectorAll(".breadcrumbs li"));
            for (let breadcrumb of unclearBreadcrumb) {
                result.push(breadcrumb.textContent);
            }
            return result.filter((element) => {
                return element.replace(/\s/g, '');
            });
        }
        return result;
    });
    const pageCategories = yield page.evaluate(() => {
        const resultArr = [];
        const result = Array.from(document.querySelectorAll("#narrow-by-list ol li"));
        for (let e of result) {
            resultArr.push(e.textContent);
        }
        ;
        return resultArr;
    });
    createJson({ title: pageTitle, Categorías: pageCategories, Breadcrumbs: pageBreadcrumbs });
    yield browser.close();
});
const createJson = (obj) => {
    fs.writeFile("test.json", JSON.stringify(obj, null, 2), "utf8", (error) => {
        if (error)
            throw error;
        console.log("Todo está OK nwn");
    });
};
visitanyPage();
