// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/switch/switch.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/switch/metadata.json

import {
  Divider,
  Field,
  Fieldset,
  Input,
  Label,
  Switch,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Switch",
  component: Switch,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Switch allows users to choose between two options by turning something on or off.",
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
    label: "Switch",
  },
});

export const Group = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Turn lights on/off</Fieldset.Legend>
    <Switch label="Living room" checked />
    <Switch label="Kitchen" />
    <Switch label="Bathroom" />
    <Switch
      label="Bedroom"
      description="Unable to connect to the light bulbs"
      readOnly
    />
  </Fieldset>
));

export const RightAligned = meta.story(() => (
  <Switch label="Flight mode" position="end" defaultChecked />
));

export const RightAligned2 = meta.story(() => (
  <div
    style={{
      flexDirection: "column",
      width: "100%",
      maxWidth: "380px",
    }}
  >
    <Divider />

    <Field
      position="end"
      style={{
        alignItems: "center",
        padding: "var(--ds-size-2) 0",
      }}
    >
      <Label>Airplane mode</Label>
      <Input type="checkbox" role="switch" />
    </Field>

    <Divider />

    <Field
      position="end"
      style={{
        alignItems: "center",
        padding: "var(--ds-size-2) 0",
      }}
    >
      <Label>Silent mode</Label>
      <Input type="checkbox" role="switch" />
    </Field>

    <Divider />
  </div>
));

export const Outline = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Enable notifications</Fieldset.Legend>
    <Switch variant="outline" label="Service messages" checked />
    <Switch variant="outline" label="Reminders" />
    <Switch variant="outline" label="News updates" />
    <Switch
      label="SMS alerts"
      description="Missing a valid phone number in your profile"
      variant="outline"
      readOnly
    />
  </Fieldset>
));

export const ReadOnly = meta.story(() => (
  <Switch
    label="Flight mode"
    description="Unable to connect to the flight mode device"
    readOnly
    defaultChecked
  />
));
