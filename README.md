# Ludus Ignis

*Game of Fire.* Probability theory taught by a stranded plasma intelligence in a small fire.

A web-based learning game (Portuguese-first) that pairs a probability curriculum with a tamagotchi-like companion (the **Cinder**) that must be kept alive through daily study. The Cinder also reads the chirality of any sample brought to it — *A Leitura* — making Bayesian inference a daily survival ritual.

## Status

Pre-alpha. World bible at `lore/timeline.md` (currently iteration 6).

The lesson loop is wired end-to-end for the alpha tier: P0 (foundations) families 1–3 followed by the P1 (combinatorics & elementary probability) families 4–10, totalling 4 playable lessons across 58 hand-authored exercises with worked solutions. P2 (random variables and inequalities) and the cross-cutting geometric-probability family ship as lore in `lore/contos_do_fogo_anciao.md` for later activation.

## The loop

The apprentice walks between two interactables on the camp tableland:

1. **Fogo Ancião (Elder Fire)** — speaks the *parable* for the current family. After the apprentice has practised, returns to the Elder for the *prova* (one final question); a correct answer opens the path to the next parable.
2. **Cinder** — opens a modal hub:
   - **Teoria** — review tree of every family already presented (parable + worked theory).
   - **Prática** — questions from the current family until the practice target is met.
   - First-visit-after-parable: a typewriter walk-through in the Cinder's own voice plays as an overlay on top of the modal.

Every exercise offers a *ver resposta* link that reveals the worked solution; wrong answers also surface the solution. The exercise selector exhausts the family's pool before repeating.

Vitality is the Cinder's hit points — correct answers feed it, wrong answers and reveals don't (penalty on wrong, neutral on reveal). Concept names are revealed only after a streak of correct answers in a family.

## Run locally

```
npm install
npm run dev
```

Open <http://localhost:5173>.

The dev server binds `0.0.0.0`, so you can also test on a phone on the same Wi-Fi by visiting `http://<your-laptop-ip>:5173`.

## Tests and build

```
npm test          # vitest, pure-logic suite
npm run build     # tsc --noEmit + vite build
```

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

## Repository layout

- `src/` — the game.
  - `core/` — pure-logic stores (lessons, exercises, knowledge, cinder, tribe, world). All test-covered where applicable.
  - `data/` — authored content. `data/lessons/*.ts` are the parable + theory + practiceTarget bundles; `data/exercises/*.ts` are the multiple-choice pools, one file per family.
  - `ui/` — Solid components. `ui/map/` is the camp map + the two dialogs (Elder Fire, Cinder); `ui/intro/` is the hieroglyph opening.
  - `persistence/local-storage.ts` — single source of truth for `localStorage` keys and shapes.
- `lore/` — the world bible and authoring source material.
  - `timeline.md` — design bible (cataclysm, tribe, mechanics, family taxonomy).
  - `contos_do_fogo_anciao.md` — the 21-parable corpus in the Elder Fire's voice.
  - `foundations_update_p0.md` — the iteration-6 P0-tier promotion spec.
- `curriculum/` — reference artifacts mapping the source PDFs to the in-game families.
  - `families.md` — pattern library + source-problem index per family.
  - `problems.json` — every source-PDF problem normalised to a schema (63 entries from L1 + lista2 + Aulas).
  - `exercise-schema.md` — the JSON schema for `problems.json`.
  - `sample-wrappings.md` — five worked examples of source → in-world wrapping.
  - `exercises/foundations.md` — six exercises for the P0 families, intensity-B worldframed.
- `course_material/` — original PDFs from Prof. Giulio's course (reference only; never shipped).

## Tech

TypeScript · Solid.js · Vite · KaTeX · vite-plugin-pwa · vitest. Strictly client-side; PWA-installable.
