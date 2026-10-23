// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/label/label.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/label/metadata.json

import { Field, Input, Label, Textfield } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Typography/Label",
  component: Label,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Label functions as a clear and accessible text label that tells the user what an associated form element is about.",
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
    children: "National identity number (11 digits)",
  },
});

export const Weights = meta.story({
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-size-8)" }}>
      <Field>
        <Label>Label for text input</Label>
        <Input type="text" />
      </Field>
      <Field>
        <Label>Label for checkbox input</Label>
        <Input type="checkbox" />
      </Field>
    </div>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const TextFieldLabel = meta.story({
  render: () => (
    <Textfield
      label="Street address"
      description="Example: Sunflower Road 44"
    />
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
