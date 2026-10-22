// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/pagination/pagination.chromatic.tsx

import { Pagination } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as PaginationStories from "./Pagination.stories";

const meta = preview.meta({
  title: "Chromatic/Pagination",
  component: Pagination,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(PaginationStories));
