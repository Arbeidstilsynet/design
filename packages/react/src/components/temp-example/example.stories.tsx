import type { Meta, StoryObj } from "@storybook/react";
import { TempExample } from "./index";

const meta: Meta<typeof TempExample> = {
  title: "Arbeidstilsynet/TempExample",
  component: TempExample,
};

export default meta;

type Story = StoryObj<typeof TempExample>;

export const Default: Story = {
  args: {
    onClick: () => alert("Button clicked!"),
  },
};
