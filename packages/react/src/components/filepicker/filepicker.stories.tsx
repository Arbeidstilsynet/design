import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePicker } from "./index";

const meta: Meta<typeof FilePicker> = {
  title: "Arbeidstilsynet/FilePicker",
  component: FilePicker,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
