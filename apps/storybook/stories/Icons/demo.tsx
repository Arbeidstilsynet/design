import {
  Button,
  Fieldset,
  Radio,
  Size,
  useRadioGroup,
} from "@arbeidstilsynet/design-react";
import { CloudIcon } from "@navikt/aksel-icons";

export function IconsDemo() {
  const { getRadioProps, value } = useRadioGroup({
    name: "my-radio-group",
    value: "sm",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Fieldset>
        <Fieldset.Legend>data-size</Fieldset.Legend>
        {["sm", "md", "lg"].map((s) => (
          <Radio key={s} label={s} {...getRadioProps(s)} />
        ))}
      </Fieldset>

      <Button icon aria-label="Close" data-size={value as Size}>
        <CloudIcon aria-hidden />
      </Button>
    </div>
  );
}
