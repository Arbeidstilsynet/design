import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePicker } from "..";
import { createMockFile } from "./utils";

const meta: Meta<typeof FilePicker> = {
  title: "Arbeidstilsynet/FilePicker",
  component: FilePicker,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <FilePicker.Files />
    </FilePicker>
  ),
};

export const WithErrors: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <FilePicker.Files />
      <FilePicker.Errors />
    </FilePicker>
  ),

  args: {
    files: [
      createMockFile("file1.pdf", 2048),
      createMockFile("file2.doc", 500),
    ],
    errors: ["file1.pdf size exceeds limit", "Unsupported file type .doc"],
  },
};
