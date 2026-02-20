import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname === "undefined"
    ? path.dirname(fileURLToPath(import.meta.url))
    : __dirname;

const colorSchemes = ["light", "dark"] as const;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: colorSchemes.map((colorScheme) => ({
      extends: true,
      // Use define for compile-time replacement — guaranteed to work in browser mode
      define: {
        "process.env.STORYBOOK_COLOR_SCHEME": JSON.stringify(colorScheme),
      },
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, ".storybook"),
        }),
      ],
      test: {
        name: `storybook-${colorScheme}`,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [
            {
              browser: "chromium",
            },
          ],
        },
        setupFiles: [".storybook/vitest.setup.ts"],
        exclude: [
          "./stories/digdir/**",
          // a11y errors in digdir-overrides should be fixed later and this exclude removed
          "./stories/digdir-overrides/**",
          "./stories/Showcase/**",
        ],
      },
    })),
  },
});
