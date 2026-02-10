/**
 * This script removes redundant dependency update entries from the latest version in each package's CHANGELOG.md.
 *
 * When Renovate creates multiple PRs for the same dependency, changesets can accumulate duplicate entries
 * for the same package at different versions. This script removes older entries, keeping only the newest
 * version for each dependency in the latest changelog version.
 *
 * - It iterates over the defined packages (react, css, theme).
 * - For each package, it processes the latest version section in CHANGELOG.md.
 * - It identifies dependency update entries and removes duplicates, keeping the highest version.
 * - The script is idempotent: running it multiple times will produce the same result.
 * - Only affects the newest version section, never older versions.
 *
 * Intended usage: This script is run automatically as part of the changeset version workflow.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs, type ParseArgsOptionsConfig } from "node:util";
import { getChangedVersion } from "./add-changelog-date.js";

const CHANGELOG_FILE_NAME = "CHANGELOG.md";

interface ChangelogEntry {
  fullText: string;
  dependencies: Array<{ packageName: string; version: string }>;
  prNumber: string | null;
  prUrl: string | null;
}

const options: ParseArgsOptionsConfig = {
  help: {
    type: "boolean",
  },
  debug: {
    type: "boolean",
  },
};

const projects = ["react", "css", "theme"] as const;
const packagesDir = path.resolve(process.cwd(), "packages");

function parseVersion(version: string): number[] {
  return version.split(".").map((v) => Number.parseInt(v, 10));
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

  // Extract PR info from first line (optional - fixed changesets may not have PR numbers)
  const prMatch = /\(\[#(\d+)\]\(([^)]+)\)\)$/.exec(firstLine);
  const prNumber = prMatch?.[1] ?? null;
  const prUrl = prMatch?.[2] ?? null;

  // Find all dependency updates in the entry
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

  return {
    fullText: entryText,
    dependencies,
    prNumber,
    prUrl,
  };
}

function parseChangelog(content: string) {
  const lines = content.split("\n");
  let versionStartIndex = -1;
  let changesStartIndex = -1;
  let nextVersionIndex = -1;

  // Find the FIRST (latest) version line
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
    // Only look for changes section AFTER we found the first version
    if (
      versionStartIndex !== -1 &&
      nextVersionIndex === -1 && // Only if we haven't found the next version yet
      line.startsWith("### ") &&
      line.includes("Changes")
    ) {
      changesStartIndex = i + 2; // Skip the "### Changes" line and the empty line after it
    }
  }

  if (versionStartIndex === -1 || changesStartIndex === -1) {
    return null;
  }

  // Extract ONLY the changes content from the latest version
  const endIndex = nextVersionIndex === -1 ? lines.length : nextVersionIndex;
  const changesLines = lines.slice(changesStartIndex, endIndex);
  const changesContent = changesLines.join("\n").trim();

  // Split content by double newlines to get individual entries
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

    // Compare versions - all dependencies in current entry should be >= newestEntry
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
      // Only one entry for this package set, keep it
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
  const changelogPath = path.join(packagesDir, pkg, CHANGELOG_FILE_NAME);
  if (!fs.existsSync(changelogPath)) {
    console.warn(`No file ${CHANGELOG_FILE_NAME} found for ${pkg}`);
    return { error: true, content: null };
  }

  const content = fs.readFileSync(changelogPath, "utf8");
  const parsed = parseChangelog(content);

  if (!parsed) {
    return { error: true, content: null };
  }

  // Find dependency update entries and group by package sets
  const dependencyEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length > 0,
  );

  if (dependencyEntries.length === 0) {
    return { error: false, content: null };
  }

  // Group entries by package sets (entries that update the same set of packages)
  const packageSetGroups = new Map<
    string,
    Array<(typeof dependencyEntries)[0]>
  >();

  for (const entry of dependencyEntries) {
    // Create a signature for this entry based on the packages it updates
    const packageSignature = entry.dependencies
      .map((d) => d.packageName)
      .sort((a, b) => a.localeCompare(b))
      .join(",");

    if (!packageSetGroups.has(packageSignature)) {
      packageSetGroups.set(packageSignature, []);
    }
    packageSetGroups.get(packageSignature)!.push(entry);
  }

  // For each group, keep only the entry with the highest versions
  const { entriesToRemove, entriesToKeep } = getEntries(
    dependencyEntries,
    packageSetGroups,
  );

  if (entriesToRemove.size === 0) {
    return { error: false, content: null };
  }

  // Rebuild ONLY the changes section of the latest version
  const newEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length === 0 || entriesToKeep.has(entry),
  );

  // Build the new changes content with proper spacing
  const newChangesContent = newEntries
    .map((entry) => entry.fullText)
    .join("\n\n");

  // Reconstruct the file more carefully
  const lines = parsed.originalLines;
  const beforeChanges = lines.slice(0, parsed.changesStartIndex);
  const afterChanges = lines.slice(parsed.nextVersionIndex);

  // Build parts
  const beforePart = beforeChanges.join("\n");
  const afterPart = afterChanges.join("\n");

  // Construct the final content
  const newContent = beforePart + "\n" + newChangesContent + "\n\n" + afterPart;

  return { error: false, content: newContent };
}

export function runDedupe(pkg: string) {
  const result = dedupeChangelog(pkg);
  if (!result.error && result.content) {
    const changelogPath = path.join(packagesDir, pkg, CHANGELOG_FILE_NAME);
    fs.writeFileSync(changelogPath, result.content, "utf8");
  }
  return result;
}

function main() {
  const { values } = parseArgs({
    options,
  });

  if (values.help) {
    console.log(
      "Usage: node dedupe-changelog.js [--debug] [--help]\n" +
        "Options:\n" +
        "  --debug   Run in debug mode (only deduplicate react without checking versions)\n" +
        "  --help    Show this help message",
    );
    return;
  }

  for (const pkg of projects) {
    if (values.debug && pkg === "react") {
      console.log(`Debug mode: deduplicating changelog for ${pkg}...`);
      runDedupe(pkg);
      continue;
    }

    if (getChangedVersion(pkg)) {
      console.log(`Changes detected in ${pkg}, deduplicating changelog...`);
      runDedupe(pkg);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]!).href) {
  main();
}
