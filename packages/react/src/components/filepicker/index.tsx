import { FilePicker as FilePickerParent } from "./filepicker";
import { FilePickerDropzone } from "./filepickerDropzone";
import { FilePickerErrors } from "./filepickerErrors2";
import { FilePickerFiles } from "./filepickerFiles";

/**
 * Controlled component for managing file uploads.
 * You should perform validation in `onAdd`/`onRemove` callbacks and pass a list of errors in props.
 *
 * Uses [react-dropzone](https://react-dropzone.js.org/) for drag-and-drop functionality.
 *
 * Note: the default label text is only an example. File types are not enforced by the component, but can be done in your validation logic as needed.
 *
 * FilePicker has no internal state and can be fully controlled as needed with a combination of `files`, `errors`, `disabled`, `isWaiting` props as well as using the subcomponents as desired. For example, you can change the order of the sucomponents or only use some of them. You decide if the `files` prop only contains accepted files or all including errors, and you can use the `errors` prop to display validation errors in your UI.
 *
 * Usage:
 * ```tsx
 * <FilePicker files={files} errors={errors} onAdd={handleAddFiles} onRemove={handleRemoveFile}>
 *   <FilePicker.Dropzone defaultLabelText={["Upload here!"]} />
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
export type { FilePickerErrorsProps } from "./filepickerErrors2";
export type { FilePickerFilesProps } from "./filepickerFiles";
export type { FilePickerProps } from "./types";
export { FilePicker, FilePickerDropzone, FilePickerErrors, FilePickerFiles };
