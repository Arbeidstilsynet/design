import { defineMain } from "@storybook/react-vite/node";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import remarkGfm from "remark-gfm";

const storybookConfigFile = fileURLToPath(import.meta.url);
const storybookConfigDir = dirname(storybookConfigFile);

export default defineMain({
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
    {
      name: "@storybook/addon-docs",
      options: {
        // Upstream designsystemet.no MDX uses GitHub-flavoured tables.
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook",
  ],
  core: {
    disableTelemetry: true,
  },
  tags: (tagOptions, options) => ({
    ...tagOptions,
    // Combined snapshot stories are for Chromatic, not for readers: visible
    // in development, hidden from the published sidebar.
    chromatic: {
      excludeFromDocsStories: true,
      excludeFromSidebar: options.configType === "PRODUCTION",
      ...tagOptions?.chromatic,
    },
  }),
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
});
