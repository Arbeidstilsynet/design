import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from "vitest";
import { dedupeChangelog } from "./dedupe-changelog";

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

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      changelogPath,
      expect.stringContaining("Updated dependency `@types/react` to `19.1.8`"),
      "utf8",
    );
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      changelogPath,
      expect.not.stringContaining(
        "Updated dependency `@types/react` to `19.1.7`",
      ),
      "utf8",
    );
    // Should keep non-duplicate entries
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      changelogPath,
      expect.stringContaining("Updated dependency `@types/node` to `22.15.31`"),
      "utf8",
    );
    // Should not affect older versions
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      changelogPath,
      expect.stringContaining("## 0.0.16"),
      "utf8",
    );
  });

  it("handles multi-line dependency entries with additional packages", () => {
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
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should keep the newer version (9.0.9)
    expect(writtenContent).toContain("@storybook/addon-docs` to `9.0.9`");
    expect(writtenContent).toContain("@storybook/react-vite` to `9.0.9`");

    // Should remove the older version (9.0.8)
    expect(writtenContent).not.toContain("@storybook/addon-docs` to `9.0.8`");
    expect(writtenContent).not.toContain("@storybook/react-vite` to `9.0.8`");
  });

  it("does nothing when no duplicates exist", () => {
    const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/node\` to \`22.15.31\`. ([#118](https://github.com/Arbeidstilsynet/design/pull/118))
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(false);
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
  });

  it("handles version comparison correctly", () => {
    const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`typescript\` to \`5.10.2\`. ([#125](https://github.com/Arbeidstilsynet/design/pull/125))

- Updated dependency \`typescript\` to \`5.2.15\`. ([#120](https://github.com/Arbeidstilsynet/design/pull/120))

- Updated dependency \`typescript\` to \`5.9.8\`. ([#122](https://github.com/Arbeidstilsynet/design/pull/122))
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should keep the highest version (5.10.2)
    expect(writtenContent).toContain("typescript` to `5.10.2`");

    // Should remove lower versions
    expect(writtenContent).not.toContain("typescript` to `5.2.15`");
    expect(writtenContent).not.toContain("typescript` to `5.9.8`");
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

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should deduplicate in latest version (0.0.17)
    const v17Section = writtenContent.substring(
      writtenContent.indexOf("## 0.0.17"),
      writtenContent.indexOf("## 0.0.16"),
    );
    expect(v17Section).toContain("@types/react` to `19.1.8`");
    expect(v17Section).not.toContain("@types/react` to `19.1.7`");

    // Should not affect older version (0.0.16)
    const v16Section = writtenContent.substring(
      writtenContent.indexOf("## 0.0.16"),
    );
    expect(v16Section).toContain("@types/react` to `19.1.7`");
    expect(v16Section).toContain("@types/react` to `19.1.6`");
  });

  it("preserves non-dependency entries", () => {
    const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Some other change that is not a dependency update ([#122](https://github.com/Arbeidstilsynet/design/pull/122))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Another non-dependency change ([#114](https://github.com/Arbeidstilsynet/design/pull/114))
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should preserve non-dependency entries
    expect(writtenContent).toContain(
      "Some other change that is not a dependency update",
    );
    expect(writtenContent).toContain("Another non-dependency change");

    // Should remove duplicate dependency entry
    expect(writtenContent).toContain("@types/react` to `19.1.8`");
    expect(writtenContent).not.toContain("@types/react` to `19.1.7`");

    // Should maintain proper markdown structure
    expect(writtenContent).toContain("### Patch Changes");
    expect(writtenContent).toContain("## 0.0.17");
    expect(writtenContent).toContain("Released: 2025-06-13");
  });

  it("handles mixed change types (patch/minor/major)", () => {
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

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should preserve all change types
    expect(writtenContent).toContain("### Major Changes");
    expect(writtenContent).toContain("Breaking change to API");
    expect(writtenContent).toContain("### Minor Changes");
    expect(writtenContent).toContain("Added new feature");
    expect(writtenContent).toContain("### Patch Changes");
    expect(writtenContent).toContain("Bug fix for something");

    // Should deduplicate only dependencies
    expect(writtenContent).toContain("@types/react` to `19.1.8`");
    expect(writtenContent).not.toContain("@types/react` to `19.1.7`");
  });

  it("handles missing changelog file", () => {
    existsSyncSpy.mockReturnValue(false);

    const result = dedupeChangelog(pkg);

    expect(result).toBe(false);
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("No CHANGELOG.md found"),
    );
  });

  it("handles changelog with no version sections", () => {
    const changelog = `# @arbeidstilsynet/design-react

No versions yet.
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(false);
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
  });

  it("is idempotent - running multiple times produces same result", () => {
    const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))
`;

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    // First run
    const result1 = dedupeChangelog(pkg);
    expect(result1).toBe(true);
    const firstResult = writeFileSyncSpy.mock.calls[0][1];

    // Second run with the result of the first run
    writeFileSyncSpy.mockClear();
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return firstResult;
      return "";
    });

    const result2 = dedupeChangelog(pkg);
    expect(result2).toBe(false); // No changes needed
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

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return input;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      changelogPath,
      expectedOutput,
      "utf8",
    );
  });

  it("does not affect unrelated entries between dependency updates", () => {
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

    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

    const result = dedupeChangelog(pkg);

    expect(result).toBe(true);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];

    // Should keep the newer dependency version
    expect(writtenContent).toContain("@types/react` to `19.1.8`");
    expect(writtenContent).not.toContain("@types/react` to `19.1.7`");

    // Should preserve all unrelated entries
    expect(writtenContent).toContain(
      "Fixed a critical bug in component rendering",
    );
    expect(writtenContent).toContain("Added new prop to Button component");
    expect(writtenContent).toContain(
      "Improved accessibility for screen readers",
    );

    // Should maintain order (non-dependency entries stay in their positions)
    const lines = writtenContent
      .split("\n")
      .filter((line) => line.startsWith("- "));
    expect(lines[0]).toContain("Fixed a critical bug in component rendering");
    expect(lines[1]).toContain("Added new prop to Button component");
    expect(lines[2]).toContain("@types/react` to `19.1.8`");
    expect(lines[3]).toContain("Improved accessibility for screen readers");
  });
});
