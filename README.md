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

## Railway deployment (no build timeout – image built on GitHub)

Railway’s build often times out when building the Docker image. This repo builds the image in **GitHub Actions** (no timeout) and pushes it to **GitHub Container Registry (GHCR)**. Railway then **pulls** that image instead of building.

### One-time setup

1. **Create a Railway project**  
   Go to [railway.app](https://railway.app) → **New Project** → **Empty Project** (do not choose “Deploy from GitHub repo” for this service).

2. **Add a service from an image**  
   In the project, add a new service → choose **“Deploy from image”** or **“Docker image”**.  
   Set the image to:
   ```text
   ghcr.io/td1-karma-ac/westcoast-autohaus:latest
   ```
   (Use your GitHub org/username in lowercase if the repo is under a different account.)

3. **Generate a public URL**  
   Service → **Settings** → **Networking** → **Generate domain**. You’ll get a URL like `https://westcoast-autohaus-production-xxxx.up.railway.app`.

4. **Optional**: In **Variables**, add `NODE_ENV=production`.

### Deploying (after each change)

1. **Push to `main`**  
   On every push to `main`, the **“Build and push image”** GitHub Action runs: it builds the Docker image and pushes it to GHCR as `ghcr.io/<owner>/westcoast-autohaus:latest`.

2. **Redeploy on Railway**  
   - **Option A:** In Railway, open the service and click **Redeploy** (or **Deploy**). It will pull the latest image.  
   - **Option B:** In the repo go to **Settings** → **Secrets and variables** → **Actions**, add a secret `RAILWAY_TOKEN` (from Railway → project **Settings** → **Generate token**). The workflow will then run `railway redeploy` after pushing the image so Railway pulls the new image automatically.

3. **After frontend changes**  
   Run `npm run build`, commit the updated `build/` folder, then push. The next image build will include it.

The app serves the React build and `/api/inventory` from the same Node process.

## Contact

- **Sean** – 0412001517 – sean@westcoastautohaus.com.au
