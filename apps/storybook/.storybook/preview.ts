import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme/arbeidstilsynet.css";
import type { Preview } from "@storybook/react-vite";
import { customStylesDecorator } from "../utils/customStylesDecorator";
import "./preview.css";

const atViewPorts = {
  atSingle: {
    name: "AT single 150px",
    styles: {
      height: "200px",
      width: "150px",
    },
    type: "mobile",
  },
  atmobile: {
    name: "AT mobil 400px",
    styles: {
      height: "800px",
      width: `400px`,
    },
    type: "mobile",
  },
  attablet: {
    name: "AT tablet 1100px",
    styles: {
      height: "896px",
      width: `1100px`,
    },
    type: "tablet",
  },
  atdesktop: {
    name: "AT desktop 1600px",
    styles: {
      height: "1000px",
      width: `1600px`,
    },
    type: "desktop",
  },
  atbigscreen: {
    name: "AT bigscreen 3000px",
    styles: {
      height: "1000px",
      width: 3000 + "px",
    },
    type: "desktop",
  }
}

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
    viewport: {
      options: {
        ...atViewPorts,
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
