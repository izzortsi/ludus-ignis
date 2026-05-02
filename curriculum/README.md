# Curriculum scaffolding

Reference data for the probability-curriculum pipeline (bible §14 / §14a).

## What's here

| File | Purpose |
|---|---|
| `README.md` | This file. |
| `exercise-schema.md` | JSON schema spec for problem entries. |
| `problems.json` | Populated problem catalog from the alpha source PDFs (L1 + lista2). One entry per source problem; verified answers from `lista1 Soluções` where available. |
| `families.md` | Per-family pattern library + index of source problems by family, for use when authoring in-game variants. |

## Important: source vs in-game

The problems in `problems.json` are **reference material**, not the problems the player will see in-game.

- **Source problems** (here): the originals from Aulas 1–4, L1, lista2. These define the structural patterns the curriculum has to cover.
- **In-game problems** (authored separately): every problem the player encounters in-game is **authored fresh**, wrapped in tribal-life worldframes per the wrapping pipeline (§14 step 4), with parameters varied per instance.

Both share the same family/pattern, the same mathematical structure, and (usually) the same numerical answer shape. Only the surface — the names, scenes, stakes — differs.

## Scope

Alpha covers **Phase 1** of the family taxonomy (families 1, 2, 4, 5, 6, 7 — six families). Phase 2 families (8–17) and the cross-cutting family (18) are deferred to post-alpha when source material exists. Family 3 is demoted to candidate (no source material).

The Aula 1 foundations material (sample space construction, axioms A1–A3, basic properties P1–P5, set operations) is treated as **prerequisite** that all families assume — it gets the `family: null, foundations: true` tag in the schema.

## Versioning

The schema in `exercise-schema.md` is at `version: "0.1"`. Breaking changes bump the major version; field additions bump the minor.
