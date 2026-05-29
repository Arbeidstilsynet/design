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
- **`apps/storybook`** — Storybook documentation site deployed to gnist.arbeidstilsynet.no.

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

### Props pattern

Custom components extend `DefaultProps<TRef>` which provides `ref`, `data-size`, and `data-color` props consistent with Designsystemet conventions.

### CSS conventions (packages/css)

- Use CSS nesting (PostCSS handles transpilation)
- Class names are prefixed with `at-` (e.g., `.at-header`, `.at-filepicker`)
- Use Designsystemet CSS custom properties (`--ds-*`) for tokens
- Add container queries for responsive behavior

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

### Design tokens

Tokens are managed in Figma via Tokens Studio plugin and synced to the `design-tokens/` directory. Run `pnpm tokens:build` to regenerate theme CSS from tokens. See `docs/TOKENS.md` for full workflow.
