import { clsx } from "clsx/lite";
import { type HTMLAttributes, use } from "react";
import { ValidationMessage } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerErrorsProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {}

export function FilePickerErrors({
  className,
  ...rest
}: FilePickerErrorsProps) {
  const { errors } = use(FilePickerContext);

  if (!errors?.length) {
    return null;
  }

  return (
    <div
      className={clsx("at-filepicker-errors", className)}
      aria-live="polite"
      {...rest}
    >
      {errors.map((error, index) => (
        <ValidationMessage key={index}>{error}</ValidationMessage>
      ))}
    </div>
  );
}
