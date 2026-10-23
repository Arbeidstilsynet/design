// upstream: digdir/designsystemet@v1.23.0 packages/react/src/components/table/table.chromatic.tsx

import { Table } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";
import { createSingleStory } from "../../../utils/create-single-story";
import * as TableStories from "./Table.stories";

const meta = preview.meta({
  title: "Chromatic/Table",
  component: Table,
  tags: ["chromatic", "!autodocs"],
  parameters: {
    layout: "padded",
  },
});

export const Snapshots = meta.story(createSingleStory(TableStories));
