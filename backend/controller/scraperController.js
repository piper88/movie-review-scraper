const redditScraper = require('../model/redditScraper.js');
const calculateValence = require('./calculateValence.js')

const scraperController = {
  async scrapeAll(browserInstance, movie) {
    let browser = await browserInstance;
    let review = await redditScraper.scrape(browser, movie);

    // let score = await controller.processValence(review[0], review[1]);
    let score = await calculateValence.processValence(review, movie);
    console.log(`score ${score}`)
    // browser.close();
    return score;
  },
}

module.exports = scraperController;
