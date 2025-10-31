import { addons, types } from "storybook/manager-api";
import { create } from "storybook/theming";
import { GitHubLink } from "./addon-github-link";

const ADDON_ID = "github-link";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOLEXTRA,
    title: "GitHub Repository",
    render: GitHubLink,
  });
});

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Gnist, Arbeidstilsynet Design",
    brandUrl: "https://gnist.arbeidstilsynet.no/",
    brandImage:
      "https://at-static.arbeidstilsynet.no/logos/at-logo-horizontal.svg",
    appBg: "white",
  }),
});
