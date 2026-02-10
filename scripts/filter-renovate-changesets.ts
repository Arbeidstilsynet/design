/**
 * Removes Renovate changeset files that only update devDependencies.
 * Run before `changeset version` to filter out unnecessary changesets.
 * @see https://github.com/Arbeidstilsynet/design/issues/633
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CHANGESET_DIR = ".changeset";
const RENOVATE_CHANGESET_PREFIX = "renovate-";
const PUBLISHED_PACKAGES = ["react", "css", "theme"] as const;
const PACKAGE_NAME_TO_DIR: Record<string, string> = {
  "@arbeidstilsynet/design-react": "react",
  "@arbeidstilsynet/design-css": "css",
  "@arbeidstilsynet/design-theme": "theme",
};

type PackageDeps = { dependencies: Set<string>; peerDependencies: Set<string> };

export function parseChangesetFile(content: string) {
  const lines = content
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n")
    .split("\n");

  let frontmatterStart = -1;
  let frontmatterEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "---") {
      if (frontmatterStart === -1) {
        frontmatterStart = i;
      } else {
        frontmatterEnd = i;
        break;
      }
    }
  }

  if (frontmatterStart === -1 || frontmatterEnd === -1) {
    return {
      affectedPackages: [] as string[],
      updatedDependencies: [] as string[],
    };
  }

  const affectedPackages: string[] = [];
  for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
    const match = /^['"]?(@[^'"]+)['"]?:\s*(major|minor|patch)/.exec(lines[i]!);
    if (match?.[1]) affectedPackages.push(match[1]);
  }

  const updatedDependencies: string[] = [];
  for (let i = frontmatterEnd + 1; i < lines.length; i++) {
    const match = /Updated dependency `([^`]+)` to `[^`]+`/.exec(lines[i]!);
    if (match?.[1]) updatedDependencies.push(match[1]);
  }

  return { affectedPackages, updatedDependencies };
}

function loadPackageDeps(packageDir: string): PackageDeps | null {
  const packageJsonPath = path.join(
    process.cwd(),
    "packages",
    packageDir,
    "package.json",
  );
  if (!fs.existsSync(packageJsonPath)) return null;

  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    return {
      dependencies: new Set(Object.keys(pkg.dependencies ?? {})),
      peerDependencies: new Set(Object.keys(pkg.peerDependencies ?? {})),
    };
  } catch {
    return null;
  }
}

export function shouldKeepChangeset(
  affectedPackages: string[],
  updatedDependencies: string[],
  packageDepsCache: Map<string, PackageDeps>,
): boolean {
  const affectedPublishedPackages = affectedPackages
    .map((pkgName) => PACKAGE_NAME_TO_DIR[pkgName])
    .filter((dir): dir is string => dir !== undefined);

  if (affectedPublishedPackages.length === 0) return false;
  if (updatedDependencies.length === 0) return true;

  for (const pkgDir of affectedPublishedPackages) {
    const deps = packageDepsCache.get(pkgDir);
    if (!deps) continue;
    for (const dep of updatedDependencies) {
      if (deps.dependencies.has(dep) || deps.peerDependencies.has(dep)) {
        return true;
      }
    }
  }
  return false;
}

export function filterRenovateChangesets(changesetDir: string) {
  if (!fs.existsSync(changesetDir))
    return { toRemove: [] as string[], toKeep: [] as string[] };

  const packageDepsCache = new Map<string, PackageDeps>();
  for (const pkgDir of PUBLISHED_PACKAGES) {
    const deps = loadPackageDeps(pkgDir);
    if (deps) packageDepsCache.set(pkgDir, deps);
  }

  const toRemove: string[] = [];
  const toKeep: string[] = [];

  for (const fileName of fs.readdirSync(changesetDir)) {
    if (
      !fileName.startsWith(RENOVATE_CHANGESET_PREFIX) ||
      !fileName.endsWith(".md")
    )
      continue;

    const content = fs.readFileSync(path.join(changesetDir, fileName), "utf8");
    const { affectedPackages, updatedDependencies } =
      parseChangesetFile(content);

    if (
      shouldKeepChangeset(
        affectedPackages,
        updatedDependencies,
        packageDepsCache,
      )
    ) {
      toKeep.push(fileName);
    } else {
      toRemove.push(fileName);
    }
  }

  return { toRemove, toKeep };
}

function main() {
  const changesetDir = path.join(process.cwd(), CHANGESET_DIR);
  const { toRemove, toKeep } = filterRenovateChangesets(changesetDir);

  if (toRemove.length > 0) {
    console.log("Removing changesets that only update devDependencies:");
    for (const fileName of toRemove) {
      console.log(`  - ${fileName}`);
      fs.unlinkSync(path.join(changesetDir, fileName));
    }
  }

  if (toKeep.length > 0) {
    console.log("Keeping changesets with production dependency updates:");
    for (const fileName of toKeep) {
      console.log(`  + ${fileName}`);
    }
  }

  if (toRemove.length === 0 && toKeep.length === 0) {
    console.log("No renovate changesets found.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]!).href) {
  main();
}
