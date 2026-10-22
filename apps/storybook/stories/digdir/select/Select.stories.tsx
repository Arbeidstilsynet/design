// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/select/select.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/select/metadata.json

import { Field, Label, Select } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Select",
  component: Select,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Select.Option": Select.Option,
    "Select.Optgroup": Select.Optgroup,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle: "Select allows users to choose an option from a list.",
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
    defaultValue: "",
  },
  render: (args) => (
    <Field>
      <Label>Select a mountain</Label>
      <Select {...args}>
        <Select.Option value="" disabled>
          Select a mountain &hellip;
        </Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
    </Field>
  ),
});

export const Disabled = meta.story(() => (
  <Field>
    <Label>Select a mountain</Label>
    <Select disabled>
      <Select.Option value="blank">Select &hellip;</Select.Option>
      <Select.Option value="everest">Mount Everest</Select.Option>
    </Select>
  </Field>
));

export const ReadOnly = meta.story(() => (
  <Field>
    <Label>Select a mountain</Label>
    <Select aria-readonly value="everest">
      <Select.Option value="everest">Mount Everest</Select.Option>
    </Select>
  </Field>
));

export const WithOptgroup = meta.story(() => (
  <Field>
    <Label>Select a park</Label>
    <Select>
      <Select.Optgroup label="Grünerløkka">
        <Select.Option value="sofienbergparken">Sofienberg Park</Select.Option>
        <Select.Option value="birkelunden">Birkelunden</Select.Option>
        <Select.Option value="olafryesplass">Olaf Ryes Plass</Select.Option>
      </Select.Optgroup>
      <Select.Optgroup label="City centre">
        <Select.Option value="slottsparken">The Palace Park</Select.Option>
        <Select.Option value="studenterlunden">Studenterlunden</Select.Option>
      </Select.Optgroup>
      <Select.Optgroup label="Old Oslo">
        <Select.Option value="botsparken">Botsparken</Select.Option>
        <Select.Option value="klosterenga">Klosterenga Park</Select.Option>
      </Select.Optgroup>
    </Select>
  </Field>
));
