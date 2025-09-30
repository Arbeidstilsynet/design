import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface FilePickerProps<TFileId extends string | number>
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  /** Should the FilePicker be disabled */
  disabled?: boolean;
  /** Display spinner while processing files */
  isWaiting?: boolean;

  /** List of currently selected files
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/File
   */
  files: FilePickerItem<TFileId>[] | null;
  /** List of general validation errors. Will be displayed by `FilePicker.Errors` */
  errors: string[] | null;

  /** Function to call when adding one or more files */
  onAdd: (files: File[]) => void | Promise<void>;
  /** Function called when removing a file */
  onRemove: (id: TFileId) => void | Promise<void>;
}

export interface FilePickerItem<
  TFileId extends string | number = string | number,
> {
  /** Id for this file. Used as React key. Should be unique. You can use `file.name` if you prevent duplicates. */
  id: TFileId;
  /** The file itself. See: https://developer.mozilla.org/en-US/docs/Web/API/File */
  file: File;
  /** If this file has an error. Consider passing details in `errors` to `FilePicker` to show the cause. */
  hasError?: boolean | null;
}
