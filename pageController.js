const fs = require('fs');
const pageScraper = require('./pageScraper.js');
const browser = require('./browser.js');

const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');

controller = {
  async scrapeAll(browserInstance) {
    let browser = await browserInstance;
    let reviews = await pageScraper.scrape(browser);
    controller.processValence(reviews);

  },

  processValence(reviews) {
    let lexedReviews = aposToLexForm(reviews);
    console.log(lexedReviews);
  }
}






module.exports = controller;
