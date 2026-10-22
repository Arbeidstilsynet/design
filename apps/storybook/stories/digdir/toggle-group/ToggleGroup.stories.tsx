// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/toggle-group/toggle-group.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/toggle-group/metadata.json

import {
  Button,
  Divider,
  Paragraph,
  ToggleGroup,
  Tooltip,
} from "@arbeidstilsynet/design-react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArchiveIcon,
  DocPencilIcon,
  EnvelopeClosedIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/ToggleGroup",
  component: ToggleGroup,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "ToggleGroup.Item": ToggleGroup.Item,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Toggle group groups related options. The component consists of a group of buttons that are connected, where only one button can be selected at a time.",
    },
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
  },
});

export const Preview = meta.story({
  args: {
    "aria-label": "Filter",
    defaultValue: "inbox",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="inbox">Inbox</ToggleGroup.Item>
      <ToggleGroup.Item value="drafts">Drafts</ToggleGroup.Item>
      <ToggleGroup.Item value="archive">Archive</ToggleGroup.Item>
      <ToggleGroup.Item value="sent">Sent</ToggleGroup.Item>
    </ToggleGroup>
  ),
});

export const OnlyIcons = meta.story(() => (
  <ToggleGroup aria-label="Textalignment" defaultValue="option-1">
    <Tooltip content="Left aligned">
      <ToggleGroup.Item value="option-1">
        <AlignLeftIcon aria-hidden />
      </ToggleGroup.Item>
    </Tooltip>
    <Tooltip content="Center aligned">
      <ToggleGroup.Item value="option-2">
        <AlignCenterIcon aria-hidden />
      </ToggleGroup.Item>
    </Tooltip>
    <Tooltip content="Right aligned">
      <ToggleGroup.Item value="option-3">
        <AlignRightIcon aria-hidden />
      </ToggleGroup.Item>
    </Tooltip>
  </ToggleGroup>
));

export const Controlled = meta.story({
  render: function Controlled() {
    const [value, setValue] = useState<string>("drafts");
    return (
      <>
        <ToggleGroup aria-label="Filter" value={value} onChange={setValue}>
          <ToggleGroup.Item value="inbox">
            <EnvelopeClosedIcon aria-hidden />
            Inbox
          </ToggleGroup.Item>
          <ToggleGroup.Item value="drafts">
            <DocPencilIcon aria-hidden />
            Drafts
          </ToggleGroup.Item>
          <ToggleGroup.Item value="archive">
            <ArchiveIcon aria-hidden />
            Archive
          </ToggleGroup.Item>
          <ToggleGroup.Item value="sent">
            <PaperplaneIcon aria-hidden />
            Sent
          </ToggleGroup.Item>
        </ToggleGroup>
        <Divider />
        <Paragraph>You have selected: {value}</Paragraph>
        <Button data-size="sm" onClick={() => setValue("archive")}>
          Select Archive
        </Button>
      </>
    );
  },
});

export const Secondary = meta.story(() => (
  <ToggleGroup aria-label="Filter" defaultValue="inbox" variant="secondary">
    <ToggleGroup.Item value="inbox">Inbox</ToggleGroup.Item>
    <ToggleGroup.Item value="drafts">Drafts</ToggleGroup.Item>
    <ToggleGroup.Item value="archive">Archive</ToggleGroup.Item>
    <ToggleGroup.Item value="sent">Sent</ToggleGroup.Item>
  </ToggleGroup>
));
