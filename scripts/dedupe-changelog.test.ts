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
  let consoleLogSpy: MockInstance;

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
    consoleLogSpy = vi
      .spyOn(console, "log")
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

  it("preserves markdown formatting and structure", () => {
    const changelog = `# @arbeidstilsynet/design-react

## 0.0.17

Released: 2025-06-13

### Patch Changes

- Updated dependency \`@types/react\` to \`19.1.8\`. ([#123](https://github.com/Arbeidstilsynet/design/pull/123))

- Some other change that is not a dependency update

- Updated dependency \`@types/react\` to \`19.1.7\`. ([#115](https://github.com/Arbeidstilsynet/design/pull/115))

- Another non-dependency change
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

    // Should maintain proper markdown structure
    expect(writtenContent).toContain("### Patch Changes");
    expect(writtenContent).toContain("## 0.0.17");
    expect(writtenContent).toContain("Released: 2025-06-13");
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
});
