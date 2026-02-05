# West Coast Autohaus – Car Buy & Sell Platform

React frontend + Node.js scraper for [westcoastautohaus.com.au](https://westcoastautohaus.com.au/our-stock/). Inventory auto-syncs on load and every hour.

## Local development

1. **Install**
   ```bash
   npm install
   ```

2. **Build the React app** (required before starting the server)
   ```bash
   npm run build
   ```

3. **Start server** (serves API + React build)
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000).

To work on the frontend with hot reload, run in two terminals:
- `npm run build` once, then `npm start` for the backend
- Or use a separate React dev server and proxy API to the Node server.

## Railway deployment (so the app is live and public)

1. **Push this repo to GitHub** (if not already):
   ```bash
   cd c:\autohaus
   git init
   git add .
   git commit -m "West Coast Autohaus app"
   git branch -M main
   git remote add origin https://github.com/TD1-KARMA-AC/westcoast-autohaus.git
   git push -u origin main
   ```

2. **Create a Railway project**: Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → select **TD1-KARMA-AC/westcoast-autohaus**.

3. **Generate a public URL** so the app “pops up” on the web:
   - Open your project → click the **service** (your app).
   - Go to **Settings** → **Networking** (or **Public Networking**).
   - Click **Generate domain** (or **Add public domain**). Railway will give you a URL like `https://westcoast-autohaus-production-xxxx.up.railway.app`.

4. **Optional**: In **Variables**, add `NODE_ENV=production`.

5. **Deploy**: Railway will build (from `nixpacks.toml`) then start with `npm start`. After the build finishes, open the generated URL to see the live app.

The app serves the React build and `/api/inventory` from the same Node process.

## Contact

- **Sean** – 0412001517 – sean@westcoastautohaus.com.au
