const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

//browser just launches puppeteer and returns the browser
const browser = require ('./browser.js');
const scraperController = require('./pageController.js');
const scraper = require('./pageScraper.js');


app.get('/', (req, res) => { 
  //just waits until browser is returned
  let browserInstance = browser();

  scraperController.scrapeAll(browserInstance);
  // res.send('yo')
});

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
})

//Trying to connect the back end wih the front end. Server file with routes. How to serve interactive html when client reaches an endpoint?
