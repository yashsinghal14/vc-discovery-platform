const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Define scraping function
async function scrapeVCs(url) {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  // Perform your scraping here
  const data = await page.evaluate(() => {
    // Example selector and extraction logic (this will vary based on the target website)
    const elements = document.querySelectorAll('.vc-contact');
    return Array.from(elements).map(el => ({
      name: el.querySelector('.name')?.innerText,
      email: el.querySelector('.email')?.innerText
    }));
  });

  await browser.close();
  return data;
}

// Scrape endpoint
router.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url || 'https://example-vc-directory.com'; // Replace with real URL
    const vcs = await scrapeVCs(url);

    // Save data to file
    const filePath = path.join(__dirname, '../data/vc-contacts.json');
    fs.writeFileSync(filePath, JSON.stringify(vcs, null, 2));

    res.json({ message: 'Scraping successful', filePath, count: vcs.length });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
});

module.exports = router;
