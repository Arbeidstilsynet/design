import { clsx } from "clsx/lite";
import { FilePickerContext } from "./filepickerContext";
import type { FilePickerProps } from "./types";

export function FilePicker<TFileId extends string | number>({
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
}: Readonly<FilePickerProps<TFileId>>) {
  return (
    <div
      ref={ref}
      className={clsx("at-filepicker", className)}
      data-disabled={disabled}
      {...rest}
    >
      <FilePickerContext
        // @ts-expect-error Type 'string | number' is not assignable to type 'TFileId'
        // FilePickerContextValue does not get the generic type, so onRemove errors here.
        // The generic is primarily for type inference in the props for the consumer.
        value={{ files, errors, disabled, isWaiting, onAdd, onRemove }}
      >
        {children}
      </FilePickerContext>
    </div>
  );
}
