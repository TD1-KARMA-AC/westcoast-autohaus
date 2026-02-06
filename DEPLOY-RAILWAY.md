# Stop build timeout – use the pre-built image

**This repo no longer has a Dockerfile in the root.** Railway will not build from source. You **must** run the app by **deploying from the pre-built image**.

---

## Step 1: Make sure the image exists

1. On GitHub go to: **https://github.com/TD1-KARMA-AC/westcoast-autohaus/actions**
2. Open the **"Build and push image"** workflow.
3. Click **"Run workflow"** → **"Run workflow"** (green button).
4. Wait until it turns green (about 5–10 minutes). That pushes the image to `ghcr.io/td1-karma-ac/westcoast-autohaus:latest`.

---

## Step 2: Use a service that pulls the image (required)

The repo no longer contains a Dockerfile, so **do not** use “Deploy from GitHub repo” for this app.

1. Go to **https://railway.app** → your project.
2. **Add a new service** (or use an existing one): click **+ New** → **Empty Service** or **Deploy from image**.
3. If you see **“Deploy from image”** or **“Docker image”**: choose it and set the image to:
   ```text
   ghcr.io/td1-karma-ac/westcoast-autohaus:latest
   ```
4. If you only see “GitHub repo”: add the repo, then go to the new service → **Settings** → find **Source** and change it to **Image** / **Docker image**, and enter:
   ```text
   ghcr.io/td1-karma-ac/westcoast-autohaus:latest
   ```
5. **Generate domain**: Service → **Settings** → **Networking** → **Generate domain**.
6. You can delete or ignore any old service that was “building” from the repo (it will now fail anyway).

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
