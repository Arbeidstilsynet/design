import { createContext } from "react";

export interface FilePickerContextValue {
  files: File[];
  onAdd: (files: File[]) => void | Promise<void>;
  onRemove: (file: File) => void | Promise<void>;
}

export const FilePickerContext = createContext<FilePickerContextValue>({
  files: [],
  onAdd: () => {
    throw new TypeError("FilePickerContext is missing");
  },
  onRemove: () => {
    throw new TypeError("FilePickerContext is missing");
  },
});
