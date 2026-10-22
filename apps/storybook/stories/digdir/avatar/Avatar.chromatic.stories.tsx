// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/avatar/avatar.chromatic.tsx

import { Avatar } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as AvatarStories from "./Avatar.stories";

const meta = preview.meta({
  title: "Chromatic/Avatar",
  component: Avatar,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(AvatarStories));
