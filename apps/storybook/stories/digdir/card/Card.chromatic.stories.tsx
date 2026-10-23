// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/card/card.chromatic.tsx

import { Card } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as CardStories from "./Card.stories";

const meta = preview.meta({
  title: "Chromatic/Card",
  component: Card,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

/* Visual-only Chromatic story.
  Verifies rendering of nested card with link for visual
  regression snapshots. This story is intentionally kept out of the main
  `card.stories`
*/
export const Cardception = meta.story({
  render: () => (
    <Card>
      <Card>
        <h2>
          <a href="#">Nested Card Link</a>
        </h2>
      </Card>
    </Card>
  ),
});

export const Snapshots = meta.story(
  createSingleStory({ ...CardStories, Cardception }),
);
