import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    reporters: ["default", "json"],
    outputFile: ".vitest-results.json",
    coverage: {
      reporter: ["text", "lcov"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "*config.{mjs,ts,js}",
        ".storybook/**",
        "src/stories/**",
      ],
    },
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
