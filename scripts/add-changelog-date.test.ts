import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  MockInstance,
  vi,
} from "vitest";
import { addDateToChangelog, getChangedVersion } from "./add-changelog-date";

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

describe("add-changelog-date", () => {
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

  it("adds date to latest version heading if not present", () => {
    const changelog = `# pkg\n\n## 1.2.3\n\nSome changes\n`;
    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

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
    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

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
    existsSyncSpy.mockImplementation((p) => p === changelogPath);
    readFileSyncSpy.mockImplementation((p) => {
      if (p === changelogPath) return changelog;
      return "";
    });

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
          p.replace(/\\/g, "/").endsWith("/react/package.json")
        ) {
          return JSON.stringify({ version: "1.2.3" });
        }
        return "";
      });
      expect(getChangedVersion(pkg)).toBe(false);
    });
  });
});
