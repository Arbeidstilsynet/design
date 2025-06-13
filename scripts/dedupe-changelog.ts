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
import { parseArgs, ParseArgsOptionsConfig } from "node:util";
import { getChangedVersion } from "./add-changelog-date.js";

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
  return version.split(".").map((v) => parseInt(v, 10));
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

function parseEntry(entryText: string) {
  const lines = entryText.split("\n");
  const firstLine = lines[0];

  // Extract PR info from first line
  const prMatch = firstLine.match(/\(\[#(\d+)\]\(([^)]+)\)\)$/);
  const prNumber = prMatch?.[1];
  const prUrl = prMatch?.[2];

  // Find all dependency updates in the entry
  const dependencies: Array<{ packageName: string; version: string }> = [];

  for (const line of lines) {
    const depMatch = line.match(/Updated dependency `([^`]+)` to `([^`]+)`/);
    if (depMatch) {
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
    if (lines[i].match(/^## \d+\.\d+\.\d+$/)) {
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
      lines[i].startsWith("### ") &&
      lines[i].includes("Changes")
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

  const entries: Array<{
    fullText: string;
    dependencies: Array<{ packageName: string; version: string }>;
    prNumber?: string;
    prUrl?: string;
  }> = [];

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

export function dedupeChangelog(pkg: string): boolean {
  const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) {
    console.warn(`No CHANGELOG.md found for ${pkg}`);
    return false;
  }

  const content = fs.readFileSync(changelogPath, "utf8");
  const parsed = parseChangelog(content);

  if (!parsed) {
    return false;
  }

  // Find dependency update entries and group by package sets
  const dependencyEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length > 0,
  );

  if (dependencyEntries.length === 0) {
    return false;
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
      .sort()
      .join(",");

    if (!packageSetGroups.has(packageSignature)) {
      packageSetGroups.set(packageSignature, []);
    }
    packageSetGroups.get(packageSignature)!.push(entry);
  }

  // For each group, keep only the entry with the highest versions
  const entriesToKeep = new Set<(typeof dependencyEntries)[0]>();
  const entriesToRemove = new Set<(typeof dependencyEntries)[0]>();

  for (const [, entries] of packageSetGroups) {
    if (entries.length === 1) {
      // Only one entry for this package set, keep it
      entriesToKeep.add(entries[0]);
      continue;
    }

    // Find the entry with the highest versions
    let newestEntry = entries[0];
    for (let i = 1; i < entries.length; i++) {
      const current = entries[i];

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

    entriesToKeep.add(newestEntry);
    for (const entry of entries) {
      if (entry !== newestEntry) {
        entriesToRemove.add(entry);
      }
    }
  }

  if (entriesToRemove.size === 0) {
    return false;
  }

  // Rebuild ONLY the changes section of the latest version
  const newEntries = parsed.entries.filter(
    (entry) => entry.dependencies.length === 0 || entriesToKeep.has(entry),
  );

  const newChangesLines: string[] = [];
  for (let i = 0; i < newEntries.length; i++) {
    newChangesLines.push(newEntries[i].fullText);
    if (i < newEntries.length - 1) {
      newChangesLines.push(""); // Add empty line between entries
    }
  }

  // Reconstruct the file - ONLY replace the changes section
  const lines = parsed.originalLines;
  const newLines = [
    ...lines.slice(0, parsed.changesStartIndex), // Everything before changes section
    ...newChangesLines, // New changes section
    ...lines.slice(parsed.nextVersionIndex), // Everything from next version onwards (or end of file)
  ];

  const newContent = newLines.join("\n");
  fs.writeFileSync(changelogPath, newContent, "utf8");

  return true;
}

function main() {
  const { values } = parseArgs({
    options,
  });

  if (values.help) {
    console.log(
      "Usage: node dedupe-changelog.js [--debug] [--help]\n" +
        "Options:\n" +
        "  --debug   Run in debug mode (only deduplicate changelogs without checking versions)\n" +
        "  --help    Show this help message",
    );
    return;
  }

  for (const pkg of projects) {
    if (values.debug && pkg === "react") {
      console.log(`Debug mode: deduplicating changelog for ${pkg}...`);
      dedupeChangelog(pkg);
      continue;
    }

    if (getChangedVersion(pkg)) {
      console.log(`Changes detected in ${pkg}, deduplicating changelog...`);
      dedupeChangelog(pkg);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
