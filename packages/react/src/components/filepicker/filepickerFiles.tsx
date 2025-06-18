import { FileIcon, XMarkIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { HTMLAttributes, use } from "react";
import { Button, Label } from "../..";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerFilesProps extends HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function FilePickerFiles({
  ref,
  className,
  ...rest
}: Readonly<FilePickerFilesProps>) {
  const { files, onRemove, disabled } = use(FilePickerContext);

  if (!files?.length) {
    return null;
  }

  return (
    <div ref={ref} className={clsx("at-filepicker-files", className)} {...rest}>
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} className="at-filepicker-file">
          <div className="at-filepicker-file__info">
            <FileIcon className="at-filepicker-file__icon" aria-hidden="true" />
            <Label className="at-filepicker-file__name">
              {file.name}{" "}
              <span className="at-filepicker-file__size">
                ({formatFileSize(file.size)})
              </span>
            </Label>
          </div>
          <Button
            variant="tertiary"
            data-size="sm"
            className="at-filepicker-file__remove"
            onClick={() => onRemove(file)}
            disabled={disabled}
            aria-label={`Fjern ${file.name}`}
          >
            <XMarkIcon
              className="at-filepicker-file__remove-icon"
              aria-hidden="true"
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
