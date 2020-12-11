const fs = require('fs');
const redditScraper = require('../model/redditScraper.js');
const browser = require('../browser.js');


const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');

const SpellCorrector = require('spelling-corrector');
const spellingCorrector = new SpellCorrector();
spellingCorrector.loadDictionary();
const stopwords = require('stopword');

const controller = {
  async scrapeAll(browserInstance) {
    let browser = await browserInstance;
    let review = await redditScraper.scrape(browser);

    let score = await controller.processValence(review[0], review[1]);
    console.log(`score ${score}`)
    // browser.close();
    return score;
  },

  async processValence(reviews, movie) {
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

    //filter out any words from movie title, as well as word 'review'
    const filteredReview = meaningfulReview.filter(review => {
      var keep = true;
      var i = 0;
      let movieSplitName = movie.toLowerCase().split(' ');
      while (keep && i < movie.length) {
        if (review == movieSplitName[i] || review == 'review') {
          keep = false;
        } else {
          ++i;
        }
      }
      return keep;
    })

    //perform the actual analysis
    const {SentimentAnalyzer, PorterStemmer} = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(filteredReview);
    console.log(`${movie} received a score of ${analysis}`);
    return analysis;

  },
}

module.exports = controller;
