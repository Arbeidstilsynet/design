// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/paragraph/paragraph.chromatic.tsx

import { Paragraph } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ParagraphStories from "./Paragraph.stories";

const meta = preview.meta({
  title: "Chromatic/Paragraph",
  component: Paragraph,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(ParagraphStories));
