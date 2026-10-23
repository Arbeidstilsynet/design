// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/textfield/textfield.chromatic.tsx

import { Textfield } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as TextfieldStories from "./Textfield.stories";

const meta = preview.meta({
  title: "Chromatic/Textfield",
  component: Textfield,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(TextfieldStories));
