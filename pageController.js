const fs = require('fs');
const pageScraper = require('./pageScraper.js');

async function scrapeAll (browserInstance) {

  let browser = await browserInstance;
  let reviews = await pageScraper.scrape(browser);
  fs.writeFileSync('./reviews.json', JSON.stringify(reviews), 'utf8', function(err) {
    if (err) {
      console.log('Reviews not saved');
    } else {
      console.log('Reviews saved');
    }
  })
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
