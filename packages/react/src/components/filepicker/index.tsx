import { FilePicker as FilePickerParent } from "./filepicker";
import { FilePickerDropzone } from "./filepickerDropzone";
import { FilePickerErrors } from "./filepickerErrors";
import { FilePickerFiles } from "./filepickerFiles";

/**
 * Controlled component for managing file uploads.
 * You should perform validation in onAdd/onRemove callbacks and pass a list of errors in props.
 *
 * Note: the default label text is only only a demonstration.
 * To enforce file types and sizes you have to implement validation in `onAdd` and `onRemove` callbacks.
 *
 * Usage:
 * ```tsx
 * <FilePicker files={files} errors={errors} onAdd={handleAddFiles} onRemove={handleRemoveFile}>
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
