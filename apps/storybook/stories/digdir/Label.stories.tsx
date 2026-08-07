import { Label } from "@arbeidstilsynet/design-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Label> = {
  title: "designsystemet.no/Typography/Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Preview: Story = {
  args: {
    children: "Vennligst skriv inn fødselsnummer. 11 tegn",
    weight: "medium",
  },
};

Preview.parameters = {
  ...Preview.parameters,
  chromatic: { disableSnapshot: false },
};
