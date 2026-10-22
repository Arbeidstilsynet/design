// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/alert/alert.chromatic.tsx

import { Alert } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as AlertStories from "./Alert.stories";

const meta = preview.meta({
  title: "Chromatic/Alert",
  component: Alert,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(AlertStories));
