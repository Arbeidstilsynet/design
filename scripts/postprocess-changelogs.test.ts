import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  type MockInstance,
  vi,
} from "vitest";
import {
  addDateToChangelog,
  dedupeChangelog,
  getChangedVersion,
  runDedupe,
} from "./postprocess-changelogs";

vi.mock("child_process");

const packagesDir = path.resolve(process.cwd(), "packages");
const pkg = "react";
const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");

function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

describe("postprocess-changelogs", () => {
  let readFileSyncSpy: MockInstance;
  let writeFileSyncSpy: MockInstance;
  let existsSyncSpy: MockInstance;
  let consoleWarnSpy: MockInstance;
  let consoleLogSpy: MockInstance;

  beforeEach(() => {
    readFileSyncSpy = vi.spyOn(fs, "readFileSync") as MockInstance;
    writeFileSyncSpy = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {}) as MockInstance;
    existsSyncSpy = vi.spyOn(fs, "existsSync") as MockInstance;
    consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {}) as MockInstance;
    consoleLogSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {}) as MockInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function setupTest(changelog: string) {
    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });
  }

  // --- getChangedVersion ---

  describe("getChangedVersion", () => {
    it("returns false if package.json does not exist", () => {
      existsSyncSpy.mockReturnValue(false);
      expect(getChangedVersion(pkg)).toBe(false);
    });

    it("returns true if git show throws (file missing on main)", () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify({ version: "1.2.3" }));
      (execSync as Mock).mockImplementation(() => {
        throw new Error("not found");
      });
      expect(getChangedVersion(pkg)).toBe(true);
    });

    it("returns true if versions differ", () => {
      existsSyncSpy.mockReturnValue(true);
      (execSync as Mock).mockReturnValue(JSON.stringify({ version: "1.2.3" }));
      readFileSyncSpy.mockReturnValue(JSON.stringify({ version: "2.0.0" }));
      expect(getChangedVersion(pkg)).toBe(true);
    });

    it("returns false if versions are the same", () => {
      existsSyncSpy.mockReturnValue(true);
      (execSync as Mock).mockReturnValue(JSON.stringify({ version: "1.2.3" }));
      readFileSyncSpy.mockImplementation((p) => {
        if (
          typeof p === "string" &&
          p.replaceAll("\\", "/").endsWith("/react/package.json")
        ) {
          return JSON.stringify({ version: "1.2.3" });
        }
        return "";
      });
      expect(getChangedVersion(pkg)).toBe(false);
    });
  });

  // --- addDateToChangelog ---

  describe("addDateToChangelog", () => {
    it("adds date to latest version heading if not present", () => {
      const changelog = `# pkg\n\n## 1.2.3\n\nSome changes\n`;
      setupTest(changelog);

      addDateToChangelog(pkg);

      const today = getToday();
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        changelogPath,
        expect.stringContaining(`## 1.2.3\n\nReleased: ${today}`),
        "utf8",
      );
    });

    it("updates date if already present", () => {
      const changelog = `# pkg\n\n## 1.2.3\n\nReleased: 2000-01-01\n\nSome changes\n`;
      setupTest(changelog);

      addDateToChangelog(pkg);

      const today = getToday();
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        changelogPath,
        expect.stringContaining(`## 1.2.3\n\nReleased: ${today}`),
        "utf8",
      );
    });

    it("does nothing if no version heading is found", () => {
      const changelog = `# pkg\n\nNo versions yet\n`;
      setupTest(changelog);

      addDateToChangelog(pkg);

      expect(writeFileSyncSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("No version heading found"),
      );
    });

    it("warns if no CHANGELOG.md exists", () => {
      existsSyncSpy.mockReturnValue(false);

      addDateToChangelog(pkg);

      expect(writeFileSyncSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("No CHANGELOG.md found"),
      );
    });
  });

  // --- dedupeChangelog ---

  describe("dedupeChangelog", () => {
    it("removes duplicate dependency entries keeping the newest version", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Updated dependency \`@types/node\` to \`22.15.31\`. ([#118](https://github.com/Arbeidstilsynet/design/pull/118))

## 0.0.16

Released: 2025-06-10

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.6\`. ([#110](https://github.com/Arbeidstilsynet/design/pull/110))
`;

      setupTest(changelog);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      const content = result.content;
      expect(content).not.toBeNull();
      expect(content).toContain("@types/react` to `19.1.8`");
      expect(content).not.toContain("@types/react` to `19.1.7`");
      expect(content).toContain("@types/node` to `22.15.31`");
      expect(content).toContain("## 0.0.16");
      expect(content).toContain("@types/react` to `19.1.6`");
    });

    it("handles multi-line dependency entries and version comparison", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@storybook/addon-docs\` to \`9.0.9\`. ([#124](https://github.com/Arbeidstilsynet/design/pull/124))
  Updated dependency \`@storybook/react-vite\` to \`9.0.9\`.
  Updated dependency \`eslint-plugin-storybook\` to \`9.0.9\`.
  Updated dependency \`storybook\` to \`9.0.9\`.

- Updated dependency \`@storybook/addon-docs\` to \`9.0.8\`. ([#120](https://github.com/Arbeidstilsynet/design/pull/120))
  Updated dependency \`@storybook/react-vite\` to \`9.0.8\`.
  Updated dependency \`eslint-plugin-storybook\` to \`9.0.8\`.
  Updated dependency \`storybook\` to \`9.0.8\`.

- Updated dependency \`typescript\` to \`5.10.2\`. ([#125](https://github.com/Arbeidstilsynet/design/pull/125))

- Updated dependency \`typescript\` to \`5.2.15\`. ([#120](https://github.com/Arbeidstilsynet/design/pull/120))
`;

      setupTest(changelog);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      const content = result.content;
      expect(content).not.toBeNull();
      expect(content).toContain("@storybook/addon-docs` to `9.0.9`");
      expect(content).not.toContain("@storybook/addon-docs` to `9.0.8`");
      expect(content).toContain("typescript` to `5.10.2`");
      expect(content).not.toContain("typescript` to `5.2.15`");
    });

    it("preserves non-dependency entries and maintains order", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#117](https://github.com/Arbeidstilsynet/design/pull/117))

- Fixed a critical bug in component rendering ([#121](https://github.com/Arbeidstilsynet/design/pull/121))

- Added new prop to Button component ([#119](https://github.com/Arbeidstilsynet/design/pull/119))

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Improved accessibility for screen readers ([#125](https://github.com/Arbeidstilsynet/design/pull/125))
`;

      setupTest(changelog);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      const content = result.content;
      expect(content).not.toBeNull();
      expect(content).toContain("Fixed a critical bug in component rendering");
      expect(content).toContain("Added new prop to Button component");
      expect(content).toContain("Improved accessibility for screen readers");
      expect(content).toContain("@types/react` to `19.1.8`");
      expect(content).not.toContain("@types/react` to `19.1.7`");

      const lines = content!
        .split("\n")
        .filter((line) => line.startsWith("- "));
      expect(lines[0]).toContain("Fixed a critical bug in component rendering");
      expect(lines[1]).toContain("Added new prop to Button component");
      expect(lines[2]).toContain("@types/react` to `19.1.8`");
      expect(lines[3]).toContain("Improved accessibility for screen readers");
    });

    it("handles mixed change types (major/minor/patch)", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 1.2.3

Released: 2025-06-13

### Major Changes

- Breaking change to API ([#200](https://github.com/Arbeidstilsynet/design/pull/200))

### Minor Changes

- Added new feature ([#199](https://github.com/Arbeidstilsynet/design/pull/199))

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Bug fix for something ([#198](https://github.com/Arbeidstilsynet/design/pull/198))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))
`;

      setupTest(changelog);
      const result = runDedupe(pkg);

      expect(result.error).toBe(false);
      const writtenContent = writeFileSyncSpy.mock.calls[0]![1];
      expect(writtenContent).toContain("### Major Changes");
      expect(writtenContent).toContain("Breaking change to API");
      expect(writtenContent).toContain("### Minor Changes");
      expect(writtenContent).toContain("Added new feature");
      expect(writtenContent).toContain("### Patch Changes");
      expect(writtenContent).toContain("Bug fix for something");
      expect(writtenContent).toContain("@types/react` to `19.1.8`");
      expect(writtenContent).not.toContain("@types/react` to `19.1.7`");
    });

    it("only affects the latest version section", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

## 0.0.16

Released: 2025-06-10

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Updated dependency \`@types/react\` to \`19.1.6\`. ([#110](https://github.com/Arbeidstilsynet/design/pull/110))
`;

      setupTest(changelog);
      const result = runDedupe(pkg);

      expect(result.error).toBe(false);
      const writtenContent = writeFileSyncSpy.mock.calls[0]![1];

      const v17Section = writtenContent.substring(
        writtenContent.indexOf("## 0.0.17"),
        writtenContent.indexOf("## 0.0.16"),
      );
      expect(v17Section).toContain("@types/react` to `19.1.8`");
      expect(v17Section).not.toContain("@types/react` to `19.1.7`");

      const v16Section = writtenContent.substring(
        writtenContent.indexOf("## 0.0.16"),
      );
      expect(v16Section).toContain("@types/react` to `19.1.7`");
      expect(v16Section).toContain("@types/react` to `19.1.6`");
    });

    it("does nothing when no duplicates exist", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/node\` to \`22.15.31\`. ([#118](https://github.com/Arbeidstilsynet/design/pull/118))
`;

      setupTest(changelog);
      const result = runDedupe(pkg);

      expect(result.error).toBe(false);
      expect(result.content).toBeNull();
      expect(writeFileSyncSpy).not.toHaveBeenCalled();
    });

    it("handles versions with no changes (fixed changesets)", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

## 0.0.16

Released: 2025-06-10

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))
`;

      setupTest(changelog);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(true);
      expect(result.content).toBeNull();
    });

    it("is idempotent - running multiple times produces same result", () => {
      const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))
`;

      setupTest(changelog);

      const result1 = runDedupe(pkg);
      expect(result1.error).toBe(false);
      expect(result1.content).not.toBeNull();
      const firstResult = writeFileSyncSpy.mock.calls[0]![1];

      writeFileSyncSpy.mockClear();
      readFileSyncSpy.mockImplementation((p) => {
        if (p === changelogPath) return firstResult;
        return "";
      });

      const result2 = runDedupe(pkg);
      expect(result2.error).toBe(false);
      expect(result2.content).toBeNull();
      expect(writeFileSyncSpy).not.toHaveBeenCalled();
    });

    it("handles edge cases: missing file and no version sections", () => {
      existsSyncSpy.mockReturnValue(false);
      const result1 = runDedupe(pkg);

      expect(result1.error).toBe(true);
      expect(result1.content).toBeNull();
      expect(writeFileSyncSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("No file CHANGELOG.md found"),
      );

      const emptyChangelog = `# @arbeidstilsynet/design-react\n\nNo versions yet.\n`;
      setupTest(emptyChangelog);
      const result2 = runDedupe(pkg);

      expect(result2.error).toBe(true);
      expect(result2.content).toBeNull();
      expect(writeFileSyncSpy).not.toHaveBeenCalled();
    });

    it("produces exact expected output for complex scenario", () => {
      const input = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Fix exports for RSC client boundary ([#242](https://github.com/Arbeidstilsynet/design/pull/242))

- Updated dependency \`@types/react\` to \`19.1.6\`. ([#116](https://github.com/Arbeidstilsynet/design/pull/116))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#117](https://github.com/Arbeidstilsynet/design/pull/117))

- Updated dependency \`@storybook/addon-docs\` to \`9.0.9\`. ([#124](https://github.com/Arbeidstilsynet/design/pull/124))
  Updated dependency \`@storybook/react-vite\` to \`9.0.9\`.
  Updated dependency \`eslint-plugin-storybook\` to \`9.0.9\`.
  Updated dependency \`storybook\` to \`9.0.9\`.

- Updated dependency \`@storybook/addon-docs\` to \`9.0.8\`. ([#120](https://github.com/Arbeidstilsynet/design/pull/120))
  Updated dependency \`@storybook/react-vite\` to \`9.0.8\`.
  Updated dependency \`eslint-plugin-storybook\` to \`9.0.8\`.
  Updated dependency \`storybook\` to \`9.0.8\`.

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Fix exports for RSC client boundary ([#243](https://github.com/Arbeidstilsynet/design/pull/243))

## 0.0.16

Released: 2025-06-10

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Updated dependency \`@types/node\` to \`22.15.31\`. ([#118](https://github.com/Arbeidstilsynet/design/pull/118))

## 0.0.15

Released: 2025-06-10

### Minor Changes

- Updated dependency \`@types/react\` to \`19.1.0\`. ([#114](https://github.com/Arbeidstilsynet/design/pull/114))
`;

      const expectedOutput = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Fix exports for RSC client boundary ([#242](https://github.com/Arbeidstilsynet/design/pull/242))

- Updated dependency \`@storybook/addon-docs\` to \`9.0.9\`. ([#124](https://github.com/Arbeidstilsynet/design/pull/124))
  Updated dependency \`@storybook/react-vite\` to \`9.0.9\`.
  Updated dependency \`eslint-plugin-storybook\` to \`9.0.9\`.
  Updated dependency \`storybook\` to \`9.0.9\`.

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Fix exports for RSC client boundary ([#243](https://github.com/Arbeidstilsynet/design/pull/243))

## 0.0.16

Released: 2025-06-10

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Updated dependency \`@types/node\` to \`22.15.31\`. ([#118](https://github.com/Arbeidstilsynet/design/pull/118))

## 0.0.15

Released: 2025-06-10

### Minor Changes

- Updated dependency \`@types/react\` to \`19.1.0\`. ([#114](https://github.com/Arbeidstilsynet/design/pull/114))
`;

      setupTest(input);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      expect(result.content).toBe(expectedOutput);
    });

    it("groups entries by sorted package signature regardless of dependency order", () => {
      const input = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`zebra-package\` to \`3.0.0\`. ([#100](https://github.com/Arbeidstilsynet/design/pull/100))
  Updated dependency \`middle-package\` to \`3.0.0\`.
  Updated dependency \`alpha-package\` to \`3.0.0\`.

- Updated dependency \`alpha-package\` to \`2.0.0\`. ([#101](https://github.com/Arbeidstilsynet/design/pull/101))
  Updated dependency \`zebra-package\` to \`2.0.0\`.
  Updated dependency \`middle-package\` to \`2.0.0\`.

- Updated dependency \`middle-package\` to \`1.0.0\`. ([#102](https://github.com/Arbeidstilsynet/design/pull/102))
  Updated dependency \`alpha-package\` to \`1.0.0\`.
  Updated dependency \`zebra-package\` to \`1.0.0\`.
`;

      const expectedOutput = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`zebra-package\` to \`3.0.0\`. ([#100](https://github.com/Arbeidstilsynet/design/pull/100))
  Updated dependency \`middle-package\` to \`3.0.0\`.
  Updated dependency \`alpha-package\` to \`3.0.0\`.

`;

      setupTest(input);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      expect(result.content).toBe(expectedOutput);
    });

    it("handles version range specifiers correctly when determining duplicates", () => {
      const input = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`example-package\` to \`^14.4.0\`. ([#100](https://github.com/Arbeidstilsynet/design/pull/100))

- Updated dependency \`example-package\` to \`^15.0.0\`. ([#101](https://github.com/Arbeidstilsynet/design/pull/101))

`;

      const expectedOutput = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`example-package\` to \`^15.0.0\`. ([#101](https://github.com/Arbeidstilsynet/design/pull/101))

`;

      setupTest(input);
      const result = dedupeChangelog(pkg);

      expect(result.error).toBe(false);
      expect(result.content).toBe(expectedOutput);
    });
  });

  // --- Combined: add-date then dedupe ---

  describe("combined postprocess (add-date then dedupe)", () => {
    it("dedupe parser tolerates the inserted Released: line", () => {
      // Simulate what happens when changeset version generates a changelog
      // WITHOUT a Released: line, then add-date inserts one, then dedupe runs
      const changelogBeforeDate = `# @arbeidstilsynet/design-react

## 0.0.17

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))
`;

      setupTest(changelogBeforeDate);

      // First, add-date runs and writes a file
      addDateToChangelog(pkg);
      const today = getToday();
      const writtenAfterDate = writeFileSyncSpy.mock.calls[0]![1] as string;
      expect(writtenAfterDate).toContain(`Released: ${today}`);

      // Now simulate dedupe reading the date-annotated changelog
      writeFileSyncSpy.mockClear();
      readFileSyncSpy.mockImplementation((p) => {
        if (p === changelogPath) return writtenAfterDate;
        return "";
      });

      const result = dedupeChangelog(pkg);

      // The dedupe should work correctly on the date-annotated changelog
      // The version heading regex should match "## 0.0.17" (no date suffix on that line)
      expect(result.error).toBe(false);
      expect(result.content).not.toBeNull();
      expect(result.content).toContain("@types/react` to `19.1.8`");
      expect(result.content).not.toContain("@types/react` to `19.1.7`");
      expect(result.content).toContain(`Released: ${today}`);
    });
  });
});
