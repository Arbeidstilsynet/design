// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/validation-message/validation-message.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/validation-message/metadata.json

import { ValidationMessage } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Typography/ValidationMessage",
  component: ValidationMessage,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Validation message is used to display feedback related to the validation of user input, such as error messages or warnings in forms.",
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
    children: "This is a validation message.",
  },
});

export const AllColors = meta.story(() => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <ValidationMessage data-color="danger">
      This is an error message.
    </ValidationMessage>

    <ValidationMessage data-color="success">
      This is a success message.
    </ValidationMessage>

    <ValidationMessage data-color="info">
      This is an informational message.
    </ValidationMessage>

    <ValidationMessage data-color="warning">
      This is a warning message.
    </ValidationMessage>
  </div>
));
