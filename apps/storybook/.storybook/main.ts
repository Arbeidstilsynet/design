import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const storybookConfigFile = fileURLToPath(import.meta.url);
const storybookConfigDir = dirname(storybookConfigFile);

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
      // Don't append `Component.displayName`: it would clobber the dotted
      // displayNames set in utils/add-displaynames.ts that "Show code" reads
      // first. `__docgenInfo.displayName` still names components without one.
      setDisplayName: false,
    },
  },
  async viteFinal(viteConfig) {
    // Alias @arbeidstilsynet/design-react to the Storybook-only wrapper barrel
    // (for HMR and so upstream Digdir components get docgen via local wrappers).
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      // oxlint-disable-next-line typescript/no-misused-spread
      ...viteConfig.resolve.alias,
      "@arbeidstilsynet/design-react": resolve(
        storybookConfigDir,
        "../docgen-wrappers/index.tsx",
      ),
    };

    return viteConfig;
  },
};
export default config;
