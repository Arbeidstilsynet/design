// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/spinner/spinner.chromatic.tsx

import { Spinner } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as SpinnerStories from "./Spinner.stories";

const meta = preview.meta({
  title: "Chromatic/Spinner",
  component: Spinner,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(SpinnerStories));
