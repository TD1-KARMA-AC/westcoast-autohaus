const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

let inventory = [];
let lastScrapedAt = null;

function getChromiumPath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  if (process.platform !== 'linux') return undefined;
  const candidates = ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (_) {}
  }
  return undefined;
}

async function scrapeWestCoastAutos() {
  console.log('🚀 Scraping...');
  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  };
  const chromiumPath = getChromiumPath();
  if (chromiumPath) launchOpts.executablePath = chromiumPath;
  const browser = await puppeteer.launch(launchOpts);

  const page = await browser.newPage();

  try {
    await page.goto('https://westcoastautohaus.com.au/our-stock/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForSelector('.listing-car-item, .stm-listing-item, .car-listing-item, [class*="listing"], .listing-item, article', {
      timeout: 15000
    }).catch(() => {});

    const cars = await page.evaluate(() => {
      const carElements = document.querySelectorAll('.listing-car-item, .stm-listing-item, .car-listing-item, [class*="car-"], article, .listing-item');
      const results = [];

      carElements.forEach((car, index) => {
        try {
          const titleEl = car.querySelector('.title, .listing-title, h3, h4, .car-title, [class*="title"]');
          const title = titleEl?.textContent?.trim();
          const priceEl = car.querySelector('.price, .listing-price, [class*="price"]');
          const priceText = priceEl?.textContent?.trim();
          const imgEl = car.querySelector('img');
          const image = imgEl?.src;
          const linkEl = car.querySelector('a[href*="stock"], a[href*="vehicle"], a');
          const link = linkEl?.href;
          const mileageElement = car.querySelector('[class*="mileage"], [class*="odometer"], [class*="km"]');
          const mileage = mileageElement ? mileageElement.textContent.replace(/[^\d]/g, '') : null;

          const specs = [];
          const specContainers = car.querySelectorAll('.meta-top li, .car-meta-top li, [class*="spec"] li, [class*="meta"] li, .stm-car-params li');
          specContainers.forEach(spec => {
            const text = spec.textContent.trim();
            if (text) specs.push(text);
          });

          const titleParts = title ? title.split(/\s+/).filter(Boolean) : [];
          const year = titleParts.find(part => /^\d{4}$/.test(part));

          if (title && priceText) {
            results.push({
              id: `wca_${index + 1}`,
              title: title,
              year: year || titleParts[0] || null,
              make: titleParts[1] || null,
              model: titleParts.slice(2).join(' ') || null,
              variant: titleParts.slice(3).join(' ') || null,
              price: parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0,
              mileage: parseInt(mileage, 10) || 0,
              transmission: specs.find(s => /auto|manual/i.test(s)) || 'Auto',
              fuelType: specs.find(s => /petrol|diesel/i.test(s)) || 'Petrol',
              color: 'Various',
              imageUrl: image,
              link: link,
              features: specs.slice(0, 6),
              stockNumber: `WCA${String(index + 1).padStart(3, '0')}`,
              scrapedAt: new Date().toISOString()
            });
          }
        } catch (err) {
          console.log('Parse error:', err.message);
        }
      });

      return results;
    });

    console.log(`✅ Found ${cars.length} cars`);
    inventory = cars;
    lastScrapedAt = new Date().toISOString();
    fs.writeFileSync(path.join(__dirname, 'inventory.json'), JSON.stringify({ cars, lastScrapedAt }, null, 2));

    await browser.close();
    return cars;
  } catch (error) {
    console.error('❌ Error:', error.message);
    try {
      await browser.close();
    } catch (_) {}
    if (fs.existsSync(path.join(__dirname, 'inventory.json'))) {
      try {
        const cached = JSON.parse(fs.readFileSync(path.join(__dirname, 'inventory.json'), 'utf8'));
        inventory = cached.cars || cached;
      } catch (_) {}
    }
    throw error;
  }
}

app.get('/api/inventory', (req, res) => {
  res.json({ cars: inventory, lastScrapedAt });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

async function start() {
  try {
    await scrapeWestCoastAutos();
  } catch (e) {
    console.warn('Initial scrape failed, serving empty/cached inventory');
  }
  setInterval(() => {
    scrapeWestCoastAutos().catch(() => {});
  }, 3600000);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
