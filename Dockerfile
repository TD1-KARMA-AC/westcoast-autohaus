# Use Node 18 on Debian Bookworm (has Chromium in apt)
FROM node:18-bookworm-slim

# Chromium + deps for Puppeteer (no Puppeteer download in npm install)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2t64 \
    libpangocairo-1.0-0 libxss1 libgtk-3-0 libxshmfence1 libglu1-mesa \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only dependency files first (this layer is cached)
COPY package.json package-lock.json ./

# Skip Puppeteer Chromium download; use system Chromium above
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1

# Install deps (cached unless package*.json change; cache mount speeds repeat builds)
RUN --mount=type=cache,id=autohaus-npm,target=/root/.npm \
    npm install --no-audit

# Copy app source
COPY . .

# Build React app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
