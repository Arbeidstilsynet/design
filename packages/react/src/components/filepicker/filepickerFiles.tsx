import { FileIcon, TrashIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { Fragment, type HTMLAttributes, use } from "react";
import { Button, ValidationMessage } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";
import { formatFileSize } from "./utils";

export interface FilePickerFilesProps
  extends DefaultProps<HTMLUListElement>,
    HTMLAttributes<HTMLUListElement> {}

export function FilePickerFiles({
  className,
  ...rest
}: Readonly<FilePickerFilesProps>) {
  const { files, onRemove, disabled } = use(FilePickerContext);

  if (!files?.length) {
    return null;
  }

  return (
    <ul className={clsx("at-filepicker-files", className)} {...rest}>
      {files.map(({ id, file, error }) => (
        <Fragment key={id}>
          <li className="at-filepicker-file">
            <FileIcon aria-hidden="true" fontSize="1.5em" />

            <span className="at-filepicker-file__name" title={file.name}>
              {file.name}
            </span>

            <span className="at-filepicker-file__size" data-size="sm">
              ({formatFileSize(file.size)})
            </span>

            <Button
              icon
              variant="secondary"
              data-size="sm"
              disabled={disabled}
              aria-label={`Remove ${file.name}`}
              className="at-filepicker-file__remove"
              onClick={() => onRemove(id)}
            >
              <TrashIcon aria-hidden />
            </Button>

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
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
