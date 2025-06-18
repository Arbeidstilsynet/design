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

function getFileTypeFromName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "PDF-dokument";
    case "doc":
    case "docx":
      return "Word-dokument";
    case "xls":
    case "xlsx":
      return "Excel-dokument";
    case "txt":
      return "Tekstfil";
    default:
      return "Fil";
  }
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

  const handleRemove = (file: File) => {
    void onRemove?.(file);
  };

  return (
    <div ref={ref} className={clsx("at-filepicker-files", className)} {...rest}>
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} className="at-filepicker-file">
          <div className="at-filepicker-file__info">
            <FileIcon className="at-filepicker-file__icon" aria-hidden="true" />
            <div className="at-filepicker-file__details">
              <Label className="at-filepicker-file__name">{file.name}</Label>
              <Label className="at-filepicker-file__meta">
                {getFileTypeFromName(file.name)} • {formatFileSize(file.size)}
              </Label>
            </div>
          </div>
          <Button
            variant="tertiary"
            data-size="sm"
            className="at-filepicker-file__remove"
            onClick={() => handleRemove(file)}
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
