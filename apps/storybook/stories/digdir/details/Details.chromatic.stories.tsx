// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/details/details.chromatic.tsx

import { Details } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as DetailsStories from "./Details.stories";

const meta = preview.meta({
  title: "Chromatic/Details",
  component: Details,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(DetailsStories));
