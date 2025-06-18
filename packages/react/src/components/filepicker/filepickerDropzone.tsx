import { CloudUpIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { use } from "react";
import { useDropzone } from "react-dropzone";
import { Button, ButtonProps, Label } from "../..";
import { FilePickerContext } from "./filepickerContext";

function DefaultLabel() {
  return (
    <>
      <span style={{ display: "flex", flexFlow: "row" }}>
        <CloudUpIcon />
        <Label
          style={{
            textDecoration: "underline",
          }}
        >
          Last opp fil
        </Label>
      </span>
      <Label>Filformater: pdf, txt og docx</Label>
    </>
  );
}

export interface FilePickerDropzoneProps extends Omit<ButtonProps, "children"> {
  ref?: React.Ref<HTMLButtonElement>;

  /** Replace the default label nodes. Should use <Label> or other typography. */
  label?: React.ReactNode;

  dropLabel?: string;
}

export function FilePickerDropzone({
  ref,
  className,
  label,
  dropLabel = "Slipp for å legge til",
  ...rest
}: Readonly<FilePickerDropzoneProps>) {
  const { onAdd, disabled } = use(FilePickerContext);

  const onDrop = (acceptedFiles: File[]) => {
    void onAdd(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Button
      ref={ref}
      className={clsx("at-filepicker-dropzone", className)}
      disabled={disabled}
      {...rest}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? <Label>{dropLabel}</Label> : (label ?? <DefaultLabel />)}
    </Button>
  );
}
