---
name: sync-designsystemet
description: Upstream sync of Designsystemet component docs and stories into Storybook as adapted copies. Use when `@digdir/designsystemet-*` is bumped, when a Designsystemet component gains or loses a Gnist override, or when asked to add, update or check upstream docs.
---

# Sync Designsystemet

Bring every **adapted copy** in `apps/storybook/stories/digdir/` and
`apps/storybook/stories/digdir-overrides/` up to date with the installed
Designsystemet version. Vocabulary is in `GLOSSARY.md`; the reasons are in
`docs/adr/adr-0005-upstream-dokumentasjon.md`.

Worked examples, one per kind of component. Read every file of the matching
one before the first component of that kind, and match its shape:

- override: `apps/storybook/stories/digdir-overrides/button/`
- plain, static: `apps/storybook/stories/digdir/alert/`
- plain, interactive: `apps/storybook/stories/digdir/dialog/` (subcomponents,
  `useId`, Preview `play`)

When a rule is ambiguous or wrong for a case, take the reading closest to the
worked examples and report it as a skill gap.

## Steps

1. **Pin the version.** The installed version is `@digdir/designsystemet-react`
   in `packages/react/package.json`; the upstream tag is `v<version>`. Read
   upstream at that tag only:

   ```sh
   gh api "repos/digdir/designsystemet/git/trees/v<version>?recursive=1" --jq '.tree[] | "\(.sha) \(.path)"'
   gh api -H "Accept: application/vnd.github.raw" "repos/digdir/designsystemet/contents/<path>?ref=v<version>"
   ```

   The upstream **changed paths** are the paths whose line differs between
   the tree listing at a component's header version and at `v<version>`.

2. **Build the work list.** One row per upstream component folder
   (`apps/www/app/content/components/<name>/`), per upstream utility page
   (`apps/www/app/content/components-docs/en/utilities/*.mdx`), and per local
   folder. Give each row exactly one outcome:
   - **plain**: exported from `packages/react/src/digdir.ts`, no override.
   - **override**: exported, and overridden by Gnist: its CSS is imported in
     the `at.overrides` layer of `packages/css/src/index.css`, or
     `packages/react` replaces the component. Cross-check
     `apps/storybook/stories/Overrides.mdx`.
   - **skip**: upstream page without an export in `digdir.ts` (guidance-only
     pages such as Date picker and Toast, or components Gnist chose not to
     re-export). These stay on designsystemet.no.
   - **remove**: local folder with no upstream counterpart.
   - **current**: every upstream header already names the installed version.
   - **unchanged**: headers name an older version, no changed path is named
     in its headers or is its upstream `packages/css/src/<name>.css`, and its
     upstream folder gained no files. Only the version in its headers
     changes.

   Override status is checked for every row, since it can change locally
   without an upstream change. The list is done when every row has an
   outcome. Track it as todos.

   Plain and override rows are independent of each other. When more than a
   handful remain, hand them to subagents in batches if the runner has them:
   each batch reads the matching worked example, touches only its own
   folders and returns its step 9 report; shared files (`Overrides.mdx`,
   `.storybook/`, `digdir.ts`, this skill) and steps 7–8 stay with the lead.

3. **Sync each plain component** into `stories/digdir/<name>/`:
   1. Harvest the Gnist additions from the current files: `// Gnist:` blocks
      in TSX, `{/* Gnist: start */}`…`{/* Gnist: end */}` blocks in MDX. Files
      without an upstream header predate the markers; there, the Gnist
      additions are `play` functions, `chromatic` and `a11y` parameters,
      `subcomponents`, and the `layout` and `customStyles` a snapshot needs. Their `args` give
      way to the `Preview` args rule, and their other stories are copies of
      Digdir's old Storybook, not Gnist work.
   2. Delete the folder and regenerate it from upstream with the
      [translation rules](#translation-rules).
   3. Re-apply each harvested addition, marked, to the story it belonged to.
      Additions whose story is gone upstream are dropped and reported.

4. **Sync each override** in `stories/digdir-overrides/<name>/`. Diff every
   upstream source between the version in its header and the installed one:

   ```sh
   diff <(gh api -H "Accept: application/vnd.github.raw" "repos/digdir/designsystemet/contents/<path>?ref=v<old>") \
        <(gh api -H "Accept: application/vnd.github.raw" "repos/digdir/designsystemet/contents/<path>?ref=v<new>")
   ```

   Also diff upstream `packages/css/src/<name>.css`. Apply each hunk through
   the translation rules and update the headers. **Stop** on a component when
   a hunk touches what Gnist overrides: CSS our override file targets, text
   or stories describing overridden styling or behaviour, or anything inside
   a Gnist block. Leave that component's files at the old version and report
   the hunks for human review. An override without upstream headers (first
   sync) is generated like a plain component, keeping its Gnist additions.

5. **Move and remove.** Move a folder between `digdir/` and
   `digdir-overrides/` when its override status changed. Delete **remove**
   rows in `digdir/`; for **remove** rows in `digdir-overrides/`, stop and
   report, since the override may need a new home.

6. **Sync utilities.** One MDX page per upstream utility page, in
   `stories/digdir/utilities/`, titled `designsystemet.no utilities/<title>`
   with `<title>` from the upstream frontmatter, and opening with
   `# <title>`. A page with upstream stories gets a stories file and
   `<Meta of={Stories} />`; a page without uses `<Meta title="…" />`. Utility
   pages have no Controls.

7. **Check exports.** List runtime exports missing from `digdir.ts`:

   ```sh
   cd packages/react && node --input-type=module -e 'const m=await import("@digdir/designsystemet-react");const s=(await import("node:fs")).readFileSync("src/digdir.ts","utf8");console.log(Object.keys(m).filter(k=>!new RegExp(`\\b${k}\\b`).test(s)))'
   ```

   Report them; adding an export is a human decision. When `digdir.ts`
   changes, run `pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers`.

8. **Verify.** All green:

   ```sh
   pnpm typecheck && pnpm lint && pnpm format
   pnpm --filter @arbeidstilsynet/storybook test
   pnpm --filter @arbeidstilsynet/storybook test:upstream
   pnpm --filter @arbeidstilsynet/storybook build
   ```

   `stories/digdir*/**` sit outside `pnpm lint` and the default vitest
   projects; `test:upstream` renders every story there and runs every `play`
   in a headless browser, with axe off.

   Then check `apps/storybook/storybook-static/index.json`. For every synced
   component: `Overview`, `Code` and `Accessibility` docs entries in that
   order, its stories, and `Chromatic/<Name>` when upstream has a chromatic
   file; for every removed one, no entries. With a browser, also open each
   synced component: canvases render, Controls drive the Preview, internal
   links land on the right page and heading, the `Chromatic/<Name>` story
   shows every story, and each Gnist `play` ends on its open state.

9. **Report**, grouped by outcome: synced, unchanged, removed, skipped,
   stopped for review (with hunks), dropped Gnist additions, missing exports,
   skill gaps.

## Folder layout

```
stories/digdir/<name>/            # plain: replaced wholesale on sync
stories/digdir-overrides/<name>/  # override: upstream diff applied
  <Name>.stories.tsx
  <Name>.dodont.stories.tsx       # when upstream has <name>.dodont.tsx
  <Name>.chromatic.stories.tsx    # see Chromatic
  Overview.mdx
  Code.mdx
  Accessibility.mdx
  …                               # helpers, CSS modules and assets the
                                  # upstream stories import, also adapted
```

`<name>` is the upstream folder name; `<Name>` is the component's export name.
Both folders use the same conventions. Story titles are
`designsystemet.no/<Name>`, except the text components Heading, Label,
Paragraph and ValidationMessage, which are grouped as
`designsystemet.no/Typography/<Name>`.

## Upstream headers and Gnist markers

Every adapted copy starts with one header per upstream source it came from:

```tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/button/button.stories.tsx
```

```mdx
{/* upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/button/en/overview.mdx */}
```

Everything else Gnist adds is marked: a `// Gnist: <why>` comment above the
addition in TSX; `{/* Gnist: start */}` and `{/* Gnist: end */}` around it in
MDX. Mechanical translations are not marked.

## Translation rules

English only: read `en/`, ignore `no/`.

### MDX pages

Each component gets three attached docs entries, `Overview.mdx`, `Code.mdx`
and `Accessibility.mdx`, from `en/overview.mdx`, `en/code.mdx` and
`en/accessibility.mdx`. Each starts with the header, imports,
`<Meta of={<Name>Stories} name="Overview|Code|Accessibility" />`, `<Title />`
and `<Subtitle />`. Drop the frontmatter.

| www                                  | Storybook                                                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `<Story story="X" />`                | `<Canvas of={<Name>Stories.X} />`                                                                           |
| `<Story … defaultOpen />`            | `<Canvas … sourceState="shown" />`                                                                          |
| `<Story … layout="block" />`         | story parameter `customStyles: { display: "block" }`                                                        |
| `<Story … layout="column" />`        | story parameter `customStyles: { flexDirection: "column", alignItems: "flex-start" }`                       |
| `<Story story="X" />`, X not at tag  | the closest existing story (`WeightsEn` → `Weights`), or dropped; reported                                  |
| `<Story … language="…" />`           | dropped                                                                                                     |
| `<ReactComponentDocs />`             | `<Canvas of={<Name>Stories.Preview} />` then `<Controls of={<Name>Stories.Preview} sort="requiredFirst" />` |
| `<CssAttributes />`                  | `<CssAttributes css={css} />`                                                                               |
| `<CssVariables />`                   | `<CssVariables css={css} prefix="--dsc-" />`                                                                |
| `<DoDont story="DoXEn">…</DoDont>`   | `<DoDont of={DoDontStories.DoX} variant="do">…</DoDont>` (`dont` when the name has `Dont`)                  |
| a Designsystemet component, `<Card>` | the same, imported from `@arbeidstilsynet/design-react`, with `className="sb-unstyled"`                     |

- Package names in prose, code blocks and stories:
  `@digdir/designsystemet-react` → `@arbeidstilsynet/design-react`,
  `@digdir/designsystemet-css` → `@arbeidstilsynet/design-css`. Other
  packages keep their names.
- `css` is `import css from "@arbeidstilsynet/design-css/digdir/<cssFile>?inline"`,
  with `cssFile` from `metadata.json`. Docs components come from
  `packages/react/src/docs-components/`.
- A www component without a Storybook equivalent: port it to
  `packages/react/src/docs-components/` as an adapted copy, as was done for
  `DoDont` and `CssAttributes`.
- Norwegian left in an `en/` page (a heading, an anchor, a label, example
  data) is translated; an anchor points at the English heading's slug.
- The `metadata.json` subtitle renders as plain text: strip markdown links.
- Markdown tables stay markdown (remark-gfm is enabled).
- A colour Gnist's theme lacks (`brand1`, `brand3`) becomes the closest Gnist
  palette, with a Gnist comment.
- Assets a story loads by site-relative path are copied into the folder;
  absolute URLs stay.
- Every Code page has the `Preview` canvas with `Controls`. When upstream has
  no `<ReactComponentDocs />`, add them in a Gnist `## Props` section at the
  end.
- Upstream text that a Gnist override makes untrue stays as written, followed
  by a Gnist note saying what Gnist does instead.
- oxfmt joins a `<Divider />` with a following `\` line; keep a blank line
  between them.
- An override's Overview opens with an info `Alert` pointing to its "Gnist
  overrides" section and the Overrides page, and ends with that section: what
  Gnist changes, and a canvas of its Gnist matrix. Both are Gnist blocks.

### Links

| upstream target                              | Storybook                                                     |
| -------------------------------------------- | ------------------------------------------------------------- |
| `/en/components/docs/<name>/<page>#<anchor>` | `?path=/docs/<id>--<page>#<anchor>`                           |
| a utility page                               | `?path=/docs/<id>--docs#<anchor>`                             |
| a skipped utility page                       | `https://designsystemet.no/en/components/utilities/<name>`    |
| `/en/fundamentals/code/composition`          | `?path=/docs/composition--docs#slots`, "composition in Gnist" |
| anything else on the site                    | `https://designsystemet.no/en/…`                              |

`<id>` derives from the target's Storybook title: lowercase, every run of
non-alphanumerics becomes `-` (`designsystemet.no/Button` →
`designsystemet-no-button`, `designsystemet.no utilities/usePagination` →
`designsystemet-no-utilities-usepagination`). Keep anchors. A skipped component links to
designsystemet.no. The same rules apply to `href`s inside stories.

### Stories

Upstream www stories are plain function components; write them as CSF Next:

- `preview.meta` with the title, `component`, `tags: ["!autodocs"]`,
  `parameters.docs.subtitle` from `metadata.json` `en.subtitle` (add the
  `metadata.json` header), and the pilot's `customStyles` row layout, which
  stands in for the www example frame.
- A compound component lists its parts in `subcomponents`
  (`"Dialog.Block": Dialog.Block`), so `Controls` shows a tab per part. This
  is a Gnist addition.
- Where both `X` and `XEn` exist, keep `XEn` and name it `X`; drop the
  Norwegian one. Translate remaining Norwegian story names and example text
  to English (`MedLenke` → `WithLink`).
- `Preview` takes `args` for what the www version hardcodes, so Controls
  work, including every required prop. When nothing is left to make an
  arg, omit `args`. Other stories stay argless: `meta.story(() => …)`.
- A story that calls hooks becomes `meta.story({ render: function X() { … } })`
  so `rules-of-hooks` passes.
- Code pages render `Preview` twice, so a hardcoded `id` or radio `name` in
  story code (and the `commandfor`/`htmlFor` pointing at it) comes from
  `useId()` instead. Code blocks in MDX keep their literal values.
- A story that acts on the page when it loads (ErrorSummary takes focus)
  gets a Gnist decorator that keeps it still on docs pages.
- `<name>.dodont.tsx` becomes `<Name>.dodont.stories.tsx`, titled
  `designsystemet.no/<Name>/DoDont`, tagged `["!autodocs", "!dev"]`.

## Chromatic

Snapshots are opt-in and budgeted (`apps/storybook/README.md`). Each visual
component costs one combined snapshot:

- `<Name>.chromatic.stories.tsx` exports one `Snapshots` story made with
  `createSingleStory` from `apps/storybook/utils/create-single-story.tsx`,
  titled `Chromatic/<Name>`, tagged `["chromatic", "!autodocs"]`. It is the
  adapted copy of upstream
  `packages/react/src/components/<name>/<name>.chromatic.tsx`; components
  without that upstream file get none.
- An override adds exactly one Gnist matrix story to its stories file,
  covering the resting states the override changes (hover and visited can't
  be captured without pseudo-states). The combined snapshot picks it up.
  Keep it the single matrix: a review already collapsed Button's six into
  one.
- `play` functions do not run inside the combined snapshot. Interactive
  components (Dialog, Dropdown, Popover, Suggestion, Tooltip today) have no
  upstream chromatic file; their `Preview` gets a Gnist `play` that opens it
  and `parameters.chromatic.disableSnapshot: false`. Every `play` is
  deterministic and ends on the meaningful open state; give the story room
  (`customStyles` height) so the open state isn't cropped.
- Hook and utility stories take no snapshot.
