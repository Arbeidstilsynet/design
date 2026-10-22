// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/tabs/tabs.chromatic.tsx

import { Tabs } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as TabsStories from "./Tabs.stories";

const meta = preview.meta({
  title: "Chromatic/Tabs",
  component: Tabs,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(TabsStories));
