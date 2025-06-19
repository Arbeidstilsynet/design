import { HTMLAttributes } from "react";
import { DefaultProps } from "../../types";

export interface FilePickerProps
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
  files: File[] | null;
  /** List of validation errors */
  errors: string[] | null;

  /** Function to call when adding one or more files */
  onAdd: (files: File[]) => void | Promise<void>;
  /** Function called when removing a file */
  onRemove: (file: File) => void | Promise<void>;
}
