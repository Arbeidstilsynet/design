/**
 * Post-processes CHANGELOG.md files after `changeset version`.
 *
 * For each package with a version change (compared to origin/main):
 *  1. Adds a "Released: YYYY-MM-DD" line after the latest version heading.
 *  2. Deduplicates dependency update entries, keeping only the newest version
 *     for each dependency (or group of dependencies updated together).
 *
 * Intended usage: run automatically as part of the changeset version workflow.
 * The version script in package.json calls this after `changeset version`.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projects = ["react", "css", "theme"] as const;
const packagesDir = path.resolve(process.cwd(), "packages");

// --- Version detection ---

export function getChangedVersion(pkg: string): boolean {
  const pkgPath = path.join(packagesDir, pkg, "package.json");
  if (!fs.existsSync(pkgPath)) return false;

  const gitPath = path.posix.join("packages", pkg, "package.json");

  let mainContent: string;
  try {
    mainContent = execSync(`git show origin/main:${gitPath}`, {
      encoding: "utf8",
    });
  } catch {
    return true;
  }
  const mainVersion = JSON.parse(mainContent).version;
  const currVersion = JSON.parse(fs.readFileSync(pkgPath, "utf8")).version;
  return mainVersion !== currVersion;
}

// --- Add date ---

export function addDateToChangelog(pkg: string) {
  const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) {
    console.warn(`No CHANGELOG.md found for ${pkg}`);
    return;
  }
  const content = fs.readFileSync(changelogPath, "utf8");
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const today = `${yyyy}-${mm}-${dd}`;

  const versionHeadingRegex =
    /^## (\d+\.\d+\.\d+)(?:\n\nReleased: \d{4}-\d{2}-\d{2})?/m;
  const match = content.match(versionHeadingRegex);

  if (!match) {
    console.log(`No version heading found in packages/${pkg}/CHANGELOG.md`);
    return;
  }

  const updated = content.replace(
    versionHeadingRegex,
    `## ${match[1]}\n\nReleased: ${today}`,
  );

  fs.writeFileSync(changelogPath, updated, "utf8");
  console.log(
    `Set date for latest version in packages/${pkg}/CHANGELOG.md to ${today}`,
  );
}

// --- Dedupe ---

interface ChangelogEntry {
  fullText: string;
  dependencies: Array<{ packageName: string; version: string }>;
  prNumber: string | null;
  prUrl: string | null;
}

function parseVersion(version: string): number[] {
  const cleanedVersion = version.replace(/^[\^~<>=]*/, "");
  return cleanedVersion.split(".").map((v) => Number.parseInt(v, 10));
}

function compareVersions(a: string, b: string): number {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;
    if (aVal !== bVal) {
      return aVal - bVal;
    }
  }
  return 0;
}

function parseEntry(entryText: string): ChangelogEntry {
  const lines = entryText.split("\n");
  const firstLine = lines[0]!;

  const prMatch = /\(\[#(\d+)\]\(([^)]+)\)\)$/.exec(firstLine);
  const prNumber = prMatch?.[1] ?? null;
  const prUrl = prMatch?.[2] ?? null;

  const dependencies: Array<{ packageName: string; version: string }> = [];

  for (const line of lines) {
    const depMatch = /Updated dependency `([^`]+)` to `([^`]+)`/.exec(line);
    if (depMatch) {
      if (!depMatch[1] || !depMatch[2]) {
        throw new Error("Expected dependency match to have two capture groups");
      }
      dependencies.push({
        packageName: depMatch[1],
        version: depMatch[2],
      });
    }
  }

  return { fullText: entryText, dependencies, prNumber, prUrl };
}

function parseChangelog(content: string) {
  const lines = content.split("\n");
  let versionStartIndex = -1;
  let changesStartIndex = -1;
  let nextVersionIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    if (/^## \d+\.\d+\.\d+$/.exec(line)) {
      if (versionStartIndex === -1) {
        versionStartIndex = i;
      } else {
        nextVersionIndex = i;
        break;
      }
    }
    if (
      versionStartIndex !== -1 &&
      nextVersionIndex === -1 &&
      line.startsWith("### ") &&
      line.includes("Changes")
    ) {
      changesStartIndex = i + 2;
    }
  }

  if (versionStartIndex === -1 || changesStartIndex === -1) {
    return null;
  }

  const endIndex = nextVersionIndex === -1 ? lines.length : nextVersionIndex;
  const changesLines = lines.slice(changesStartIndex, endIndex);
  const changesContent = changesLines.join("\n").trim();

  const rawEntries = changesContent
    .split(/\n\n/)
    .filter((entry) => entry.trim());

  const entries: ChangelogEntry[] = [];

  for (const rawEntry of rawEntries) {
    const trimmed = rawEntry.trim();
    if (trimmed.startsWith("- ")) {
      entries.push(parseEntry(trimmed));
    }
  }

  return {
    versionStartIndex,
    changesStartIndex,
    nextVersionIndex: nextVersionIndex || lines.length,
    entries,
    originalLines: lines,
  };
}

function getNewestEntry(entries: ChangelogEntry[]): ChangelogEntry {
  let newestEntry = entries[0];
  if (!newestEntry) {
    throw new Error("Expected at least one entry in the group");
  }

  for (let i = 1; i < entries.length; i++) {
    const current = entries[i]!;

    let currentIsNewer = true;
    for (const dep of current.dependencies) {
      const correspondingDep = newestEntry.dependencies.find(
        (d) => d.packageName === dep.packageName,
      );
      if (
        correspondingDep &&
        compareVersions(dep.version, correspondingDep.version) < 0
      ) {
        currentIsNewer = false;
        break;
      }
    }

    if (currentIsNewer) {
      newestEntry = current;
    }
  }
  return newestEntry;
}

function getEntries(
  dependencyEntries: ChangelogEntry[],
  packageSetGroups: Map<string, ChangelogEntry[]>,
) {
  const entriesToKeep = new Set<(typeof dependencyEntries)[0]>();
  const entriesToRemove = new Set<(typeof dependencyEntries)[0]>();

  for (const [, entries] of packageSetGroups) {
    if (entries.length === 1) {
      entriesToKeep.add(entries[0]!);
      continue;
    }

    const newestEntry = getNewestEntry(entries);

    entriesToKeep.add(newestEntry);
    for (const entry of entries) {
      if (entry !== newestEntry) {
        entriesToRemove.add(entry);
      }
    }
  }

  return { entriesToRemove, entriesToKeep };
}

export function dedupeChangelog(pkg: string): {
  error: boolean;
  content: string | null;
} {
  const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) {
    console.warn(`No file CHANGELOG.md found for ${pkg}`);
    return { error: true, content: null };
  }

  const content = fs.readFileSync(changelogPath, "utf8");
  const parsed = parseChangelog(content);

  if (!parsed) {
    return { error: true, content: null };
  }

  const dependencyEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length > 0,
  );

  if (dependencyEntries.length === 0) {
    return { error: false, content: null };
  }

  const packageSetGroups = new Map<
    string,
    Array<(typeof dependencyEntries)[0]>
  >();

  for (const entry of dependencyEntries) {
    const packageSignature = entry.dependencies
      .map((d) => d.packageName)
      .toSorted((a, b) => a.localeCompare(b))
      .join(",");

    if (!packageSetGroups.has(packageSignature)) {
      packageSetGroups.set(packageSignature, []);
    }
    packageSetGroups.get(packageSignature)!.push(entry);
  }

  const { entriesToRemove, entriesToKeep } = getEntries(
    dependencyEntries,
    packageSetGroups,
  );

  if (entriesToRemove.size === 0) {
    return { error: false, content: null };
  }

  const newEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length === 0 || entriesToKeep.has(entry),
  );

  const newChangesContent = newEntries
    .map((entry) => entry.fullText)
    .join("\n\n");

  const lines = parsed.originalLines;
  const beforeChanges = lines.slice(0, parsed.changesStartIndex);
  const afterChanges = lines.slice(parsed.nextVersionIndex);

  const beforePart = beforeChanges.join("\n");
  const afterPart = afterChanges.join("\n");

  const newContent = beforePart + "\n" + newChangesContent + "\n\n" + afterPart;

  return { error: false, content: newContent };
}

export function runDedupe(pkg: string) {
  const result = dedupeChangelog(pkg);
  if (!result.error && result.content) {
    const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");
    fs.writeFileSync(changelogPath, result.content, "utf8");
  }
  return result;
}

// --- Main: run both add-date and dedupe ---

function main() {
  for (const pkg of projects) {
    if (getChangedVersion(pkg)) {
      addDateToChangelog(pkg);
      console.log(`Changes detected in ${pkg}, deduplicating changelog...`);
      runDedupe(pkg);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]!).href) {
  main();
}
