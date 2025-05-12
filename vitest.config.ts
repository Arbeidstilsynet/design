import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: ["packages/*"],
    reporters: ["default", "junit"],
    outputFile: {
      junit: "test-report.xml",
    },
    coverage: {
      enabled: true,
      reporter: ["html", "json-summary", "json", "lcov"],
      reportOnFailure: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/dist/**",
        "**/*config.{mjs,ts,js}",
        "**/storybook/**",
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
