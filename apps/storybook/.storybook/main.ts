import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/react/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  staticDirs: ["../stories/assets"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  // use alias to resolve @arbeidstilsynet/design-react to the local package for HMR support
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@arbeidstilsynet/design-react": path.resolve(
        __dirname,
        "../../../packages/react/src/index.ts",
      ),
    };
    return config;
  },
};
export default config;
