const fs = require('fs');
const pageScraper = require('./pageScraper.js');
const browser = require('./browser.js');


const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');

const SpellCorrector = require('spelling-corrector');
const spellingCorrector = new SpellCorrector();
spellingCorrector.loadDictionary();
const stopwords = require('stopword');

controller = {
  async scrapeAll(browserInstance) {
    let browser = await browserInstance;
    let reviews = await pageScraper.scrape(browser);
    controller.processValence(reviews);

  },

  processValence(reviews) {
    console.log('YOOOOOOO');
    //remove contractions (e.g. I don't to I do not)
    let lexedReviews = aposToLexForm(reviews).toLowerCase();
    //remove special characters
    const alphaOnlyReview = lexedReviews.replace(/[^a-zA-Z\s]+/g, '')
    //Split text into meaningful units
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

    //correct spelling mistakes
    tokenizedReview.forEach((word, index) => {
      tokenizedReview[index] = spellingCorrector.correct(word)
    })
    //remove stop words (e.g. but/a/the)
    const meaningfulReview = stopwords.removeStopwords(tokenizedReview);
    console.log(meaningfulReview);

  }
}






module.exports = controller;
