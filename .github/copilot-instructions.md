# Copilot Instructions

This is **Gnist** — the Norwegian Labour Inspection Authority's (Arbeidstilsynet) design system, built on top of [Designsystemet](https://www.designsystemet.no) from Digdir.

## Commands

```bash
pnpm i                    # Install dependencies
pnpm dev                  # Run Storybook locally
pnpm build                # Build all packages
pnpm build:react          # Build only the React package
pnpm test                 # Run all tests
pnpm --filter @arbeidstilsynet/design-react test  # Tests for one package
pnpm vitest run packages/react/src/components/header  # Run tests for a single component
pnpm typecheck            # Type-check all packages
pnpm lint                 # Lint with oxlint
pnpm format               # Format with oxfmt
pnpm format:check         # Check formatting
pnpm changeset            # Add a changeset for release tracking
```

## Architecture

The repo is a **pnpm workspace monorepo** with three publishable packages and a Storybook app:

- **`packages/react`** — React components (`@arbeidstilsynet/design-react`). Re-exports all components from `@digdir/designsystemet-react` plus custom components (Header, FilePicker, LightDarkImage, Logo).
- **`packages/css`** — CSS for custom components (`@arbeidstilsynet/design-css`). Uses PostCSS with nesting. CSS is organized in layers: `at.overrides` for Digdir overrides, `at.components` for custom components.
- **`packages/theme`** — Generated theme tokens (`@arbeidstilsynet/design-theme`). Built from Figma design tokens via `pnpm tokens:build`.
- **`apps/storybook`** — Storybook documentation site. Every merge to `main`
  deploys Storybook to gnist.dev.arbeidstilsynet.no; when Changesets publishes
  packages, the same `main` branch Storybook is deployed to
  gnist.arbeidstilsynet.no.

The `design-react` and `design-css` packages are version-locked together via Changesets `fixed` config.

## Key conventions

### Component structure (packages/react)

Components use the **compound component pattern** with `Object.assign`:

```
packages/react/src/components/<name>/
├── <name>.tsx           # Main component
├── <name>Context.tsx    # Context for compound sub-components
├── <name>*.tsx          # Sub-components (e.g., headerMenu.tsx)
├── index.tsx            # Barrel with Object.assign compound export
├── <name>.test.tsx      # Tests (vitest + testing-library + happy-dom)
├── <name>.stories.tsx   # Storybook stories
└── <name>.mdx           # Storybook documentation
```

New components must be:

1. Added to `packages/react/src/components/index.ts` as an export
2. Given corresponding CSS in `packages/css/src/<name>.css`
3. Imported in `packages/css/src/index.css` inside the appropriate layer

### Digdir re-exports (packages/react/src/digdir.ts)

Components from `@digdir/designsystemet-react` are re-exported with **named exports** (not `export *`) to support React Server Components. When adding a new Digdir component, add a named export here.

Storybook generates a docgen wrapper per component in this list so autodocs show real prop types (see `docs/adr/adr-0004-storybook-docgen-wrappers.md`). After adding a component here, run `pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers`; a vitest test fails if the wrappers are stale.

### Props pattern

Custom components extend `DefaultProps<TRef>` which provides `ref`, `data-size`, and `data-color` props consistent with Designsystemet conventions.

### CSS conventions (packages/css)

- Use CSS nesting (PostCSS handles transpilation)
- Class names are prefixed with `at-` (e.g., `.at-header`, `.at-filepicker`)
- Use Designsystemet CSS custom properties (`--ds-*`) for tokens
- Add container queries for responsive behavior

### Color system (Designsystemet)

Designsystemet uses **contextual semantic color tokens**. Generic tokens like `--ds-color-text-default` or `--ds-color-base-hover` resolve to different values based on the current `data-color` attribute on the element or its ancestors.

- By default (`:root`, `[data-color="accent"]`), generic tokens map to accent palette values (e.g., `--ds-color-text-default` → `--ds-color-accent-text-default`).
- When `data-color="neutral"` is set, the same generic tokens map to neutral palette values (e.g., `--ds-color-text-default` → `--ds-color-neutral-text-default`).
- This applies to all color palettes: accent, neutral, danger, success, info, warning, and any custom ones.

**When writing CSS overrides for Digdir components, prefer the generic semantic tokens** (`--ds-color-text-default`, `--ds-color-base-hover`, etc.) over palette-specific tokens (`--ds-color-accent-text-default`, `--ds-color-neutral-text-default`). The generic tokens automatically adapt to the current color context, so a single override rule works for all color variants.

Note: Figma designs may refer to colors as "main" — this corresponds to the "accent" palette / default color context in code.

### Testing

- Framework: Vitest with happy-dom environment
- Assertions: `@testing-library/jest-dom`
- Rendering: `@testing-library/react` + `@testing-library/user-event`
- Tests are co-located with components

### Linting & formatting

- **Linter**: oxlint (not ESLint) — config at `.oxlintrc.jsonc`. The `packages/react` package extends the root config with React, JSX-a11y, and Storybook plugins.
- **Formatter**: oxfmt — config at `.oxfmtrc.json` (80 char width).

### Releases

Use [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset` after making changes to generate a changeset file. CI handles versioning and publishing to npm.

Changeset descriptions must follow the format: `**ComponentName**: description of change`. For example:

```
**Link**: Override styles to match updated Gnist design.
**Header**: Remove hardcoded header height in mobile view.
```

### Pull requests

PR titles must follow [Conventional Commits](https://www.conventionalcommits.org): `type(scope): description` (e.g. `fix(FilePicker): restyle dropzone to updated Gnist design`). Use the component name as the scope. Common types: `feat`, `fix`, `docs`, `refactor`, `chore`.

Note: `gh pr edit --title` can fail with a "Projects (classic) is being deprecated" GraphQL error. If that happens, set the title via the REST API instead: `gh api -X PATCH repos/Arbeidstilsynet/design/pulls/<n> -f title="..."`.

### Design tokens

Tokens are managed in Figma via Tokens Studio plugin and synced to the `design-tokens/` directory. Run `pnpm tokens:build` to regenerate theme CSS from tokens. See `docs/TOKENS.md` for full workflow.

## Agent skills

### Issue tracker

GitHub Issues for `Arbeidstilsynet/design`, via the `gh` CLI. Note: many issues are Figma-driven and managed by designers until they are dev-ready. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary; the `triage` skill is optional here since incoming work is largely designer-managed. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `docs/adr/` at the repo root (no `CONTEXT.md` yet). See `docs/agents/domain.md`.
