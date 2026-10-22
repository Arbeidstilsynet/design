// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/divider/divider.chromatic.tsx

import { Divider } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as DividerStories from "./Divider.stories";

const meta = preview.meta({
  title: "Chromatic/Divider",
  component: Divider,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(DividerStories));
