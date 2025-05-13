/**
 * This script updates the latest version heading in each package's CHANGELOG.md to include the current date (YYYY-MM-DD)
 * if the version in package.json has changed compared to the version on the main branch.
 *
 * - It iterates over the defined packages (react, css, theme).
 * - For each package, it checks if the version in package.json differs from origin/main.
 * - If the version changed, it updates the first version heading in CHANGELOG.md to append or update the current date.
 * - The script is idempotent: running it multiple times will only update the date for the latest version, never older versions.
 * - If new changesets are added over several days, the date will always reflect the last time the script was run before merge.
 *
 * Intended usage: This script is run automatically as part of the release workflow, not manually.
 * It ensures the changelog date is always up-to-date at the time of publishing a release.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projects = ["react", "css", "theme"];
const packagesDir = path.resolve(process.cwd(), "packages");

export function getChangedVersion(pkg: string): boolean {
  const pkgPath = path.join(packagesDir, pkg, "package.json");
  if (!fs.existsSync(pkgPath)) return false;

  // Use POSIX-style path for git
  const gitPath = path.posix.join("packages", pkg, "package.json");

  let mainContent: string;
  try {
    // Fetch the version of package.json from main branch
    mainContent = execSync(`git show origin/main:${gitPath}`, {
      encoding: "utf8",
    });
  } catch {
    // If the file didn't exist on main, treat as changed
    return true;
  }
  const mainVersion = JSON.parse(mainContent).version;
  const currVersion = JSON.parse(fs.readFileSync(pkgPath, "utf8")).version;
  return mainVersion !== currVersion;
}

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

  // Regex: match the first version heading, possibly followed by a "Released:" line
  const versionHeadingRegex =
    /^## (\d+\.\d+\.\d+)(?:\n\nReleased: \d{4}-\d{2}-\d{2})?/m;
  const match = content.match(versionHeadingRegex);

  if (!match) {
    console.log(`No version heading found in packages/${pkg}/CHANGELOG.md`);
    return;
  }

  // Replace or insert the Released date after the heading
  const updated = content.replace(
    versionHeadingRegex,
    `## ${match[1]}\n\nReleased: ${today}`,
  );

  fs.writeFileSync(changelogPath, updated, "utf8");
  console.log(
    `Set date for latest version in packages/${pkg}/CHANGELOG.md to ${today}`,
  );
}

function main() {
  for (const pkg of projects) {
    if (getChangedVersion(pkg)) {
      addDateToChangelog(pkg);
    }
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  main();
}
