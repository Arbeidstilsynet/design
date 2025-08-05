import { createContext } from "react";
import type { FilePickerProps } from "./types";

export type FilePickerContextValue<TFileId extends string | number> = Pick<
  FilePickerProps<TFileId>,
  "files" | "errors" | "disabled" | "isWaiting" | "onAdd" | "onRemove"
>;

export const FilePickerContext = createContext<
  FilePickerContextValue<string | number>
>({
  files: [],
  errors: null,
  onAdd: () => {
    throw new TypeError("FilePickerContext is missing");
  },
  onRemove: () => {
    throw new TypeError("FilePickerContext is missing");
  },
});
