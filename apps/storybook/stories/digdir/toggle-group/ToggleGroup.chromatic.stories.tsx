// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/toggle-group/toggle-group.chromatic.tsx

import { ToggleGroup } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ToggleGroupStories from "./ToggleGroup.stories";

const meta = preview.meta({
  title: "Chromatic/ToggleGroup",
  component: ToggleGroup,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      /* 80vw since storybook has padding, and does not stop elements from overflowing the x-axis */
      <div style={{ maxWidth: "80vw" }}>
        <Story />
      </div>
    ),
  ],
});

export const Snapshots = meta.story(createSingleStory(ToggleGroupStories));
