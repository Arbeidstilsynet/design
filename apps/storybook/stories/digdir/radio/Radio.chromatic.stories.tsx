// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/radio/radio.chromatic.tsx

import { Radio } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as RadioStories from "./Radio.stories";

const meta = preview.meta({
  title: "Chromatic/Radio",
  component: Radio,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(RadioStories));
