import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { planWrappers } from "./generate-docgen-wrappers";

const here = path.dirname(fileURLToPath(import.meta.url));
const generatedFile = path.join(here, "../docgen-wrappers/index.tsx");

describe("docgen wrappers", () => {
  it("wraps every re-exported Digdir component (regenerate with pnpm gen:docgen-wrappers if this fails)", async () => {
    const { components, namespaces } = await planWrappers();
    const generated = readFileSync(generatedFile, "utf8");

    const missing = [...components, ...namespaces]
      .map((wrapper) => wrapper.name)
      .filter(
        (name) =>
          !new RegExp(
            // Wrapped directly, or declared under a clean name and re-exported
            // under the original (e.g. EXPERIMENTAL_-prefixed) name.
            `export (?:function|const) ${name}\\b|export \\{ \\w+ as ${name} \\}`,
          ).test(generated),
      );

    expect(missing).toEqual([]);
  }, 10_000);
});
