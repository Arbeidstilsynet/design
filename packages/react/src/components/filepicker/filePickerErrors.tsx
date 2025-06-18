import { ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { HTMLAttributes, use } from "react";
import { Label } from "../..";
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
        <div key={index} className="at-filepicker-error">
          <ExclamationmarkTriangleIcon
            className="at-filepicker-error__icon"
            aria-hidden="true"
          />
          <Label className="at-filepicker-error__text">{error}</Label>
        </div>
      ))}
    </div>
  );
}
