// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/textarea/textarea.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/textarea/metadata.json

import { Field, Label, Textarea } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Textarea",
  component: Textarea,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Textarea is used when the user needs to enter text that spans multiple lines. ",
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

const column = {
  customStyles: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

export const Preview = meta.story({
  render: (args) => (
    <Field>
      <Label>Label</Label>
      <Textarea {...args} />
    </Field>
  ),
  parameters: column,
});

export const WithRows = meta.story({
  render: () => (
    <Field>
      <Label>Description</Label>
      <Textarea rows={6} />
    </Field>
  ),
  parameters: column,
});

export const Disabled = meta.story({
  render: () => (
    <Field>
      <Label>Label</Label>
      <Textarea disabled value="Disabled textarea" />
    </Field>
  ),
  parameters: column,
});

export const ReadOnly = meta.story({
  render: () => (
    <Field>
      <Label>Case description</Label>
      <Field.Description>
        This text has been added automatically based on information you have
        already submitted, and cannot be edited.
      </Field.Description>
      <Textarea
        readOnly
        value="I am applying for support because I need funding to carry out the project as planned."
      />
    </Field>
  ),
  parameters: column,
});
