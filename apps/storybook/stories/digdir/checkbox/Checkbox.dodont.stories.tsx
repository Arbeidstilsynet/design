// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/checkbox/checkbox.dodont.tsx

import {
  Checkbox,
  Fieldset,
  useCheckboxGroup,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Checkbox/DoDont",
  component: Checkbox,
  tags: ["!autodocs", "!dev"],
  parameters: {
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-6)",
    },
  },
});

export const DoPlacement = meta.story({
  render: function DoPlacement() {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ["email"],
    });
    return (
      <Fieldset>
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});

export const DontPlacement = meta.story({
  render: function DontPlacement() {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ["email"],
    });
    return (
      <Fieldset
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--ds-size-2)",
        }}
      >
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});
