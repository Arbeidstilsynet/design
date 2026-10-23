// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/textarea/textarea.chromatic.tsx

import { Textarea } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as TextareaStories from "./Textarea.stories";

const meta = preview.meta({
  title: "Chromatic/Textarea",
  component: Textarea,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(TextareaStories));
