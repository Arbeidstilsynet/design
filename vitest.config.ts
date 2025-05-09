import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: ["packages/*"],
    reporters: ["default", "json"],
    outputFile: {
      junit: "test-report.xml",
    },
    coverage: {
      reporter: ["html", "json-summary", "json", "lcov"],
      reportOnFailure: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/*config.{mjs,ts,js}",
        "**/.storybook/**",
        "**/*.stories.tsx",
      ],
    },
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
