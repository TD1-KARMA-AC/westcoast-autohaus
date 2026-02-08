#!/usr/bin/env node
/**
 * Run the scraper once and write result to public/inventory.json.
 * Used by GitHub Actions so Netlify can serve static inventory.
 * Run from repo root: node scripts/scrape-to-public.js
 */
const path = require('path');
const fs = require('fs');
const { scrapeWestCoastAutos } = require('../scraper.js');

const outPath = path.join(__dirname, '..', 'public', 'inventory.json');

scrapeWestCoastAutos()
  .then((result) => {
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log('Wrote', outPath);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Scrape failed:', err.message);
    process.exit(1);
  });
