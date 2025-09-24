import { FileIcon, TrashIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { Fragment, type HTMLAttributes, use } from "react";
import { Button, ValidationMessage } from "../../digdir";
import type { DefaultProps } from "../../types";
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
              <span className="at-filepicker-file__name" title={file.name}>
                {file.name}
              </span>
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

            <span className="at-filepicker-file__size" data-size="sm">
              ({formatFileSize(file.size)})
            </span>

            <Button
              icon
              variant="tertiary"
              data-size="sm"
              disabled={disabled}
              aria-label={`Remove ${file.name}`}
              className="at-filepicker-file__remove"
              onClick={() => onRemove(id)}
            >
              <TrashIcon aria-hidden />
            </Button>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
