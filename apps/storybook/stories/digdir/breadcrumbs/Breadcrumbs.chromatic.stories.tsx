// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/breadcrumbs/breadcrumbs.chromatic.tsx

import { Breadcrumbs } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as BreadcrumbsStories from "./Breadcrumbs.stories";

const meta = preview.meta({
  title: "Chromatic/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(BreadcrumbsStories));
