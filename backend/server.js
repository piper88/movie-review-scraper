const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

//browser just launches puppeteer and returns the browser
const browser = require ('./browser.js');
const scraperController = require('./controller/scraperController.js');


app.get('/scrapeMovie', async (req, res) => {
  //waits until browser is launched by puppeteer
  let browserInstance = await browser();
  //begins actual scraping
  let score = await scraperController.scrapeAll(browserInstance);
  res.send({score});
});

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
})
