const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

const queryString = require('query-string');
//browser just launches puppeteer and returns the browser
const browser = require ('./browser.js');
const scraperController = require('./controller/scraperController.js');


app.get('/scrapeMovie/:movie', async (req, res) => {
  let movie = req.params.movie;
  console.log(movie);
  //waits until browser is launched by puppeteer
  let browserInstance = await browser();
  //begins actual scraping
  let score = await scraperController.scrapeAll(browserInstance, movie);
  res.send({score});
});

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
})
