import { clsx } from "clsx/lite";
import { HTMLAttributes, Ref } from "react";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  ref?: Ref<HTMLDivElement>;

  disabled?: boolean;

  /** Max total files */
  maxTotalFiles?: number;
  /** Max size per file (bytes) */
  maxSize?: number;
  /** Min size per file (bytes) */
  minSize?: number;
  /** Max total size (bytes).
   *
   * If not specified but `maxSize` is specified, this will default to `maxTotalFiles * maxSize`.
   */
  maxTotalSize?: number;

  /** List of currently selected files
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/File
   */
  files: File[];

  /** Function to call when adding a file */
  onAdd: (files: File[]) => void | Promise<void>;
  /** Function called when removing a file */
  onRemove: (file: File) => void | Promise<void>;
}

/**
 *
 * Usage:
 * ```tsx
 * <FilePicker maxSize={1024**2} maxTotalFiles={2} onAdd={file => console.log(file)} onRemove={file => console.log(file)}>
 *   <FilePicker.Header>Upload here</FilePicker.Header>
 *   <FilePicker.Dropzone />
 *   <FilePicker.Status />
 *   <FilePicker.Files />
 * </FilePicker>
 * ```
 */
export function FilePicker({
  ref,
  maxTotalFiles = 1,
  maxSize,
  minSize,
  maxTotalSize,
  files,
  onAdd,
  onRemove,
  className,
  ...rest
}: FilePickerProps) {
  return (
    <div ref={ref} className={clsx("at-filepicker", className)} {...rest}>
      <FilePickerContext value={{ files, onAdd, onRemove }}>
        Place Holder
      </FilePickerContext>
    </div>
  );
}
