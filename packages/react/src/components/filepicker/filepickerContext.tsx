import { createContext } from "react";
import { FilePickerProps } from "./types";

export type FilePickerContextValue = Pick<
  FilePickerProps,
  "files" | "errors" | "disabled" | "isWaiting" | "onAdd" | "onRemove"
>;

export const FilePickerContext = createContext<FilePickerContextValue>({
  files: [],
  errors: null,
  onAdd: () => {
    throw new TypeError("FilePickerContext is missing");
  },
  onRemove: () => {
    throw new TypeError("FilePickerContext is missing");
  },
});
