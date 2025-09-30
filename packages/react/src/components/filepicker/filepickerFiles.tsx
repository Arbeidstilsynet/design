import { FileTextIcon, TrashIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { type HTMLAttributes, use } from "react";
import { Button, Link, Table } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";
import { formatFileSize } from "./utils";

export interface FilePickerFilesProps
  extends DefaultProps<HTMLTableElement>,
    HTMLAttributes<HTMLTableElement> {
  /**
   * Custom column names for the file table.
   */
  columnNames?: [string, string, string];
}

/**
 * Displays files added to the parent `FilePicker` component.
 */
export function FilePickerFiles({
  className,
  columnNames = ["Navn", "Størrelse", ""],
  ...rest
}: Readonly<FilePickerFilesProps>) {
  const { files, onRemove, disabled } = use(FilePickerContext);

  if (!files?.length) {
    return null;
  }

  return (
    <Table className={clsx("at-filepicker-files-table", className)} {...rest}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell title={columnNames[0]}>
            {columnNames[0]}
          </Table.HeaderCell>
          <Table.HeaderCell title={columnNames[1]}>
            {columnNames[1]}
          </Table.HeaderCell>
          <Table.HeaderCell title={columnNames[2]}>
            {columnNames[2]}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {files.map(({ id, file, hasError }) => {
          const size = formatFileSize(file.size);
          return (
            <Table.Row key={id} data-error={hasError}>
              <Table.Cell
                title={file.name}
                className="at-filepicker-files-file__name"
                data-color="info"
              >
                <Link
                  href={disabled ? undefined : URL.createObjectURL(file)}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={disabled}
                >
                  <FileTextIcon aria-hidden="true" fontSize="1.5em" />
                  <span className="at-filepicker-files-file__text">
                    {file.name}
                  </span>
                </Link>
              </Table.Cell>
              <Table.Cell title={size}>{size}</Table.Cell>
              <Table.Cell data-color="danger">
                <Button
                  variant="tertiary"
                  data-size="sm"
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                  onClick={() => onRemove(id)}
                >
                  Fjern
                  <TrashIcon aria-hidden />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
