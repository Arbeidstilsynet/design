import { setProjectAnnotations } from "@storybook/react-vite";
import preview from "./preview";

// Get color scheme from environment variable (set via vitest config)
const colorScheme = process.env.STORYBOOK_COLOR_SCHEME ?? "auto";

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([
  preview.composed,
  {
    // Override the default colorScheme global for testing
    initialGlobals: {
      colorScheme,
    },
  },
]);
