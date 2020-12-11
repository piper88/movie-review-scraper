const debug = require('debug')('page:pageScraper')

scraper = {
  url: 'https://www.old.reddit.com/r/moviecritic',
  async scrape(browserInstance, movie) {
    debug('scraping');

    let allPostTitles = [];

    async function scrapeCurrentPage() {

      console.log('SCRAPER BIKEEEE')

      let postTitles = await page.$$eval('.search-result', posts => {
        posts = posts.map(post => {
          return post.querySelector('div > header > a').innerText;
        })
        return posts;
      })
      postTitles.map(title => allPostTitles.push(title));

      let nextPage = await page.evaluate(() => {

        if (document.querySelector('.nextprev > a[rel~=next]')) {
          return document.querySelector('.nextprev > a[rel~=next]').href;
        } else {
          return false;
        }
      })

      if (nextPage) {
        await page.goto(nextPage, {waitUntil: 'load', timeout: 0});
        //recursive call to scrape the next page
        await scrapeCurrentPage();
      } else {
        return;
      }
    }

    browser = await browserInstance;
    let page = await browser.newPage();

    await page.goto(this.url, {waitUntil: 'load', timeout: 0});
    //wait until search box loads
    await page.waitFor('form#search');
    //type in movie title
    await page.click('input[name=q]');
    await page.$eval('input[name=q]', (el, movie) =>  {
      el.value = `${movie}`
    }, movie)
    //limit search to subreddit
    await page.click('input[name=restrict_sr]')
    //submit search
    await page.click('input[type=submit]');

    await page.waitForNavigation()
    await scrapeCurrentPage();

    return allPostTitles.join('');
  }
}

module.exports = scraper;
