// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/heading/heading.chromatic.tsx

import { Heading } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as HeadingStories from "./Heading.stories";

const meta = preview.meta({
  title: "Chromatic/Heading",
  component: Heading,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(HeadingStories));
