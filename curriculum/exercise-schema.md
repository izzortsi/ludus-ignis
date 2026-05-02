# Exercise schema (v0.1)

JSON schema for entries in `problems.json`. Each entry catalogs one source problem from the alpha PDFs (L1, lista2, Aulas) with enough structure to drive the wrapping pipeline (§14 step 4 of the bible) and answer-verify in-game variants.

## Top-level shape

```json
{
  "version": "0.1",
  "source_corpus": [
    { "id": "L1",        "file": "course_material/L1.pdf",                "kind": "exercise_list", "topic": "axiomas / probabilidade básica" },
    { "id": "L1.sol",    "file": "course_material/lista1 Soluções.pdf",   "kind": "solutions",     "for": "L1" },
    { "id": "lista2",    "file": "course_material/lista2.pdf",            "kind": "exercise_list", "topic": "probabilidade condicional / Bayes" },
    { "id": "Aula1",     "file": "course_material/Aula 1 -.pdf",          "kind": "lecture",       "topic": "foundations" },
    { "id": "Aula2",     "file": "course_material/Aula 2.pdf",            "kind": "lecture",       "topic": "classical examples" },
    { "id": "Aula3",     "file": "course_material/Aula 3.-.pdf",          "kind": "lecture",       "topic": "conditional probability + Bayes" },
    { "id": "Aula4",     "file": "course_material/Aula 4..pdf",           "kind": "lecture",       "topic": "independence" }
  ],
  "problems": [ { /* per-problem entries — see below */ } ]
}
```

## Per-problem entry

```json
{
  "id":         "L1.5",                         // stable identifier: <source>.<problem-number>
  "source":     "L1",                           // matches source_corpus[].id
  "page":       2,                              // page within source PDF
  "number":     5,                              // problem number as printed
  "subitems":   ["a", "b", "c"],                // null if single-part

  "statement":  "Suponha que A e B sejam ...",  // verbatim Portuguese; preserve LaTeX where present
  "subitem_statements": {                       // present only if `subitems` is non-null
    "a": "A ∪ B ocorra?",
    "b": "A ocorra mas B não ocorra?",
    "c": "A e B ocorram?"
  },

  "family":      5,                             // integer 1-21, or null (cross-pattern only)
  "foundations": false,                         // true = entry belongs to the P0 (foundations) tier (families 1-3)
  "pattern":     "complement-counting",         // sub-pattern within the family; see families.md
  "difficulty":  "standard",                    // "standard" | "advanced" — `(**)` mark in Soluções
  "concept_tags": [                             // free-form tags for cross-cutting concepts
    "disjoint-events", "additivity"
  ],

  "parameters": [                               // dimensions that COULD vary in an in-game variant
    { "name": "P_A", "kind": "probability", "source_value": 0.3 },
    { "name": "P_B", "kind": "probability", "source_value": 0.5 }
  ],

  "answer": {                                   // from lista1 Soluções where available; null otherwise
    "kind":    "exact",                         // "exact" | "decimal" | "expression" | "set" | "bounds" | "narrative"
    "value":   { "a": 0.8, "b": 0.3, "c": 0 },
    "source":  "L1.sol p.5",                    // location of the worked solution
    "notes":   "uses P(A∪B) = P(A) + P(B) since disjoint"
  },

  "wrapping_notes": "Two omens with disjoint occurrence — e.g., 'a chuva veio sem maré' vs 'a maré veio sem chuva'. Cinder asks the apprentice for P(at least one omen), P(only chuva), P(both)."
}
```

## Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable across versions. Format: `<source>.<problem-number>` (e.g. `lista2.27`). |
| `source` | string | yes | Must appear in `source_corpus[].id`. |
| `page` | int | yes | 1-indexed. |
| `number` | int | yes | The problem number as printed (e.g. "5", "21"). |
| `subitems` | string[] \| null | yes | `["a", "b", "c"]` or null for single-part problems. |
| `statement` | string | yes | Verbatim. Brazilian Portuguese. Preserve any LaTeX. |
| `subitem_statements` | object | conditionally | Required when `subitems` is non-null; keys match `subitems[]`. |
| `family` | int \| null | yes | 1–10 for Phase 1 (P0: 1–3, P1: 4–10); 11–20 for Phase 2 (P2); 21 cross-cutting. `null` only for unmappable cross-pattern entries. Bible §14 (iteration 6) is the source of truth. |
| `foundations` | boolean | yes | `true` = entry is in the P0 tier (`family` ∈ {1, 2, 3}); convenience flag for filtering the foundations corpus. Iteration-5 semantics ("Aula-1 prerequisite, no family") are obsolete; the field now mirrors `family ≤ 3`. |
| `pattern` | string | yes | Short kebab-case name; see `families.md` for the canonical list per family. |
| `difficulty` | enum | yes | `"standard"` or `"advanced"`. `"advanced"` = marked `(**)` in Soluções. |
| `concept_tags` | string[] | yes | May be empty. Free-form tags for cross-family concepts (e.g. `inclusion-exclusion`, `complement`, `with-replacement`). |
| `parameters` | array | yes | List of dimensions that vary across instances of the same pattern. |
| `parameters[].name` | string | yes | Identifier (e.g. `P_A`, `n_white`, `prior`). |
| `parameters[].kind` | enum | yes | `"probability"` (∈ [0,1]) \| `"count"` (non-negative integer) \| `"ratio"` \| `"label"` \| `"distribution-shape"`. |
| `parameters[].source_value` | any | yes | The value as it appears in the source problem. |
| `answer` | object \| null | yes | Null if no solution available (most lista2 problems — only L1 has worked solutions). |
| `answer.kind` | enum | conditionally | `"exact"` (rational/closed form) \| `"decimal"` (numeric ≈) \| `"expression"` (symbolic in source params) \| `"set"` (e.g. enumerated outcomes) \| `"bounds"` (range) \| `"narrative"` (proof / argument). |
| `answer.value` | any | conditionally | Object keyed by subitem if applicable; raw value otherwise. |
| `answer.source` | string | conditionally | Pointer to where the solution lives (e.g. `"L1.sol p.10"`). |
| `answer.notes` | string | optional | Method-of-proof or one-line gloss. |
| `wrapping_notes` | string | yes | One-paragraph suggestion for in-world wrapping (intensities B / C of §14 step 4). May be empty for foundations entries. |

## Conventions

- **`pattern` names are stable** within a family. New patterns get added to `families.md` first, then referenced from `problems.json`.
- **`parameters[].source_value` preserves the source problem's specific numbers** so re-parameterizing in-game variants is a fresh choice; the source value is one valid instance.
- **`answer` for multi-subitem problems** uses an object keyed by subitem (`{ "a": ..., "b": ... }`). For single-part problems it's a bare value.
- **Bridge / poker / urn sizes** are encoded as count parameters (`n_total`, `n_red`, `k_drawn`, etc.) so the same pattern can drive grain-bin or bone-token in-game variants with the same combinatorics but different objects.
