import { clsx } from "clsx/lite";
import { type HTMLAttributes, use } from "react";
import { Alert } from "../../digdir";
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
    <div className={clsx("at-filepicker-errors", className)} {...rest}>
      {errors.map((error, index) => (
        <Alert key={index} role="alert" data-color="danger" data-size="sm">
          {error}
        </Alert>
      ))}
    </div>
  );
}
