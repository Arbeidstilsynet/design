import { FileIcon, XMarkIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { HTMLAttributes, use } from "react";
import { Button, Label } from "../../digdir";
import { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";
import { formatFileSize } from "./utils";

export interface FilePickerFilesProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {}

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
          <Label className="at-filepicker-file__size" data-size="sm" asChild>
            <span>({formatFileSize(file.size)})</span>
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
