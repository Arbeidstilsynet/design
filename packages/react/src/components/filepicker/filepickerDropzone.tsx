import { CloudUpIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { use, type HTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Label, Spinner } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

function DefaultLabel({
  defaultLabelText,
}: Pick<FilePickerDropzoneProps, "defaultLabelText">) {
  const text1 = defaultLabelText?.[0];
  const text2 = defaultLabelText?.[1];
  return (
    <>
      <span style={{ display: "flex", flexFlow: "row" }}>
        <CloudUpIcon title="Cloud" />
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
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
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
  const isDisabled = Boolean(disabled || isWaiting);

  const onDrop = (acceptedFiles: File[]) => {
    void onAdd(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true, // we trigger via the button
    noKeyboard: true, // native keyboard on the button
    disabled: isDisabled,
  });

  return (
    <div
      {...getRootProps({
        // Wrapper handles drag events only
        role: "group",
        "aria-disabled": isDisabled || undefined,
        className: clsx(
          "at-filepicker-dropzone-wrapper",
          isDisabled && "is-disabled",
          className,
        ),
        ...rest,
      })}
    >
      <input {...getInputProps()} aria-hidden />

      <Button
        type="button"
        disabled={isDisabled}
        loading={
          isWaiting && <Spinner aria-label="Processing files" data-size="lg" />
        }
        className={clsx("at-filepicker-dropzone", isDragActive && "is-drag")}
        onClick={() => {
          if (!isDisabled) open();
        }}
      >
        {!isWaiting &&
          (isDragActive ? (
            <Label>{dropLabel}</Label>
          ) : (
            (label ?? <DefaultLabel defaultLabelText={defaultLabelText} />)
          ))}
      </Button>
    </div>
  );
}
