// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/skip-link/skip-link.chromatic.tsx

import { SkipLink } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SkipLinkStories from "./SkipLink.stories";

const meta = preview.meta({
  title: "Chromatic/SkipLink",
  component: SkipLink,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SkipLinkStories));
