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
import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";

export default {
  title: "designsystemet.no/ToggleGroup",
  component: ToggleGroup,
  subcomponents: {
    "ToggleGroup.Item": ToggleGroup.Item,
  },
  decorators: [
    (Story) => (
      /* 80vw since storybook has padding, and does not stop elements from overflowing the x-axis */
      <div style={{ maxWidth: "80vw" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Preview: StoryFn<typeof ToggleGroup> = (args) => {
  return (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  );
};

Preview.args = {
  "aria-label": "Filtrering", // Set aria-label attribute for accessibility
  defaultValue: "innboks",
  name: "toggle-group-nuts",
};

export const OnlyIcons: StoryFn<typeof ToggleGroup> = (args) => {
  return (
    <ToggleGroup {...args}>
      <Tooltip content="Venstrestilt">
        <ToggleGroup.Item value="option-1">
          <AlignLeftIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Midtstilt">
        <ToggleGroup.Item value="option-2">
          <AlignCenterIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Høyrestilt">
        <ToggleGroup.Item value="option-3">
          <AlignRightIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  );
};

OnlyIcons.args = {
  "aria-label": "Tekstjustering", // Set aria-label attribute for accessibility
  defaultValue: "option-1",
};

export const Kontrollert: StoryFn<typeof ToggleGroup> = () => {
  const [value, setValue] = useState<string>("utkast");
  return (
    <>
      <ToggleGroup aria-label="Filtrering" value={value} onChange={setValue}>
        <ToggleGroup.Item value="innboks">
          <EnvelopeClosedIcon aria-hidden />
          Innboks
        </ToggleGroup.Item>
        <ToggleGroup.Item value="utkast">
          <DocPencilIcon aria-hidden />
          Utkast
        </ToggleGroup.Item>
        <ToggleGroup.Item value="arkiv">
          <ArchiveIcon aria-hidden />
          Arkiv
        </ToggleGroup.Item>
        <ToggleGroup.Item value="sendt">
          <PaperplaneIcon aria-hidden />
          Sendt
        </ToggleGroup.Item>
      </ToggleGroup>
      <Divider />
      <Paragraph>Du har valgt: {value}</Paragraph>
      <Button data-size="sm" onClick={() => setValue("arkiv")}>
        Velg Arkiv
      </Button>
    </>
  );
};

export const Secondary = Preview.bind({});
Secondary.args = {
  "aria-label": "Filtrering", // Set aria-label attribute for accessibility
  defaultValue: "innboks",
  variant: "secondary",
};

export const SecondaryOnlyIcons = OnlyIcons.bind({});
SecondaryOnlyIcons.args = {
  "aria-label": "Filtrering", // Set aria-label attribute for accessibility
  variant: "secondary",
};

export const Disabled: StoryFn<typeof ToggleGroup> = () => {
  return (
    <ToggleGroup aria-label="Filtrering" defaultValue="innboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item disabled value="utkast">
        Utkast
      </ToggleGroup.Item>
      <ToggleGroup.Item disabled value="arkiv">
        Arkiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  );
};

export const ReadOnly: StoryFn<typeof ToggleGroup> = () => {
  return (
    <ToggleGroup aria-label="Filtrering" defaultValue="innboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item readOnly value="utkast">
        Utkast
      </ToggleGroup.Item>
      <ToggleGroup.Item readOnly value="arkiv">
        Arkiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  );
};

export const AriaDisabled: StoryFn<typeof ToggleGroup> = () => {
  return (
    <ToggleGroup aria-label="Filtrering">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item aria-disabled="true" value="utkast">
        Utkast
      </ToggleGroup.Item>
      <ToggleGroup.Item aria-disabled="true" value="arkiv">
        Arkiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value="Søppelpost">Søppelpost</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  );
};

Preview.parameters = {
  ...Preview.parameters,
  chromatic: { disableSnapshot: false },
};
