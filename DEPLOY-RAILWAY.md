# Stop build timeout – use the pre-built image

Railway is still **building** from the Dockerfile, which times out. You need to **switch** this service to **pull the image** from GitHub instead.

---

## Step 1: Make sure the image exists

1. On GitHub go to: **https://github.com/TD1-KARMA-AC/westcoast-autohaus/actions**
2. Open the **"Build and push image"** workflow.
3. Click **"Run workflow"** → **"Run workflow"** (green button).
4. Wait until it turns green (about 5–10 minutes). That pushes the image to `ghcr.io/td1-karma-ac/westcoast-autohaus:latest`.

---

## Step 2: Point Railway at the image (stop building)

1. Go to **https://railway.app** → your project → click your **westcoast-autohaus** service.
2. Open **Settings** (or the service’s **⋮** menu).
3. Find **Source** / **Build** / **Deploy** (wording varies).
4. You want to **change from “GitHub” or “Dockerfile”** to **“Docker Image”** or **“Image”**.
5. Set the image to:
   ```text
   ghcr.io/td1-karma-ac/westcoast-autohaus:latest
   ```
6. Save. Railway will **pull** this image and **no longer run a build**, so no timeout.

---

## Step 3: Redeploy

- In the same service, click **Redeploy** (or **Deploy**).
- Railway pulls the image from GHCR and starts the app.

---

## If you don’t see “Docker Image” / “Image”

- Try: **New service** → **“Deploy from image”** or **“Docker image”**, enter `ghcr.io/td1-karma-ac/westcoast-autohaus:latest`, then **Generate domain** under Networking.
- You can leave the old “build from repo” service off or delete it.

---

**Summary:** The image is built by **GitHub Actions**, not Railway. Railway must use **“Docker Image”** with `ghcr.io/td1-karma-ac/westcoast-autohaus:latest` so it only pulls and runs, and never builds.
