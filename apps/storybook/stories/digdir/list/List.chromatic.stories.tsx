// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/list/list.chromatic.tsx

import { List } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ListStories from "./List.stories";

const meta = preview.meta({
  title: "Chromatic/List",
  component: List.Unordered,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(ListStories));
