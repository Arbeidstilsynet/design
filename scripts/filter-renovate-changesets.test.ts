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
import {
  filterRenovateChangesets,
  parseChangesetFile,
  shouldKeepChangeset,
} from "./filter-renovate-changesets";

describe("filter-renovate-changesets", () => {
  describe("parseChangesetFile", () => {
    it("parses affected packages and updated dependencies", () => {
      const content = `---
'@arbeidstilsynet/design-css': patch
'@arbeidstilsynet/design-react': patch
---

Updated dependency \`@digdir/designsystemet-css\` to \`1.11.1\`.
Updated dependency \`@digdir/designsystemet-react\` to \`1.11.1\`.
`;
      const result = parseChangesetFile(content);

      expect(result.affectedPackages).toEqual([
        "@arbeidstilsynet/design-css",
        "@arbeidstilsynet/design-react",
      ]);
      expect(result.updatedDependencies).toEqual([
        "@digdir/designsystemet-css",
        "@digdir/designsystemet-react",
      ]);
    });

    it("handles non-dependency changesets", () => {
      const content = `---
"@arbeidstilsynet/design-theme": minor
---

Updated 4 colors (3 accent-* + base-active)
`;
      const result = parseChangesetFile(content);

      expect(result.affectedPackages).toEqual([
        "@arbeidstilsynet/design-theme",
      ]);
      expect(result.updatedDependencies).toEqual([]);
    });

    it("returns empty arrays for invalid content", () => {
      expect(parseChangesetFile("")).toEqual({
        affectedPackages: [],
        updatedDependencies: [],
      });
      expect(parseChangesetFile("no frontmatter")).toEqual({
        affectedPackages: [],
        updatedDependencies: [],
      });
    });
  });

  describe("shouldKeepChangeset", () => {
    const mockPackageDeps = new Map([
      [
        "react",
        {
          dependencies: new Set(["@digdir/designsystemet-react", "clsx"]),
          peerDependencies: new Set(["react", "react-dom"]),
        },
      ],
      [
        "css",
        {
          dependencies: new Set(["@digdir/designsystemet-css"]),
          peerDependencies: new Set<string>(),
        },
      ],
      [
        "theme",
        {
          dependencies: new Set<string>(),
          peerDependencies: new Set<string>(),
        },
      ],
    ]);

    it("keeps changeset that updates production dependency", () => {
      expect(
        shouldKeepChangeset(
          ["@arbeidstilsynet/design-react"],
          ["@digdir/designsystemet-react"],
          mockPackageDeps,
        ),
      ).toBe(true);
    });

    it("keeps changeset that updates peer dependency", () => {
      expect(
        shouldKeepChangeset(
          ["@arbeidstilsynet/design-react"],
          ["react"],
          mockPackageDeps,
        ),
      ).toBe(true);
    });

    it("removes changeset that only updates devDependencies", () => {
      expect(
        shouldKeepChangeset(
          ["@arbeidstilsynet/design-react"],
          ["@types/react", "@storybook/addon-docs"],
          mockPackageDeps,
        ),
      ).toBe(false);
    });

    it("removes changeset that doesn't affect any published package", () => {
      expect(
        shouldKeepChangeset(
          ["@arbeidstilsynet/storybook"],
          ["storybook"],
          mockPackageDeps,
        ),
      ).toBe(false);
    });

    it("keeps non-dependency changesets", () => {
      expect(
        shouldKeepChangeset(
          ["@arbeidstilsynet/design-theme"],
          [],
          mockPackageDeps,
        ),
      ).toBe(true);
    });
  });

  describe("filterRenovateChangesets", () => {
    let readdirSyncSpy: MockInstance;
    let readFileSyncSpy: MockInstance;
    let existsSyncSpy: MockInstance;

    const changesetDir = path.join(process.cwd(), ".changeset");
    const packagesDir = path.join(process.cwd(), "packages");

    beforeEach(() => {
      readdirSyncSpy = vi.spyOn(fs, "readdirSync") as MockInstance;
      readFileSyncSpy = vi.spyOn(fs, "readFileSync") as MockInstance;
      existsSyncSpy = vi.spyOn(fs, "existsSync") as MockInstance;
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("filters renovate changesets correctly", () => {
      existsSyncSpy.mockImplementation((p: string) => {
        if (p === changesetDir) return true;
        if (p === path.join(packagesDir, "react", "package.json")) return true;
        if (p === path.join(packagesDir, "css", "package.json")) return true;
        return false;
      });

      readdirSyncSpy.mockReturnValue([
        "renovate-prod.md",
        "renovate-dev.md",
        "hungry-cloths-stay.md", // non-renovate, should be ignored
      ]);

      readFileSyncSpy.mockImplementation((p: string) => {
        if (p.endsWith("renovate-prod.md")) {
          return `---
'@arbeidstilsynet/design-react': patch
---

Updated dependency \`clsx\` to \`2.2.0\`.
`;
        }
        if (p.endsWith("renovate-dev.md")) {
          return `---
'@arbeidstilsynet/design-react': patch
---

Updated dependency \`@types/react\` to \`19.2.13\`.
`;
        }
        if (p.includes("react") && p.endsWith("package.json")) {
          return JSON.stringify({ dependencies: { clsx: "1.0.0" } });
        }
        if (p.includes("css") && p.endsWith("package.json")) {
          return JSON.stringify({ dependencies: {} });
        }
        return "";
      });

      const result = filterRenovateChangesets(changesetDir);

      expect(result.toKeep).toEqual(["renovate-prod.md"]);
      expect(result.toRemove).toEqual(["renovate-dev.md"]);
    });
  });
});
