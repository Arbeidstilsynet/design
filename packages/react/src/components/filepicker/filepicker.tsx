import { clsx } from "clsx/lite";
import { FilePickerContext } from "./filepickerContext";
import { FilePickerProps } from "./types";

export function FilePicker({
  ref,
  className,
  children,
  disabled = false,
  isWaiting = false,
  files,
  errors,
  onAdd,
  onRemove,
  ...rest
}: Readonly<FilePickerProps>) {
  return (
    <div ref={ref} className={clsx("at-filepicker", className)} {...rest}>
      <FilePickerContext
        value={{ files, errors, disabled, isWaiting, onAdd, onRemove }}
      >
        {children}
      </FilePickerContext>
    </div>
  );
}
