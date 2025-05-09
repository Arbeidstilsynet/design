import {
  Paragraph,
  Textfield,
  useDebounceCallback,
} from "@arbeidstilsynet/design-react";
import type { Meta } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  title: "Utilities/useDebounceCallback",
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState("");
  const debouncedCallback = useDebounceCallback((value: string) => {
    setValue(value);
  }, 1000);

  return (
    <>
      <Textfield
        onChange={(e) => debouncedCallback(e.target.value)}
        placeholder="Type something..."
        aria-label="Type something"
      />
      <Paragraph>Debounced value: {value}</Paragraph>
    </>
  );
};
