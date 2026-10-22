// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/switch/switch.chromatic.tsx

import { Switch } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SwitchStories from "./Switch.stories";

const meta = preview.meta({
  title: "Chromatic/Switch",
  component: Switch,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SwitchStories));
