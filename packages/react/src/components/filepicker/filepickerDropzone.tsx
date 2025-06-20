import { CloudUpIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { use } from "react";
import { useDropzone } from "react-dropzone";
import { Button, ButtonProps, Label, Spinner } from "../../digdir";
import { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

function DefaultLabel({
  defaultLabelText,
}: Pick<FilePickerDropzoneProps, "defaultLabelText">) {
  const text1 = defaultLabelText?.[0];
  const text2 = defaultLabelText?.[1];
  return (
    <>
      <span style={{ display: "flex", flexFlow: "row" }}>
        <CloudUpIcon />
        <Label
          style={{
            textDecoration: "underline",
          }}
        >
          {text1}
        </Label>
      </span>
      {text2 && <Label>{text2}</Label>}
    </>
  );
}

export interface FilePickerDropzoneProps
  extends DefaultProps<HTMLButtonElement>,
    Omit<ButtonProps, "children" | "asChild" | "variant" | "type" | "icon"> {
  /** Replace the default label nodes. Should use `<Label>` or other typography. */
  label?: React.ReactNode;

  /**
   *  Replace the text in default label.
   *  Pass an array with one or two strings.
   *  If only one is passed, the second line is not displayed.
   *  */
  defaultLabelText?: [string] | [string, string];

  /** Label text shown when a file is dragged over the dropzone */
  dropLabel?: string;
}

export function FilePickerDropzone({
  className,
  label,
  defaultLabelText = ["Last opp fil", "Filformater: pdf, txt og docx"],
  dropLabel = "Slipp for å legge til",
  ...rest
}: Readonly<FilePickerDropzoneProps>) {
  const { onAdd, disabled, isWaiting } = use(FilePickerContext);

  const onDrop = (acceptedFiles: File[]) => {
    void onAdd(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Button
      className={clsx("at-filepicker-dropzone", className)}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={disabled || isWaiting}
      {...getRootProps({ role: "button", ...rest })}
    >
      <input {...getInputProps()} />
      {isWaiting && <Spinner aria-label="Processing files" data-size="lg" />}
      {!isWaiting &&
        (isDragActive ? (
          <Label>{dropLabel}</Label>
        ) : (
          (label ?? <DefaultLabel defaultLabelText={defaultLabelText} />)
        ))}
    </Button>
  );
}
