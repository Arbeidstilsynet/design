import { addons, types } from "storybook/manager-api";
import { ColorSchemeSelect } from "./addon-color-scheme";
import { GitHubLink } from "./addon-github-link";
import { darkColorSchemeQuery, getTheme, readStoredColorScheme } from "./theme";

const GITHUB_ADDON_ID = "github-link";
const COLOR_SCHEME_ADDON_ID = "color-scheme";

addons.register(GITHUB_ADDON_ID, () => {
  addons.add(GITHUB_ADDON_ID, {
    type: types.TOOLEXTRA,
    title: "GitHub Repository",
    render: GitHubLink,
  });
});

addons.register(COLOR_SCHEME_ADDON_ID, (api) => {
  addons.add(COLOR_SCHEME_ADDON_ID, {
    type: types.TOOL,
    title: "Color scheme",
    render: ColorSchemeSelect,
  });

  // Follow the system setting when "auto" is chosen.
  window.matchMedia(darkColorSchemeQuery).addEventListener("change", () => {
    api.setOptions({ theme: getTheme(readStoredColorScheme()) });
  });
});

addons.setConfig({
  theme: getTheme(readStoredColorScheme()),
});
