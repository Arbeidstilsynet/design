import { Alert } from "@/digdir";
import { clsx } from "clsx/lite";
import { HTMLAttributes, use } from "react";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerErrorsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export function FilePickerErrors({
  ref,
  className,
  ...rest
}: FilePickerErrorsProps) {
  const { errors } = use(FilePickerContext);

  if (!errors?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={clsx("at-filepicker-errors", className)}
      role="alert"
      {...rest}
    >
      {errors.map((error, index) => (
        <Alert key={index} data-color="danger" data-size="sm">
          {error}
        </Alert>
      ))}
    </div>
  );
}
