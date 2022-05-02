import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/SOLID-login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    jest.setTimeout(30000);

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto("http://www.dedeen1b.tk/login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('The user is not registered in the site', ({ given, when, then }) => {

        let username: string;
        let password: string;

        given('An unregistered user', () => {
            username = "dedeen1btests";
            password = "DeDe_En1B_Tests";
        });

        when('They press the profile button and log in with their preferred SOLID provider', async () => {
            await page.setCacheEnabled(false);
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("#loginButton");
            await new Promise(r => setTimeout(r, 3000));
            await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
                username: username,
                password: password,
            })


            await expect(page).toClick('input[name="signInSubmitButton"]');
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("button.allow-button");
            await new Promise(r => setTimeout(r, 5000));
        });

        then('Their name should be shown', async () => {
            await expect(page).toMatch('dedeen1btests');
        });
    });

    test('The user is registered in the site', ({ given, when, then }) => {

        let username: string;
        let password: string;

        given('A registered user', () => {
            username = "dedeen1btests";
            password = "DeDe_En1B_Tests";
        });

        when('They press the profile button and log in with their preferred SOLID provider', async () => {
            await page.setCacheEnabled(false);
            page.goto("http://www.dedeen1b.tk");
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick('path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"]');
            await new Promise(r => setTimeout(r, 1000));
        });

        then('Their name and orders, if any, should be shown', async () => {
            await new Promise(r => setTimeout(r, 10000));
            // await page.screenshot({ path: './e2e/screenshots/login.png' });
            await expect(page).toMatch('dedeen1btests');
            await expect(page).toMatch('Order 2022-04-29');
        });
    });

    afterAll(async () => {
        browser.close()
    })

});

