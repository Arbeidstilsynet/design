import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme/arbeidstilsynet.css";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/react-vite";
import type { ViewportMap } from "storybook/viewport";
import "../utils/add-displaynames";
import { customStylesDecorator } from "../utils/customStylesDecorator";
import { chromaticModes } from "./modes";
import "./preview.css";

const atViewPorts: ViewportMap = {
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

export default definePreview({
  addons: [addonA11y(), addonDocs()],
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
      // Must be self-contained plain JS: Storybook serializes this function.
      storySort: (a, b) => {
        const rootOrder = [
          "Overview",
          "Usage",
          "Colors",
          "Icons",
          "Composition",
          "Overrides",
          "Showcase",
          "Changelog",
          "Arbeidstilsynet",
          "designsystemet.no",
          "designsystemet.no utilities",
        ];
        const docsOrder = ["Overview", "Code", "Accessibility"];

        if (a.title === b.title) {
          const rankA =
            a.type === "docs" && docsOrder.includes(a.name)
              ? docsOrder.indexOf(a.name)
              : docsOrder.length;
          const rankB =
            b.type === "docs" && docsOrder.includes(b.name)
              ? docsOrder.indexOf(b.name)
              : docsOrder.length;
          return rankA - rankB;
        }

        const partsA = a.title.split("/").map((part) => part.trim());
        const partsB = b.title.split("/").map((part) => part.trim());
        for (
          let depth = 0;
          depth < Math.max(partsA.length, partsB.length);
          depth++
        ) {
          const nameA = partsA[depth];
          const nameB = partsB[depth];
          if (nameA === undefined) return -1;
          if (nameB === undefined) return 1;
          if (nameA === nameB) continue;
          if (depth === 0) {
            const indexA = rootOrder.indexOf(nameA);
            const indexB = rootOrder.indexOf(nameB);
            if (indexA !== -1 || indexB !== -1) {
              return (
                (indexA === -1 ? rootOrder.length : indexA) -
                (indexB === -1 ? rootOrder.length : indexB)
              );
            }
          }
          return nameA.localeCompare(nameB, undefined, {
            numeric: true,
            sensitivity: "accent",
          });
        }
        return 0;
      },
    },
    docs: {
      codePanel: true,
      toc: {
        headingSelector: "h2, h3",
        ignoreSelector: ".docs-story *, .skip-toc, .sbdocs-subtitle",
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
      // vitest.upstream.config.ts runs upstream stories' plays without axe.
      test: import.meta.env.STORYBOOK_SKIP_A11Y === "true" ? "off" : "error",
    },
    chromatic: {
      // make snapshots opt-in per file/story
      disableSnapshot: true,
      modes: chromaticModes,
    },
  },
  decorators: [customStylesDecorator],
  tags: ["autodocs"],
});
