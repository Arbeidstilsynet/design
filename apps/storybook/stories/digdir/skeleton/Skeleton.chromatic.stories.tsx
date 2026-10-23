// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/skeleton/skeleton.chromatic.tsx

import { Skeleton } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SkeletonStories from "./Skeleton.stories";

const meta = preview.meta({
  title: "Chromatic/Skeleton",
  component: Skeleton,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SkeletonStories));
