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
//const puppeteer = require('puppeteer');
let url = "https://phys.org/news/2022-08-miniature-lens-atoms.html";
let url2 = "https://www.tematika.com/libros?limit=40&p=1";
let url3 = "https://fauux.neocities.org/yearning.html";
const visitanyPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    let urlName = url.toString().replace(/(https:\/\/|\.)/g, "").replace(/(?=\/)([\s\S]+)/g, "");
    yield page.goto(url);
    yield page.screenshot({ path: `${urlName}.png` });
    yield browser.close();
});
visitanyPage(url);
visitanyPage(url2);
visitanyPage(url3);
