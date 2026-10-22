// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/tag/tag.chromatic.tsx

import { Tag } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as TagStories from "./Tag.stories";

const meta = preview.meta({
  title: "Chromatic/Tag",
  component: Tag,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(TagStories));
