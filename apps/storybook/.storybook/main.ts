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
      // Don't let the docgen plugin append `Component.displayName = "<name>"`
      // after the module: that clobbers the dotted displayNames we set on
      // compound sub-components (e.g. `Table.Head`, `FilePicker.Files`), which
      // Storybook's "Show code" reads first. `__docgenInfo.displayName` still
      // provides the name for components without a runtime displayName.
      setDisplayName: false,
    },
  },
  async viteFinal(viteConfig) {
    // use alias to resolve @arbeidstilsynet/design-react to a Storybook-only
    // barrel for HMR support and so upstream (Digdir) components get docgen via
    // local wrappers.
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
