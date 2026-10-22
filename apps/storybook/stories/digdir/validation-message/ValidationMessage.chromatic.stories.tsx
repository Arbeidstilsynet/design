// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/validation-message/validation-message.chromatic.tsx

import { ValidationMessage } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as ValidationMessageStories from "./ValidationMessage.stories";

const meta = preview.meta({
  title: "Chromatic/ValidationMessage",
  component: ValidationMessage,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(
  createSingleStory(ValidationMessageStories),
);
