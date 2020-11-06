const debug = require('debug')('page:pageScraper')

scraper = {
  url: 'https://www.old.reddit.com/r/moviecritic',
  async scrape(browserInstance) {
    debug('scraping');

    browser = await browserInstance;
    let page = await browser.newPage();

    await page.goto(this.url, {waitUntil: 'load', timeout: 0});

    //wait until search box loads
    await page.waitFor('form#search');

    //type in movie title
    await page.click('input[name=q]');
    await page.$eval('input[name=q]', el => el.value = 'Borat 2')
    //limit search to subreddit
    await page.click('input[name=restrict_sr]')
    //submit search
    await page.click('input[type=submit]');

    await page.waitForNavigation()
    let postTitles = await page.$$eval('.search-result', posts => {
      posts = posts.map(post => {
        return post.querySelector('div > header > a').innerText;
      })
      return posts;
    })
    console.log(postTitles);

  }
}

module.exports = scraper;
