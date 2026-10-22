// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/field/field.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/field/metadata.json

import {
  Field,
  Input,
  Label,
  Textarea,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Field",
  component: Field,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Field.Description": Field.Description,
    "Field.Affixes": Field.Affixes,
    "Field.Affix": Field.Affix,
    "Field.Counter": Field.Counter,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Field is a helper component to automatically associate a field with label, description, validation message and character count.",
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
  render: (args) => (
    <Field {...args}>
      <Label>Last name</Label>
      <Field.Description>Last name cannot contain spaces</Field.Description>
      <Input defaultValue="Smith Washington" />
      <ValidationMessage>
        You cannot have spaces in your last name
      </ValidationMessage>
    </Field>
  ),
});

export const Affix = meta.story(() => (
  <Field>
    <Label>How many pounds does it cost per month?</Label>
    <Field.Affixes>
      <Field.Affix>GBP</Field.Affix>
      <Input />
      <Field.Affix>per month</Field.Affix>
    </Field.Affixes>
  </Field>
));

export const Counter = meta.story(() => (
  <Field>
    <Label>Add a description</Label>
    <Textarea rows={2} />
    <Field.Counter limit={10} />
  </Field>
));

export const Position = meta.story({
  render: () => (
    <>
      <Field position="end">
        <Label>Airplane mode</Label>
        <Input type="checkbox" role="switch" />
      </Field>
    </>
  ),
  parameters: {
    customStyles: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
});
