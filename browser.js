const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true,
      // slowMo: 100
    });

  } catch(err) {
    console.error(`Could not start browser: ${err}`)
  }
  return  browser;
}

module.exports = startBrowser;
