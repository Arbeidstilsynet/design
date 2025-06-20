import { FileIcon, XMarkIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { Fragment, HTMLAttributes, use } from "react";
import { Button, Label, ValidationMessage } from "../../digdir";
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
      {files.map(({ id, file, error }) => (
        <Fragment key={id}>
          <div className="at-filepicker-file">
            <FileIcon aria-hidden="true" fontSize="1.5em" />

            <div className="at-filepicker-file__content">
              <Label
                className="at-filepicker-file__name"
                title={file.name}
                data-color="brand-1"
              >
                {file.name}
              </Label>
              {error && (
                <ValidationMessage
                  className="at-filepicker-file__error"
                  data-color="danger"
                  data-size="sm"
                  title={error}
                >
                  {error}
                </ValidationMessage>
              )}
            </div>

            <Label className="at-filepicker-file__size" data-size="sm" asChild>
              <span>({formatFileSize(file.size)})</span>
            </Label>

            <Button
              icon
              variant="tertiary"
              data-size="sm"
              onClick={() => onRemove(id)}
              disabled={disabled}
              aria-label={`Remove ${file.name}`}
            >
              <XMarkIcon aria-hidden />
            </Button>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
