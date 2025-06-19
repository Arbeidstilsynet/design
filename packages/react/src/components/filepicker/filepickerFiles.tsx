import { FileIcon, XMarkIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { HTMLAttributes, use } from "react";
import { Button, Label } from "../../digdir";
import { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

export interface FilePickerFilesProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function FilePickerFiles({
  className,
  ...rest
}: Readonly<FilePickerFilesProps>) {
  const { files, onRemove, disabled } = use(FilePickerContext);

  if (!files?.length) {
    return null;
  }

  return (
    <div className={clsx("at-filepicker-files", className)} {...rest}>
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} className="at-filepicker-file">
          <FileIcon aria-hidden="true" />
          <Label className="at-filepicker-file__name" title={file.name}>
            {file.name}
          </Label>
          <Label className="at-filepicker-file__size" data-size="sm">
            ({formatFileSize(file.size)})
          </Label>
          <Button
            icon
            variant="tertiary"
            data-size="sm"
            onClick={() => onRemove(file)}
            disabled={disabled}
            aria-label={`Remove ${file.name}`}
          >
            <XMarkIcon aria-hidden />
          </Button>
        </div>
      ))}
    </div>
  );
}
