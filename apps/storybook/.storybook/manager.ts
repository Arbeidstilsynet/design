import { addons, types } from "storybook/manager-api";
import { GitHubLink } from "./addon-github-link";

const ADDON_ID = "github-link";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOLEXTRA,
    title: "GitHub Repository",
    render: GitHubLink,
  });
});
