const debug = require('debug')('page:pageScraper')

scraper = {
  url: 'https://www.old.reddit.com/r/moviecritic',
  async scrape(browserInstance) {
    debug('scraping');

    browser = await browserInstance;
    let page = await browser.newPage();

    await page.goto(this.url, {waitUntil: 'load', timeout: 0});

    //wait until search box loads

    //type in movie title

    //get titles of all posts, analyze for nlp
    //aggregate score, return

    await page.waitFor('form.search');
  

  }
}

module.exports = scraper;
