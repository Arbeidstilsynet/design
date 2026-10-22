// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/button/button.chromatic.tsx

import { Button } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ButtonStories from "./Button.stories";

const meta = preview.meta({
  title: "Chromatic/Button",
  component: Button,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(ButtonStories));
