import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { dedupeChangelog, runDedupe } from "./dedupe-changelog";

describe("dedupe-changelog", () => {
  let readFileSyncSpy: MockInstance;
  let writeFileSyncSpy: MockInstance;
  let existsSyncSpy: MockInstance;
  let consoleWarnSpy: MockInstance;

  const packagesDir = path.resolve(process.cwd(), "packages");
  const pkg = "react";
  const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");

  beforeEach(() => {
    readFileSyncSpy = vi.spyOn(fs, "readFileSync") as MockInstance;
    writeFileSyncSpy = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {}) as MockInstance;
    existsSyncSpy = vi.spyOn(fs, "existsSync") as MockInstance;
    consoleWarnSpy = vi
      .spyOn(console, "warn")
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

    // Should keep newer version and non-duplicate entries
    expect(content).toContain("@types/react` to `19.1.8`");
    expect(content).not.toContain("@types/react` to `19.1.7`");
    expect(content).toContain("@types/node` to `22.15.31`");

    // Should not affect older versions
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

    // Should keep newer storybook versions (9.0.9)
    expect(content).toContain("@storybook/addon-docs` to `9.0.9`");
    expect(content).not.toContain("@storybook/addon-docs` to `9.0.8`");

    // Should handle version comparison correctly (5.10.2 > 5.2.15)
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

    // Should preserve all non-dependency entries
    expect(content).toContain("Fixed a critical bug in component rendering");
    expect(content).toContain("Added new prop to Button component");
    expect(content).toContain("Improved accessibility for screen readers");

    // Should keep newer dependency version
    expect(content).toContain("@types/react` to `19.1.8`");
    expect(content).not.toContain("@types/react` to `19.1.7`");

    // Should maintain relative order of non-dependency entries
    const lines = content!.split("\n").filter((line) => line.startsWith("- "));
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

    // Should preserve all change types and their content
    expect(writtenContent).toContain("### Major Changes");
    expect(writtenContent).toContain("Breaking change to API");
    expect(writtenContent).toContain("### Minor Changes");
    expect(writtenContent).toContain("Added new feature");
    expect(writtenContent).toContain("### Patch Changes");
    expect(writtenContent).toContain("Bug fix for something");

    // Should only deduplicate dependencies
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

    // Should deduplicate in latest version (0.0.17)
    const v17Section = writtenContent.substring(
      writtenContent.indexOf("## 0.0.17"),
      writtenContent.indexOf("## 0.0.16"),
    );
    expect(v17Section).toContain("@types/react` to `19.1.8`");
    expect(v17Section).not.toContain("@types/react` to `19.1.7`");

    // Should not affect older version (0.0.16) - should keep duplicates there
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

    // Should handle gracefully - no changes section means nothing to dedupe
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

    // First run
    const result1 = runDedupe(pkg);
    expect(result1.error).toBe(false);
    expect(result1.content).not.toBeNull();
    const firstResult = writeFileSyncSpy.mock.calls[0]![1];

    // Second run with the result of the first run
    writeFileSyncSpy.mockClear();
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return firstResult;
      return "";
    });

    const result2 = runDedupe(pkg);
    expect(result2.error).toBe(false);
    expect(result2.content).toBeNull(); // No changes needed
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
  });

  it("handles edge cases: missing file and no version sections", () => {
    // Missing file
    existsSyncSpy.mockReturnValue(false);
    const result1 = runDedupe(pkg);

    expect(result1.error).toBe(true);
    expect(result1.content).toBeNull();
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("No file CHANGELOG.md found"),
    );

    // No version sections
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
    // If sorting doesn't work, these won't be grouped together
    // Entry 1: zebra, middle, alpha (reverse alphabetical)
    // Entry 2: alpha, zebra, middle (different order)
    // Entry 3: middle, alpha, zebra (different order)
    // Without sorting: 3 different signatures, no deduplication
    // With sorting: all become "alpha,middle,zebra", proper deduplication
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

    // Expected: only the newest entry (3.0.0) should remain
    // If sorting fails, all three entries will remain (different signatures)
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
