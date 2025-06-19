import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FilePicker } from "..";
import { createMockFileInKb } from "./utils";

const meta: Meta<typeof FilePicker> = {
  title: "Arbeidstilsynet/FilePicker",
  component: FilePicker,
  parameters: {
    layout: "padded",
  },
  subcomponents: {
    ["FilePicker.Dropzone"]: FilePicker.Dropzone,
    ["FilePicker.Files"]: FilePicker.Files,
    ["FilePicker.Errors"]: FilePicker.Errors,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const handleAdd = (newFiles: File[]) => {
      // Simple validation for demo
      const validationErrors: string[] = [];
      const maxSize = 10 * 1024 * 1024; // 10MB
      const maxFiles = 5;

      if (files.length + newFiles.length > maxFiles) {
        validationErrors.push(`Maksimalt ${maxFiles} filer tillatt`);
      }

      newFiles.forEach((file) => {
        if (file.size > maxSize) {
          validationErrors.push(
            `${file.name} overskrider maksimal filstørrelse (10 MB)`,
          );
        }
      });

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors([]);
      setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleRemove = (fileToRemove: File) => {
      setFiles((prev) => prev.filter((file) => file !== fileToRemove));
      setErrors([]);
    };

    return (
      <FilePicker
        {...args}
        files={files}
        errors={errors}
        onAdd={handleAdd}
        onRemove={handleRemove}
      >
        <FilePicker.Dropzone />
        <FilePicker.Files />
        <FilePicker.Errors />
      </FilePicker>
    );
  },
  args: {
    disabled: false,
  },
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
      createMockFileInKb("file1.pdf", 2048),
      createMockFileInKb("file2.doc", 500),
    ],
    errors: ["file1.pdf size exceeds limit", "Unsupported file type .doc"],
  },
};

export const Disabled: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <FilePicker.Files />
    </FilePicker>
  ),
  args: {
    files: [createMockFileInKb("document.pdf", 1)],
    errors: [],
    disabled: true,
    onAdd: () => {},
    onRemove: () => {},
  },
};

export const ChangedDefaultText: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone
        defaultLabelText={["Custom upload text"]}
        dropLabel="Custom drop text"
      />
      <FilePicker.Files />
    </FilePicker>
  ),
};

export const IsWaiting: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <FilePicker.Files />
    </FilePicker>
  ),
  args: {
    isWaiting: true,
    disabled: true,
    files: [createMockFileInKb("file being processed.doc", 500)],
  },
};

export const SideBySide: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <FilePicker {...args}>
        <FilePicker.Dropzone />
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
      <FilePicker {...args}>
        <FilePicker.Dropzone />
        <FilePicker.Files />
        <FilePicker.Errors />
      </FilePicker>
    </div>
  ),
  args: {
    files: [
      createMockFileInKb(
        "A very long and interesting filename that just really takes a lot of space for no good reason.pdf",
        2048,
      ),
      createMockFileInKb("file2.doc", 500),
    ],
    errors: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nulla diam. Curabitur rutrum ante metus, sed molestie erat sagittis quis.",
    ],
  },
};
