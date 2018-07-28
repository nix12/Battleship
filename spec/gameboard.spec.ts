import * as puppeteer from 'puppeteer';

describe('Homepage', () => {
  let browser: any;
  let page: any;
  jest.setTimeout(15000);

  beforeAll(async() => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  
    await page.goto('localhost:8080');
  });

  afterAll(async () => {
    await browser.close();
  });
  
  test('should have 100 cells', async () => {
    const gameboard = await page.$eval('.container', (el: any) => el.children.length);

    await expect(gameboard).toBe(100);
  });
});
