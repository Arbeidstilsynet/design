import { Paragraph } from "@digdir/designsystemet-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { FilePicker, type FilePickerItem } from "..";
import { createMockFile, createMockFileInKb } from "./utils";

const meta: Meta<typeof FilePicker> = {
  title: "Arbeidstilsynet/FilePicker",
  component: FilePicker,
  parameters: {
    layout: "padded",
  },
  args: {
    onAdd: (files) => {
      console.log(`onAdd called with ${files.length} files`);
    },
    onRemove: (id) => {
      console.log(`onRemove called with id ${id}`);
    },
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
    const fileId = useRef(0);
    const [files, setFiles] = useState<FilePickerItem<number>[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const maxFiles = 5;
    const maxSizeInMb = 10;

    const handleAdd = (newFiles: File[]) => {
      // Simple validation for demo
      const validationErrors: string[] = [];
      const maxSize = maxSizeInMb * 1024 * 1024;

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

      const addedFiles = newFiles.map((file) => ({
        id: fileId.current++,
        file,
        error: null,
      }));

      setErrors([]);
      setFiles((prev) => [...prev, ...addedFiles]);
    };

    const handleRemove = (id: number) => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
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
        <Paragraph data-size="xs">Maks filstørrelse {maxSizeInMb} MB</Paragraph>
        <FilePicker.Dropzone />
        <Paragraph data-size="xs">
          Antall filer {files.length}/{maxFiles}
        </Paragraph>
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
    );
  },
  args: {
    disabled: false,
  },
};

export const WithFiles: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <Paragraph data-size="xs">Antall filer 2/2</Paragraph>
      <FilePicker.Errors />
      <FilePicker.Files />
    </FilePicker>
  ),

  args: {
    files: [
      {
        id: 1,
        file: createMockFileInKb("file1.pdf", 2048),
      },
      {
        id: 2,
        file: createMockFileInKb(
          "very long filename that just goes on and on and on and on and on and maybe ends somewhere around here.doc",
          500,
        ),
      },
    ],
    errors: null,
  },
};

export const WithErrors: Story = {
  render: (args) => (
    <FilePicker {...args}>
      <FilePicker.Dropzone />
      <Paragraph data-size="xs">Antall filer 3/3</Paragraph>
      <FilePicker.Errors />
      <FilePicker.Files />
    </FilePicker>
  ),

  args: {
    files: [
      {
        id: 1,
        file: createMockFileInKb("file1.pdf", 2048),
        error: "file1.pdf size exceeds limit",
      },
      {
        id: 2,
        file: createMockFileInKb("file2.doc", 500),
        error:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet pretium lorem. Sed non sagittis purus. Donec quis arcu tortor. Nunc egestas vel nulla sed posuere. ",
      },
      {
        id: 3,
        file: createMockFile("file3.txt", 40),
        error: null,
      },
    ],
    errors: ["Too many files selected", "Another error"],
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
    files: [{ id: 1, file: createMockFileInKb("document.pdf", 1) }],
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
    files: [
      { id: 1, file: createMockFileInKb("file being processed.doc", 500) },
    ],
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
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
    </div>
  ),
  args: {
    files: [
      {
        id: 1,
        file: createMockFileInKb(
          "A very long and interesting filename that just really takes a lot of space for no good reason.pdf",
          2048,
        ),
      },
      { id: 2, file: createMockFileInKb("file2.doc", 500) },
    ],
    errors: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nulla diam. Curabitur rutrum ante metus, sed molestie erat sagittis quis.",
    ],
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
      <FilePicker {...args} data-size="sm">
        <FilePicker.Dropzone defaultLabelText={["data-size=sm"]} />
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
      <FilePicker {...args} data-size="md">
        <FilePicker.Dropzone defaultLabelText={["data-size=md"]} />
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
      <FilePicker {...args} data-size="lg">
        <FilePicker.Dropzone defaultLabelText={["data-size=lg"]} />
        <FilePicker.Errors />
        <FilePicker.Files />
      </FilePicker>
    </div>
  ),
  args: {
    files: [],
    errors: [],
  },
};
