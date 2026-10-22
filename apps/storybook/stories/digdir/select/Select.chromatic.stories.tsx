// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/select/select.chromatic.tsx

import { Select } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SelectStories from "./Select.stories";

const meta = preview.meta({
  title: "Chromatic/Select",
  component: Select,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SelectStories));
