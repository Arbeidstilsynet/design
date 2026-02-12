import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme/arbeidstilsynet.css";
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import "../utils/add-displaynames";
import { customStylesDecorator } from "../utils/customStylesDecorator";
import "./preview.css";

const atViewPorts = {
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
      width: `3000px`,
    },
    type: "desktop",
  },
};

const preview: Preview = {
  initialGlobals: {
    colorScheme: "auto",
  },
  globalTypes: {
    colorScheme: {
      description: "Set color-scheme in stories",
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
          "Colors",
          "Icons",
          "Composition",
          "Showcase",
          "Changelog",
          "Arbeidstilsynet",
          "designsystemet.no",
          "designsystemet.no utilities",
        ],
      },
    },
    docs: {
      codePanel: true,
      toc: {
        headingSelector: "h2, h3",
      },
      // customize autodocs template to sort required props first in the props table
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls sort="requiredFirst" />
          <Stories />
        </>
      ),
    },
    a11y: {
      test: "error",
    },
  },
  decorators: [customStylesDecorator],
  tags: ["autodocs"],
};

export default preview;
