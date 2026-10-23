import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import type { Globals } from "storybook/internal/types";
import { addons, types } from "storybook/manager-api";
import { GitHubLink } from "./addon-github-link";
import { darkColorSchemeQuery, getTheme } from "./theme";

const ADDON_ID = "github-link";
const COLOR_SCHEME_ADDON_ID = "color-scheme";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOLEXTRA,
    title: "GitHub Repository",
    render: GitHubLink,
  });
});

// Read the initial color scheme from the URL (`?globals=colorScheme:dark`) so
// the manager doesn't flash the wrong theme before the preview reports globals.
const initialColorScheme = new URLSearchParams(window.location.search)
  .get("globals")
  ?.match(/(?:^|;)colorScheme:(\w+)/)?.[1];

addons.register(COLOR_SCHEME_ADDON_ID, (api) => {
  let colorScheme: unknown = initialColorScheme;
  const applyTheme = () => api.setOptions({ theme: getTheme(colorScheme) });
  const onGlobals = ({ globals }: { globals: Globals }) => {
    colorScheme = globals.colorScheme;
    applyTheme();
  };

  api.on(SET_GLOBALS, onGlobals);
  api.on(GLOBALS_UPDATED, onGlobals);
  window
    .matchMedia(darkColorSchemeQuery)
    .addEventListener("change", applyTheme);
});

addons.setConfig({
  theme: getTheme(initialColorScheme),
});
