// Generator for apps/storybook/docgen-wrappers/index.tsx.
//
// Run with: pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers
//
// See the header of the generated index.tsx (and docs/adr/adr-0004-*) for WHY
// these wrappers exist. This script is the single source of truth for them:
// it reads the list of components we re-export from upstream (Digdir) in
// packages/react/src/digdir.ts, then emits one thin, docgen-friendly wrapper
// per component so Storybook autodocs show the real prop types (issue #554).
//
// To support a newly added Digdir component: add it to packages/react/src/digdir.ts
// as usual, then re-run this generator. The vitest coverage test fails if the
// generated file is stale.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../..");
const digdirSourceFile = path.join(repoRoot, "packages/react/src/digdir.ts");
const outFile = path.join(here, "../docgen-wrappers/index.tsx");

/** Namespace alias the generated file binds the base package source to. */
const BASE_NS = "Base";

/** Upstream marks unstable components with this prefix (e.g. EXPERIMENTAL_Suggestion). */
const EXPERIMENTAL_PREFIX = "EXPERIMENTAL_";

/**
 * The name a wrapper is declared under. We drop the EXPERIMENTAL_ marker so the
 * docgen displayName (and thus the autodocs heading) reads cleanly, then re-export
 * the wrapper under its original name so the package's public API is unchanged.
 */
function declName(name: string): string {
  return name.startsWith(EXPERIMENTAL_PREFIX)
    ? name.slice(EXPERIMENTAL_PREFIX.length)
    : name;
}

const reactComponentSymbols = new Set([
  "Symbol(react.forward_ref)",
  "Symbol(react.memo)",
]);

const isComponentLike = (value: unknown): boolean => {
  if (typeof value === "function") return true;
  if (value && typeof value === "object") {
    return reactComponentSymbols.has(
      String((value as { $$typeof?: unknown }).$$typeof),
    );
  }
  return false;
};

interface WrapperPlan {
  name: string;
  subs: string[];
}

/** Names we re-export from Digdir, taken verbatim from digdir.ts. */
export function readReExportedNames(): string[] {
  const src = readFileSync(digdirSourceFile, "utf8");
  // The value re-export block: `export {\n  Name,\n ...\n} from "@digdir/...";`
  const match = src.match(
    /export\s*\{([\s\S]*?)\}\s*from\s*["']@digdir\/designsystemet-react["']/,
  );
  if (!match?.[1]) {
    throw new Error("Could not find the Digdir re-export block in digdir.ts");
  }
  return match[1]
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
}

/** Resolve and import the Digdir runtime module (a dependency of packages/react). */
async function importDigdir(): Promise<Record<string, unknown>> {
  const reactPkgRequire = createRequire(
    path.join(repoRoot, "packages/react/package.json"),
  );
  // A bare resolve picks the CJS build, which is published as ESM-incompatible
  // (`require` in a "type":"module"). Walk up from it to the package root, then
  // import the ESM entry declared in its exports map.
  const cjsEntry = reactPkgRequire.resolve("@digdir/designsystemet-react");
  let dir = path.dirname(cjsEntry);
  while (!existsSync(path.join(dir, "package.json"))) {
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error("Could not locate Digdir package root");
    dir = parent;
  }
  const pkgJson = JSON.parse(
    readFileSync(path.join(dir, "package.json"), "utf8"),
  ) as { exports: { ".": { import: string } } };
  const esmEntry = path.join(dir, pkgJson.exports["."].import);
  return import(pathToFileURL(esmEntry).href) as Promise<
    Record<string, unknown>
  >;
}

interface WrapperSet {
  components: WrapperPlan[];
  namespaces: WrapperPlan[];
  wrappedNames: Set<string>;
}

/**
 * Classify every re-exported name into the wrappers we need to generate.
 * Returns components, namespaces (e.g. Chip/List), and the set of wrapped names.
 */
export async function planWrappers(): Promise<WrapperSet> {
  const names = readReExportedNames();
  const digdir = await importDigdir();

  const components: WrapperPlan[] = [];
  const namespaces: WrapperPlan[] = [];

  for (const name of names) {
    if (/^use[A-Z]/.test(name)) continue; // hooks
    if (/^[a-z]/.test(name)) continue; // utils (e.g. omit)

    const value = digdir[name];
    if (value == null) continue;

    const subs =
      typeof value === "object" || typeof value === "function"
        ? Object.keys(value).filter(
            (key) =>
              /^[A-Z]/.test(key) &&
              isComponentLike((value as Record<string, unknown>)[key]),
          )
        : [];

    if (isComponentLike(value)) {
      components.push({ name, subs });
    } else if (typeof value === "object" && subs.length > 0) {
      // Namespace object with no root component of its own (e.g. Chip, List).
      namespaces.push({ name, subs });
    }
  }

  const wrappedNames = new Set<string>([
    ...components.map((c) => c.name),
    ...namespaces.map((n) => n.name),
  ]);
  return { components, namespaces, wrappedNames };
}

/** Point a sub-component at its wrapped sibling when one exists, else the raw one. */
function subTarget(
  rootName: string,
  sub: string,
  wrappedNames: Set<string>,
): string {
  const flat = `${rootName}${sub}`;
  return wrappedNames.has(flat)
    ? declName(flat)
    : `${BASE_NS}.${rootName}.${sub}`;
}

export async function buildSource(): Promise<string> {
  const { components, namespaces, wrappedNames } = await planWrappers();

  const header = `// GENERATED FILE — do not edit by hand.
// Regenerate with: pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers
//
// Purpose: make Storybook autodocs show the real prop types for the components we
// re-export from upstream (Digdir). Their source lives in node_modules, which
// react-docgen-typescript (RDT) does not analyse, so without this their autodocs
// fall back to useless types like \`variant: string\` (issue #554).
//
// How it works: the Vite alias and tsconfig \`paths\` in this app redirect the
// \`@arbeidstilsynet/design-react\` package specifier to this barrel. Story files
// import from \`@arbeidstilsynet/design-react\` unchanged.
//
// - Our own components (FilePicker, Header, …) flow through \`export *\` from the
//   package source with their existing docgen intact — no wrappers needed.
// - Each Digdir component gets a thin, same-named wrapper declared locally below.
//   Because the wrapper's source is local, RDT resolves the real prop types. A
//   local declaration shadows the matching name from \`export *\`, so there is no clash.
// - Compound components re-attach their sub-components (pointing at the wrapped
//   siblings, so \`Card.Block\` etc. keep working and also gain docgen).
// - Unstable components are wrapped under their clean name (e.g. \`Suggestion\`) so
//   the autodocs heading reads cleanly, then re-exported under their original
//   \`EXPERIMENTAL_\`-prefixed name so the package API stays unchanged.
//
// Constraints:
// - This folder must NOT live under \`.storybook/\` (or any dot-folder): the docgen
//   plugin discovers its TS program by globbing \`**/*.tsx\` with dotfiles excluded.
// - Wrappers import via the relative source path, never the package specifier, to
//   avoid the alias redirecting back into this barrel.
// - Compound sub-components are attached with \`Object.assign(fn, {...})\`, not
//   \`fn.Sub = …\` statements. RDT registers every \`X.Sub = …\` member assignment as
//   a docgen entry keyed by the bare sub-name, and a sub named like a top-level
//   wrapper (e.g. \`Breadcrumbs.Link\`) then clobbers that wrapper's docgen (\`Link\`).
//   \`Object.assign\` is a call expression RDT ignores, and its return type keeps the
//   expando typing so \`Breadcrumbs.Link\` is still typed for consumers.
import * as ${BASE_NS} from "../../../packages/react/src";
import type { ComponentProps } from "react";

export * from "../../../packages/react/src";
`;

  const componentBlocks = components.map(({ name, subs }) => {
    const decl = declName(name);
    // Re-export under the original (e.g. EXPERIMENTAL_-prefixed) name so the
    // package's public API and story imports are unchanged.
    const aliasExport = decl === name ? "" : `\nexport { ${decl} as ${name} };`;

    if (subs.length === 0) {
      const fn = `function ${decl}(props: ComponentProps<typeof ${BASE_NS}.${name}>) {\n  return <${BASE_NS}.${name} {...props} />;\n}`;
      return decl === name ? `export ${fn}` : `${fn}${aliasExport}`;
    }
    // Attach sub-components via Object.assign (not `Name.Sub = …` statements):
    // RDT treats member assignments as docgen entries and a sub named like a
    // top-level wrapper (e.g. Breadcrumbs.Link) would clobber that wrapper's
    // docgen. Object.assign is a call expression RDT ignores, and its return
    // type preserves the expando typing.
    const members = subs
      .map((sub) => `    ${sub}: ${subTarget(name, sub, wrappedNames)},`)
      .join("\n");
    const assign = `Object.assign(\n  function ${decl}(props: ComponentProps<typeof ${BASE_NS}.${name}>) {\n    return <${BASE_NS}.${name} {...props} />;\n  },\n  {\n${members}\n  },\n)`;
    return decl === name
      ? `export const ${decl} = ${assign};`
      : `const ${decl} = ${assign};${aliasExport}`;
  });

  const namespaceBlocks = namespaces.map(({ name, subs }) => {
    const members = subs
      .map((sub) => `  ${sub}: ${subTarget(name, sub, wrappedNames)},`)
      .join("\n");
    return `export const ${name} = Object.assign({}, ${BASE_NS}.${name}, {\n${members}\n});`;
  });

  return `${header}\n${[...componentBlocks, ...namespaceBlocks].join("\n\n")}\n`;
}

// When run directly, write the file.
async function main(): Promise<void> {
  const source = await buildSource();
  writeFileSync(outFile, source, "utf8");
  const { wrappedNames } = await planWrappers();
  console.log(
    `Wrote ${path.relative(repoRoot, outFile)} (${wrappedNames.size} wrappers).`,
  );
}

if (
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url
) {
  void main();
}
