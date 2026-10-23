// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/chip/chip.chromatic.tsx

import { Chip } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ChipStories from "./Chip.stories";

const meta = preview.meta({
  title: "Chromatic/Chip",
  component: Chip.Radio,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(ChipStories));
