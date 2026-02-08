# Get the app live on Railway (no build – use image only)

Your current Railway service is set to **build from the GitHub repo**, so it keeps timing out. Do this instead:

---

## Do this in order

### 1. Build the image once (GitHub)

1. Open: **https://github.com/TD1-KARMA-AC/westcoast-autohaus/actions**
2. Click **"Build and push image"** in the left sidebar.
3. Click the **"Run workflow"** button (top right) → **"Run workflow"** (green).
4. Wait until the run finishes with a **green tick** (about 5–10 minutes).  
   This publishes the image: `ghcr.io/td1-karma-ac/westcoast-autohaus:latest`

---

### 2. In Railway: add a NEW service from the image

1. Go to **https://railway.app** and open your project.
2. **Do not** use “Deploy from GitHub” or the old service that was building.
3. Click **"+ New"** (or **"Add service"**).
4. Choose **"Empty Service"** or **"Deploy from image"** or **"Docker image"** (whatever your UI shows).
5. When it asks for an image (or you see a field for “Image” / “Container image”), paste exactly:
   ```
   ghcr.io/td1-karma-ac/westcoast-autohaus:latest
   ```
6. Open the new service → **Settings** → **Networking** (or **Public networking**) → **Generate domain**.
7. Copy the URL (e.g. `https://something.up.railway.app`) and open it in your browser. The app should load.

---

### 3. (Optional) Turn off or remove the old service

- The **old** service that was “Deploy from GitHub” will keep failing (build timeout). You can leave it or delete it.
- Use only the **new** service (the one you created from the image) as your live app.

---

## If the service still says “Using Detected Dockerfile”

Railway might be using a cached build or an old setting. Try:

1. In the **service** that’s building → **Settings** → **Variables**.
2. Add a variable: **`RAILWAY_DOCKERFILE_PATH`** = **`_disabled`** (or any path that doesn’t exist, e.g. `none`).
3. Save and **Redeploy**.  
   If it then fails with “no Dockerfile”, **change the service source to Image** as in the section below.

---

## If you don’t see “Deploy from image”

- **Railway dashboard** → your project.
- Look for **“New”** or **“Add service”**.
- If you only see **“Deploy from GitHub repo”**:
  - Add the repo if you want it in the project.
  - Then open the **service** that was created.
  - Go to **Settings** and look for **“Source”**, **“Build”**, or **“Deploy”**.
  - Change the source from **“GitHub”** to **“Image”** or **“Docker image”**.
  - In the image field, enter: `ghcr.io/td1-karma-ac/westcoast-autohaus:latest`
  - Save and **Redeploy**.

---

## Summary

| Don’t use | Use instead |
|-----------|-------------|
| Deploy from GitHub / Build from repo | Deploy from **image**: `ghcr.io/td1-karma-ac/westcoast-autohaus:latest` |

The image is built by **GitHub Actions**. Railway only needs to **pull and run** that image.
