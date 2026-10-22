// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/badge/badge.chromatic.tsx

import { Badge } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as BadgeStories from "./Badge.stories";

const meta = preview.meta({
  title: "Chromatic/Badge",
  component: Badge,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(BadgeStories));
