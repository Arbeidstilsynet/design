// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/fieldset/fieldset.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/fieldset/metadata.json

import {
  Checkbox,
  Field,
  Fieldset,
  Input,
  Label,
  Radio,
  Select,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Fieldset",
  component: Fieldset,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Fieldset.Legend": Fieldset.Legend,
    "Fieldset.Description": Fieldset.Description,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Fieldset is used to group and label fields that naturally belong together, such as date fields or address fields. The component helps organize information, make forms more manageable, and improve accessibility for screen readers.",
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
    <Fieldset {...args}>
      <Fieldset.Legend>Which fjord arm do you live by?</Fieldset.Legend>
      <Fieldset.Description>
        The choice will help us improve the content we show you.
      </Fieldset.Description>
      <Radio label="Barsnesfjorden" name="radio" value="barsnesfjorden" />
      <Radio label="Eidsfjorden" name="radio" value="eidsfjorden" />
      <Radio label="None of these" name="radio" value="none-of-these" />
    </Fieldset>
  ),
});

export const WithCheckbox = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Do you accept the terms?</Fieldset.Legend>
    <Checkbox label="Yes, I accept" value="agree" />
  </Fieldset>
));

export const WithValidation = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Do you accept the terms?</Fieldset.Legend>
    <Checkbox label="Yes, I accept" value="agree" />
    <ValidationMessage>You must accept the terms</ValidationMessage>
  </Fieldset>
));

export const LegendAsHeading = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>
      <h1>Where are you going to travel?</h1>
    </Fieldset.Legend>
  </Fieldset>
));

export const WithFields = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Personal information</Fieldset.Legend>
    <Fieldset.Description>
      Fill in your personal information below.
    </Fieldset.Description>
    <Field>
      <Label>First name</Label>
      <Input />
    </Field>
    <Field>
      <Label>Gender</Label>
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="other">Other</Select.Option>
      </Select>
    </Field>
  </Fieldset>
));

export const ReadOnly = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Which district do you live in?</Fieldset.Legend>
    <Fieldset.Description>
      Trondheim is divided into four districts
    </Fieldset.Description>
    <Radio label="Østbyen" value="ostbyen" name="city" readOnly />
    <Radio label="Lerkendal" value="lerkendal" name="city" readOnly />
    <Radio label="Heimdal" value="heimdal" name="city" readOnly checked />
    <Radio label="Midtbyen" value="midtbyen" name="city" readOnly />
  </Fieldset>
));
