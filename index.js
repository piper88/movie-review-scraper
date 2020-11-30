//browser just launches puppeteer and returns the browser
const browser = require ('./browser.js');
const scraperController = require('./pageController.js');
// const scraper = require('./pageScraper.js');

//just waits until browser is returned
let browserInstance = browser();

scraperController(browserInstance);
