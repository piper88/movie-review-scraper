const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true,
    });

  } catch(err) {
    console.error(`Could not start browser: ${err}`)
  }
  return  browser;
}

module.exports = startBrowser;
