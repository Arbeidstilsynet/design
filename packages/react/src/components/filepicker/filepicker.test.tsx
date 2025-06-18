import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { FilePicker, FilePickerProps } from ".";
import { createMockFile } from "./utils";

const defaultProps: FilePickerProps = {
  files: [],
  errors: [],
  onAdd: vi.fn(),
  onRemove: vi.fn(),
};

describe("FilePicker", () => {
  test("renders dropzone with default content", () => {
    render(
      <FilePicker {...defaultProps}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    expect(screen.getByText("Last opp fil")).toBeInTheDocument();
    expect(
      screen.getByText("Filformater: pdf, txt og docx"),
    ).toBeInTheDocument();
  });

  test("renders uploaded files", () => {
    const files = [
      createMockFile("document.pdf", 1024), // 1MB
      createMockFile("spreadsheet.xlsx", 512), // 512KB
    ];

    render(
      <FilePicker {...defaultProps} files={files}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.getByText("document.pdf")).toBeInTheDocument();
    expect(screen.getByText("spreadsheet.xlsx")).toBeInTheDocument();
    expect(screen.getByText("PDF-dokument • 1.0 MB")).toBeInTheDocument();
    expect(screen.getByText("Excel-dokument • 512.0 KB")).toBeInTheDocument();
  });

  test("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const files = [createMockFile("document.pdf", 1024)];

    render(
      <FilePicker {...defaultProps} files={files} onRemove={onRemove}>
        <FilePicker.Files />
      </FilePicker>,
    );

    const removeButton = screen.getByRole("button", {
      name: "Fjern document.pdf",
    });
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(files[0]);
  });

  test("renders errors when provided", () => {
    const errors = ["File size exceeds maximum limit", "Invalid file type"];

    render(
      <FilePicker {...defaultProps} errors={errors}>
        <FilePicker.Errors />
      </FilePicker>,
    );

    expect(
      screen.getByText("File size exceeds maximum limit"),
    ).toBeInTheDocument();
    expect(screen.getByText("Invalid file type")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("does not render errors when none provided", () => {
    render(
      <FilePicker {...defaultProps} errors={[]}>
        <FilePicker.Errors />
      </FilePicker>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("does not render files when none provided", () => {
    render(
      <FilePicker {...defaultProps} files={[]}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.queryByText("PDF-dokument")).not.toBeInTheDocument();
  });

  test("disables remove buttons when disabled", () => {
    const files = [createMockFile("document.pdf", 1024)];

    render(
      <FilePicker {...defaultProps} files={files} disabled>
        <FilePicker.Files />
      </FilePicker>,
    );

    const removeButton = screen.getByRole("button", {
      name: "Fjern document.pdf",
    });
    expect(removeButton).toBeDisabled();
  });

  test("file input accepts file uploads", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const file = createMockFile("test.pdf", 1);

    render(
      <FilePicker {...defaultProps} onAdd={onAdd}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    const fileInput = screen.getByRole("button", { hidden: true });
    await user.upload(fileInput, file);

    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test("formats different file sizes correctly", () => {
    const files = [
      createMockFile("small.txt", 0.5), // 500 bytes
      createMockFile("medium.pdf", 1), // 1KB
      createMockFile("large.docx", 1024), // 1MB
    ];

    render(
      <FilePicker {...defaultProps} files={files}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.getByText("Tekstfil • 512 Bytes")).toBeInTheDocument();
    expect(screen.getByText("PDF-dokument • 1 KB")).toBeInTheDocument();
    expect(screen.getByText("Word-dokument • 1 MB")).toBeInTheDocument();
  });

  test("renders complete FilePicker with all subcomponents", () => {
    const files = [createMockFile("document.pdf", 1024)];
    const errors = ["Test error"];

    render(
      <FilePicker {...defaultProps} files={files} errors={errors}>
        <FilePicker.Dropzone />
        <FilePicker.Files />
        <FilePicker.Errors />
      </FilePicker>,
    );

    // Dropzone
    expect(screen.getByText("Last opp fil")).toBeInTheDocument();

    // Files
    expect(screen.getByText("document.pdf")).toBeInTheDocument();

    // Errors
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });
});
