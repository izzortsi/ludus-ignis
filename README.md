# Ludus Ignis

*Game of Fire.* Probability theory taught by a stranded plasma intelligence in a small fire.

A web-based learning game (Portuguese-first) that pairs a probability curriculum with a tamagotchi-like companion (the **Cinder**) that must be kept alive through daily study. The Cinder also reads the chirality of any sample brought to it — *A Leitura* — making Bayesian inference a daily survival ritual.

## Status

Pre-alpha. See `lore/timeline.md` for the world bible and design.

## Run locally

```
npm install
npm run dev
```

Open <http://localhost:5173>.

The dev server binds `0.0.0.0`, so you can also test on a phone on the same Wi-Fi by visiting `http://<your-laptop-ip>:5173`.

## Deploy to Render

This repo includes a `render.yaml` Blueprint. After pushing to GitHub:

1. Render dashboard → **New** → **Blueprint** → connect this repo.
2. Render reads `render.yaml`, runs `npm ci && npm run build`, serves `/dist` as a static site over HTTPS with a global CDN.
3. The free tier is enough for alpha testing.

PWA install prompts and the service worker only activate over HTTPS, so the deployed Render URL is the right place to test the install-to-home-screen flow on mobile.

## Reset on a device

To clear save state and re-watch the intro:

```
localStorage.clear()
```

in DevTools, then refresh.

## Tech

TypeScript · Solid.js · Vite · vite-plugin-pwa · vitest. Strictly client-side.
