// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/field/field.chromatic.tsx

import { Field } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as FieldStories from "./Field.stories";

const meta = preview.meta({
  title: "Chromatic/Field",
  component: Field,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(FieldStories));
