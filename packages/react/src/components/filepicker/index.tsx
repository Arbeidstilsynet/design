import { FilePicker as FilePickerParent } from "./filepicker";
import { FilePickerDropzone } from "./filepickerDropzone";
import { FilePickerErrors } from "./filepickerErrors";
import { FilePickerFiles } from "./filepickerFiles";

/**
 * Controlled component for managing file uploads.
 * You should perform validation in onAdd/onRemove callbacks and pass a list of errors in props.
 *
 * Usage:
 * ```tsx
 * <FilePicker files={files} errors={errors} onAdd={onAdd} onRemove={handleRemove}>
 *   <FilePicker.Dropzone />
 *   <FilePicker.Files />
 *   <FilePicker.Errors />
 * </FilePicker>
 * ```
 */
const FilePicker = Object.assign(FilePickerParent, {
  Dropzone: FilePickerDropzone,
  Files: FilePickerFiles,
  Errors: FilePickerErrors,
});

export { FilePickerContext } from "./filepickerContext";
export type { FilePickerDropzoneProps } from "./filepickerDropzone";
export type { FilePickerErrorsProps } from "./filepickerErrors";
export type { FilePickerFilesProps } from "./filepickerFiles";
export type { FilePickerProps } from "./types";
export { FilePicker, FilePickerDropzone, FilePickerErrors, FilePickerFiles };
