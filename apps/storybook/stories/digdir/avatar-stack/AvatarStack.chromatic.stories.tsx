// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/avatar-stack/avatar-stack.chromatic.tsx

import { EXPERIMENTAL_AvatarStack } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as AvatarStackStories from "./AvatarStack.stories";

const meta = preview.meta({
  title: "Chromatic/AvatarStack",
  component: EXPERIMENTAL_AvatarStack,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(AvatarStackStories));
