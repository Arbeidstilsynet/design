import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { FilePicker, FilePickerProps } from ".";
import { createMockFileInKb } from "./utils";

const defaultProps: FilePickerProps<number> = {
  files: [],
  errors: [],
  onAdd: vi.fn(),
  onRemove: vi.fn(),
};

describe("FilePicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  test("renders dropzone with custom label", () => {
    render(
      <FilePicker {...defaultProps}>
        <FilePicker.Dropzone label={<span>Custom upload label</span>} />
      </FilePicker>,
    );

    expect(screen.getByText("Custom upload label")).toBeInTheDocument();
    expect(screen.queryByText("Last opp fil")).not.toBeInTheDocument();
  });

  test("renders dropzone with custom default label text", () => {
    render(
      <FilePicker {...defaultProps}>
        <FilePicker.Dropzone defaultLabelText={["Upload file", "PDF only"]} />
      </FilePicker>,
    );

    expect(screen.getByText("Upload file")).toBeInTheDocument();
    expect(screen.getByText("PDF only")).toBeInTheDocument();
  });

  test("renders dropzone with single line default label text", () => {
    render(
      <FilePicker {...defaultProps}>
        <FilePicker.Dropzone defaultLabelText={["Single line only"]} />
      </FilePicker>,
    );

    expect(screen.getByText("Single line only")).toBeInTheDocument();
  });

  test("renders uploaded files", () => {
    const files = [
      {
        id: 1,
        file: createMockFileInKb("document.pdf", 1024), // 1MB
      },
      {
        id: 2,
        file: createMockFileInKb("spreadsheet.xlsx", 512), // 512KB
      },
    ];

    render(
      <FilePicker {...defaultProps} files={files}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.getByText("document.pdf")).toBeInTheDocument();
    expect(screen.getByText("spreadsheet.xlsx")).toBeInTheDocument();
    expect(screen.getByText("(1 MB)")).toBeInTheDocument();
    expect(screen.getByText("(512 KB)")).toBeInTheDocument();
  });

  test("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const files = [{ id: 1, file: createMockFileInKb("document.pdf", 1024) }];

    render(
      <FilePicker {...defaultProps} files={files} onRemove={onRemove}>
        <FilePicker.Files />
      </FilePicker>,
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove document.pdf",
    });
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(files[0].id);
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

    expect(screen.queryByText("document.pdf")).not.toBeInTheDocument();
  });

  test("disables remove buttons when disabled", () => {
    const files = [{ id: 1, file: createMockFileInKb("document.pdf", 1024) }];

    render(
      <FilePicker {...defaultProps} files={files} disabled>
        <FilePicker.Files />
      </FilePicker>,
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove document.pdf",
    });
    expect(removeButton).toBeDisabled();
  });

  test("disables dropzone when disabled", () => {
    render(
      <FilePicker {...defaultProps} disabled>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    const dropzoneButton = screen.getByRole("button");
    expect(dropzoneButton).toBeDisabled();
  });

  test("file input accepts file uploads", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const file = createMockFileInKb("test.pdf", 1);

    render(
      <FilePicker {...defaultProps} onAdd={onAdd}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    const fileInput = screen
      .getByRole("button")
      .querySelector("input[type='file']");
    expect(fileInput).not.toBeNull();
    await user.upload(fileInput as HTMLElement, file);

    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test.each([
    [createMockFileInKb("small.txt", 0), "0 Bytes"],
    [createMockFileInKb("tiny.txt", 0.5), "512 Bytes"],
    [createMockFileInKb("medium.pdf", 1), "1 KB"],
    [createMockFileInKb("large.docx", 2 * 1024), "2 MB"],
    [createMockFileInKb("huge.zip", 1024 * 1024), "1 GB"],
  ])("formats different file sizes correctly ($1)", (file, size) => {
    render(
      <FilePicker {...defaultProps} files={[{ id: 1, file }]}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.getByText(`(${size})`)).toBeInTheDocument();
  });

  test("renders complete FilePicker with all subcomponents", () => {
    const files = [{ id: 1, file: createMockFileInKb("document.pdf", 1024) }];
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

  test("applies custom className to root element", () => {
    const { container } = render(
      <FilePicker {...defaultProps} className="custom-class">
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    expect(container.firstChild).toHaveClass("at-filepicker", "custom-class");
  });

  test("passes through HTML attributes to root element", () => {
    render(
      <FilePicker {...defaultProps} data-testid="file-picker" role="region">
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    const element = screen.getByTestId("file-picker");
    expect(element).toHaveAttribute("role", "region");
  });

  test("handles null files gracefully", () => {
    render(
      <FilePicker {...defaultProps} files={null}>
        <FilePicker.Files />
      </FilePicker>,
    );

    expect(screen.queryByText("document.pdf")).not.toBeInTheDocument();
  });

  test("handles null errors gracefully", () => {
    render(
      <FilePicker {...defaultProps} errors={null}>
        <FilePicker.Errors />
      </FilePicker>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("renders multiple errors correctly", () => {
    const errors = ["Error 1", "Error 2", "Error 3"];

    render(
      <FilePicker {...defaultProps} errors={errors}>
        <FilePicker.Errors />
      </FilePicker>,
    );

    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
    expect(screen.getByText("Error 3")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });

  test("shows drop label when dragging files", async () => {
    const user = userEvent.setup();

    render(
      <FilePicker {...defaultProps}>
        <FilePicker.Dropzone dropLabel="Drop files here" />
      </FilePicker>,
    );

    const dropzone = screen.getByRole("button");
    await user.hover(dropzone);

    expect(screen.getByText("Last opp fil")).toBeInTheDocument();
  });

  test("handles multiple file uploads", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const files = [
      createMockFileInKb("file1.pdf", 1),
      createMockFileInKb("file2.txt", 1),
    ];

    render(
      <FilePicker {...defaultProps} onAdd={onAdd}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    const fileInput = screen
      .getByRole("button")
      .querySelector("input[type='file']");
    await user.upload(fileInput as HTMLElement, files);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(files);
  });

  test("displays file titles correctly for long filenames", () => {
    const files = [
      {
        id: 1,
        file: createMockFileInKb(
          "very-long-filename-that-might-get-truncated-in-the-ui.pdf",
          1024,
        ),
      },
    ];

    render(
      <FilePicker {...defaultProps} files={files}>
        <FilePicker.Files />
      </FilePicker>,
    );

    const fileLabel = screen.getByText(
      "very-long-filename-that-might-get-truncated-in-the-ui.pdf",
    );
    expect(fileLabel).toHaveAttribute(
      "title",
      "very-long-filename-that-might-get-truncated-in-the-ui.pdf",
    );
  });

  test("handles isWaiting prop", () => {
    const { rerender } = render(
      <FilePicker {...defaultProps} isWaiting={false}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    rerender(
      <FilePicker {...defaultProps} isWaiting={true}>
        <FilePicker.Dropzone />
      </FilePicker>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
    expect(
      screen.getByRole("img", { name: "Processing files" }),
    ).toBeInTheDocument();
  });
});
