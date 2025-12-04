import { clsx } from "clsx/lite";
import { type HTMLAttributes, use } from "react";
import { ValidationMessage } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerErrorsProps
  extends DefaultProps<HTMLOutputElement>, HTMLAttributes<HTMLOutputElement> {}

/**
 * Displays errors passed to the parent `FilePicker` component.
 */
export function FilePickerErrors({
  className,
  ...rest
}: FilePickerErrorsProps) {
  const { errors } = use(FilePickerContext);

  if (!errors?.length) {
    return null;
  }

  return (
    <output className={clsx("at-filepicker-errors", className)} {...rest}>
      {errors.map((error, index) => (
        <ValidationMessage key={index}>{error}</ValidationMessage>
      ))}
    </output>
  );
}
