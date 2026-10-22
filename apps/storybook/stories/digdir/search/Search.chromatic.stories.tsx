// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/search/search.chromatic.tsx

import { Search } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SearchStories from "./Search.stories";

const meta = preview.meta({
  title: "Chromatic/Search",
  component: Search,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SearchStories));
