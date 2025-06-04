import { Paragraph } from "@arbeidstilsynet/design-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Paragraph> = {
  title: "designsystemet.no/Typography/Paragraph",
  component: Paragraph,
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Preview: Story = {
  args: {
    children:
      "Personvernerklæringen gir informasjon om hvilke personopplysninger vi behandler, hvordan disse blir behandlet og hvilke rettigheter du har.",
    variant: "default",
  },
};
