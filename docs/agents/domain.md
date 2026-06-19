# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **single-context** repo: one (optional) `CONTEXT.md` plus `docs/adr/` at the repo root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root (not present yet — proceed silently if absent).
- **`docs/adr/`** — read ADRs that touch the area you're about to work in. This repo's ADRs are named `adr-NNNN-<slug>.md` (e.g. `adr-0001-repo-init.md`, `adr-0003-digdir-komponenter.md`), with `adr-0000-template.md` as the template.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The producer skill (`/grill-with-docs`) creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo:

```
/
├── CONTEXT.md            ← optional; not present yet
├── docs/adr/
│   ├── adr-0000-template.md
│   ├── adr-0001-repo-init.md
│   ├── adr-0002-pakkeversjonering.md
│   └── adr-0003-digdir-komponenter.md
└── packages/ , apps/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md` if/when it exists. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0003 (digdir-komponenter) — but worth reopening because…_
