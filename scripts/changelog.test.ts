import { describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type { ModCompWithPackage } from "@changesets/types";
import { getInfo, getInfoFromPullRequest } from "@changesets/get-github-info";
import changelogFunctions, {
  linkifyIssueHints,
  parseSummary,
} from "./changelog";

vi.mock("@changesets/get-github-info", () => ({
  getInfo: vi.fn<typeof import("@changesets/get-github-info").getInfo>(),
  getInfoFromPullRequest:
    vi.fn<
      typeof import("@changesets/get-github-info").getInfoFromPullRequest
    >(),
}));

const repo = "Arbeidstilsynet/design";
const options = { repo };

describe("changelog", () => {
  describe("parseSummary", () => {
    it("extracts PR number from summary", () => {
      const result = parseSummary("pr: #42\nSome change description");
      expect(result.prFromSummary).toBe(42);
      expect(result.text).toBe("Some change description");
    });

    it("extracts PR with 'pull request:' prefix", () => {
      const result = parseSummary("pull request: 99\nDescription");
      expect(result.prFromSummary).toBe(99);
      expect(result.text).toBe("Description");
    });

    it("extracts commit from summary", () => {
      const result = parseSummary("commit: abc1234def\nSome change");
      expect(result.commitFromSummary).toBe("abc1234def");
      expect(result.text).toBe("Some change");
    });

    it("strips author/user lines", () => {
      const result = parseSummary(
        "author: @someuser\nuser: anotheruser\nActual change",
      );
      expect(result.text).toBe("Actual change");
    });

    it("extracts both PR and commit", () => {
      const result = parseSummary(
        "pr: #10\ncommit: deadbeef\nSome description",
      );
      expect(result.prFromSummary).toBe(10);
      expect(result.commitFromSummary).toBe("deadbeef");
      expect(result.text).toBe("Some description");
    });

    it("handles plain summary without directives", () => {
      const result = parseSummary("Just a simple change");
      expect(result.prFromSummary).toBeUndefined();
      expect(result.commitFromSummary).toBeUndefined();
      expect(result.text).toBe("Just a simple change");
    });
  });

  describe("linkifyIssueHints", () => {
    it("converts issue references in fix/see hints to links", () => {
      const result = linkifyIssueHints("Fixed something (fix #123)", repo);
      expect(result).toBe(
        `Fixed something (fix [#123](https://github.com/${repo}/issues/123))`,
      );
    });

    it("handles 'fixes' and 'see' prefixes", () => {
      expect(linkifyIssueHints("(fixes #42)", repo)).toBe(
        `(fixes [#42](https://github.com/${repo}/issues/42))`,
      );
      expect(linkifyIssueHints("(see #7)", repo)).toBe(
        `(see [#7](https://github.com/${repo}/issues/7))`,
      );
    });

    it("leaves non-matching issue references unchanged", () => {
      expect(linkifyIssueHints("Relates to #99", repo)).toBe("Relates to #99");
    });
  });

  describe("getReleaseLine", () => {
    it("formats a release line with PR link", async () => {
      (getInfoFromPullRequest as Mock).mockResolvedValue({
        links: {
          pull: "[#42](https://github.com/Arbeidstilsynet/design/pull/42)",
          commit: null,
          user: null,
        },
      });

      const result = await changelogFunctions.getReleaseLine(
        { id: "abc", summary: "pr: #42\nAdded new feature", releases: [] },
        "minor",
        options,
      );

      expect(result).toContain("- Added new feature");
      expect(result).toContain(
        "([#42](https://github.com/Arbeidstilsynet/design/pull/42))",
      );
    });

    it("formats a release line with commit link when no PR", async () => {
      (getInfo as Mock).mockResolvedValue({
        links: {
          commit:
            "[`abc1234`](https://github.com/Arbeidstilsynet/design/commit/abc1234)",
          pull: null,
          user: null,
        },
      });

      const result = await changelogFunctions.getReleaseLine(
        {
          id: "def",
          summary: "Fixed a bug",
          releases: [],
          commit: "abc1234full",
        },
        "patch",
        options,
      );

      expect(result).toContain("- Fixed a bug");
      expect(result).toContain(
        "[`abc1234`](https://github.com/Arbeidstilsynet/design/commit/abc1234)",
      );
    });

    it("uses PR link over commit link when both available", async () => {
      (getInfoFromPullRequest as Mock).mockResolvedValue({
        links: {
          pull: "[#10](https://github.com/Arbeidstilsynet/design/pull/10)",
          commit:
            "[`deadbee`](https://github.com/Arbeidstilsynet/design/commit/deadbeef)",
          user: null,
        },
      });

      const result = await changelogFunctions.getReleaseLine(
        {
          id: "ghi",
          summary: "pr: #10\ncommit: deadbeef\nSome change",
          releases: [],
        },
        "patch",
        options,
      );

      // PR link takes precedence
      expect(result).toContain("(");
      expect(result).not.toContain("(`deadbee`)");
    });

    it("overrides commit link from summary when PR is provided", async () => {
      (getInfoFromPullRequest as Mock).mockResolvedValue({
        links: {
          pull: "[#10](https://github.com/Arbeidstilsynet/design/pull/10)",
          commit: null,
          user: null,
        },
      });

      const result = await changelogFunctions.getReleaseLine(
        {
          id: "jkl",
          summary: "pr: #10\ncommit: cafebabe\nSome change",
          releases: [],
        },
        "patch",
        options,
      );

      expect(result).toContain(
        "([#10](https://github.com/Arbeidstilsynet/design/pull/10))",
      );
    });

    it("returns no suffix when no commit and no PR", async () => {
      const result = await changelogFunctions.getReleaseLine(
        { id: "mno", summary: "Some change", releases: [] },
        "patch",
        options,
      );

      expect(result).toBe("\n- Some change\n");
    });

    it("preserves multiline summaries with indentation", async () => {
      const result = await changelogFunctions.getReleaseLine(
        {
          id: "pqr",
          summary: "First line\nSecond line\nThird line",
          releases: [],
        },
        "patch",
        options,
      );

      expect(result).toContain("- First line");
      expect(result).toContain("  Second line");
      expect(result).toContain("  Third line");
    });

    it("linkifies issue hints in summary", async () => {
      const result = await changelogFunctions.getReleaseLine(
        {
          id: "stu",
          summary: "Fixed a crash (fix #456)",
          releases: [],
        },
        "patch",
        options,
      );

      expect(result).toContain(
        `(fix [#456](https://github.com/${repo}/issues/456))`,
      );
    });

    it("throws if options are missing repo", async () => {
      await expect(
        changelogFunctions.getReleaseLine(
          { id: "x", summary: "change", releases: [] },
          "patch",
          null,
        ),
      ).rejects.toThrow("Please provide a repo");
    });
  });

  describe("getDependencyReleaseLine", () => {
    it("returns empty string when no dependencies updated", async () => {
      const result = await changelogFunctions.getDependencyReleaseLine(
        [],
        [],
        options,
      );
      expect(result).toBe("");
    });

    it("formats dependency update lines with commit links", async () => {
      (getInfo as Mock).mockResolvedValue({
        links: {
          commit: "[`abc1234`](https://github.com/org/repo/commit/abc1234)",
          pull: null,
          user: null,
        },
      });

      const result = await changelogFunctions.getDependencyReleaseLine(
        [{ id: "cs1", summary: "bump", releases: [], commit: "abc1234" }],
        [
          {
            name: "@some/package",
            newVersion: "2.0.0",
            oldVersion: "1.0.0",
            type: "major",
            changesets: ["cs1"],
          } as ModCompWithPackage,
        ],
        options,
      );

      expect(result).toContain("Updated dependencies");
      expect(result).toContain("`abc1234`");
      expect(result).toContain("  - @some/package@2.0.0");
    });

    it("lists multiple updated dependencies", async () => {
      (getInfo as Mock).mockResolvedValue({
        links: {
          commit: "[`abc`](url)",
          pull: null,
          user: null,
        },
      });

      const result = await changelogFunctions.getDependencyReleaseLine(
        [{ id: "cs1", summary: "bump", releases: [], commit: "abc" }],
        [
          {
            name: "pkg-a",
            newVersion: "1.1.0",
            oldVersion: "1.0.0",
            type: "minor",
            changesets: ["cs1"],
          } as ModCompWithPackage,
          {
            name: "pkg-b",
            newVersion: "3.0.0",
            oldVersion: "2.0.0",
            type: "major",
            changesets: ["cs1"],
          } as ModCompWithPackage,
        ],
        options,
      );

      expect(result).toContain("  - pkg-a@1.1.0");
      expect(result).toContain("  - pkg-b@3.0.0");
    });

    it("skips changesets without a commit", async () => {
      (getInfo as Mock).mockClear();

      const result = await changelogFunctions.getDependencyReleaseLine(
        [{ id: "cs1", summary: "bump", releases: [] }],
        [
          {
            name: "pkg",
            newVersion: "1.0.1",
            oldVersion: "1.0.0",
            type: "patch",
            changesets: ["cs1"],
          } as ModCompWithPackage,
        ],
        options,
      );

      expect(result).toContain("Updated dependencies []:");
      expect(result).toContain("  - pkg@1.0.1");
      expect(getInfo).not.toHaveBeenCalled();
    });

    it("throws if options are missing repo", async () => {
      await expect(
        changelogFunctions.getDependencyReleaseLine([], [], null),
      ).rejects.toThrow("Please provide a repo");
    });
  });
});
