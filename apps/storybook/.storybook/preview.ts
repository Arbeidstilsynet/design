import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme/arbeidstilsynet.css";
import type { Preview } from "@storybook/react";
import { customStylesDecorator } from "../utils/customStylesDecorator";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
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
