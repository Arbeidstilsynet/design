import { defineConfig } from "vitest/config";
import { browserProject } from "./vitest.config";

// Runs the play functions of the adapted copies in stories/digdir*/**, which
// the default config excludes. a11y is off: upstream example markup has known
// violations, tracked separately. Used by the sync-designsystemet skill.
export default defineConfig({
  test: {
    projects: [
      browserProject({
        name: "upstream",
        colorScheme: "light",
        skipA11y: true,
        // The Storybook plugin ignores test.include; select by exclusion.
        exclude: [
          "./stories/!(digdir|digdir-overrides)/**",
          "./stories/*.*",
          "../../packages/**",
        ],
      }),
    ],
  },
});
