import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: true,
    },
  },
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/react/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/react/src/components/**/*.mdx",
  ],
  staticDirs: ["../stories/assets"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      EXPERIMENTAL_useWatchProgram: true,
      include: ["**/*.tsx", "../../packages/react/src/**/*.tsx"],
    },
  },
  async viteFinal(viteConfig) {
    // use alias to resolve @arbeidstilsynet/design-react to the local package for HMR support
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      // oxlint-disable-next-line typescript/no-misused-spread
      ...viteConfig.resolve.alias,
      "@arbeidstilsynet/design-react": resolve(
        __dirname,
        "../../../packages/react/src/index.ts",
      ),
    };

    return viteConfig;
  },
};
export default config;
