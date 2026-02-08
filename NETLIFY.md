# Deploy on Netlify + your own domain

Static site on Netlify. No Railway, no containers. Inventory updates via a GitHub Action that scrapes and commits `public/inventory.json`.

---

## 1. Connect the repo to Netlify

1. Go to **[netlify.com](https://www.netlify.com)** and sign in (e.g. with GitHub).
2. **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select **TD1-KARMA-AC/westcoast-autohaus**.
4. Netlify will read `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
5. Add one **environment variable** (so the frontend loads the static inventory file):
   - Key: **`REACT_APP_INVENTORY_URL`**
   - Value: **`/inventory.json`**
6. Click **Deploy site**. Wait for the build to finish.
7. You’ll get a URL like `https://something.netlify.app`. The app should work there.

---

## 2. Use your own domain

1. In Netlify: **Site configuration** (or **Domain settings**) → **Domain management**.
2. Click **Add custom domain** (or **Add domain**).
3. Enter the domain you bought (e.g. `westcoastautohaus.com.au` or `buy.westcoastautohaus.com.au`).
4. Netlify will show the DNS records to add at your domain registrar (where you bought the domain).
5. At the registrar, add the record Netlify asks for (usually an **A** or **CNAME**).
6. Back in Netlify, wait for DNS to verify (often a few minutes). Netlify can provision HTTPS for the custom domain.

Done. The site is live on your domain.

---

## 3. How inventory updates

- A **GitHub Action** (`Scrape inventory`) runs on push to `main` and **every 6 hours**.
- It runs the scraper and writes **`public/inventory.json`**, then commits and pushes.
- The next Netlify build (triggered by that push or the next deploy) will include the new file, and the app will show updated stock.

No backend server: everything is static on Netlify.
