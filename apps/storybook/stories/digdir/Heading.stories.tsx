import { Heading } from "@arbeidstilsynet/design-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Heading> = {
  title: "designsystemet.no/Typography/Heading",
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Preview: Story = {
  args: {
    children: "Tittel tekst",
  },
};
