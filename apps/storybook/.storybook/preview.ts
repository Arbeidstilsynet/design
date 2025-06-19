import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme/arbeidstilsynet.css";
import type { Preview } from "@storybook/react-vite";
import { customStylesDecorator } from "../utils/customStylesDecorator";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: "Set color-scheme in stories",
      defaultValue: "auto",
      toolbar: {
        title: "Color scheme",
        icon: "contrast",
        items: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Auto", value: "auto" },
        ],
      },
    },
  },
  parameters: {
    layout: "centered",
    controls: {
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Overview",
          "Usage",
          "Showcase",
          "Changelog",
          "Example",
          "Arbeidstilsynet",
          "designsystemet.no",
          "designsystemet.no utilities",
        ],
      },
    },
    docs: {
      toc: {
        headingSelector: "h2, h3",
      },
    },
  },
  decorators: [customStylesDecorator],
  tags: ["autodocs"],
};

export default preview;
