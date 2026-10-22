// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/label/label.chromatic.tsx

import { Label } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as LabelStories from "./Label.stories";

const meta = preview.meta({
  title: "Chromatic/Label",
  component: Label,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(LabelStories));
