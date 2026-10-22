// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/checkbox/checkbox.chromatic.tsx

import { Checkbox } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as CheckboxStories from "./Checkbox.stories";

const meta = preview.meta({
  title: "Chromatic/Checkbox",
  component: Checkbox,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(CheckboxStories));
