// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/fieldset/fieldset.chromatic.tsx

import { Fieldset } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as FieldsetStories from "./Fieldset.stories";

const meta = preview.meta({
  title: "Chromatic/Fieldset",
  component: Fieldset,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(FieldsetStories));
