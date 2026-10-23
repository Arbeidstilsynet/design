// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/link/link.chromatic.tsx

import { Link } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as LinkStories from "./Link.stories";

const meta = preview.meta({
  title: "Chromatic/Link",
  component: Link,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(LinkStories));
