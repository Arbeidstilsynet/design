import { CloudUpIcon } from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { use, type HTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Spinner } from "../../digdir";
import type { DefaultProps } from "../../types";
import { FilePickerContext } from "./filepickerContext";

function DefaultLabel({
  defaultLabelText,
}: Pick<FilePickerDropzoneProps, "defaultLabelText">) {
  const text1 = defaultLabelText?.[0];
  const text2 = defaultLabelText?.[1];
  const text3 = defaultLabelText?.[2];
  return (
    <>
      <CloudUpIcon title="Cloud" />
      <span style={{ display: "flex", flexFlow: "row" }}>
        {text1}
        <span
          style={{
            textDecoration: "underline",
          }}
        >
          {text2}
        </span>
      </span>
      {text3}
    </>
  );
}

export interface FilePickerDropzoneProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  /** Replace the default label nodes entirely. */
  label?: React.ReactNode;

  /**
   *  Replace the text in default label.
   *  Pass an array with one to three strings.
   *  The second string will be underlined, and the third will show on a new row.
   *  */
  defaultLabelText?: [string] | [string, string] | [string, string, string];

  /**
   * Label shown when a file is dragged over the dropzone.
   * If it's a string it will be underlined.
   */
  dropLabel?: string | React.ReactNode;
}

export function FilePickerDropzone({
  className,
  label,
  defaultLabelText = [
    "Dra og slipp eller",
    "Last opp fil",
    "Filformater: pdf, txt og docx",
  ],
  dropLabel = "Slipp for å legge til",
  ...rest
}: Readonly<FilePickerDropzoneProps>) {
  const { onAdd, disabled, isWaiting, errors } = use(FilePickerContext);
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

  const dragNode =
    typeof dropLabel === "string" ? (
      <span style={{ textDecoration: "underline" }}>{dropLabel}</span>
    ) : (
      dropLabel
    );

  return (
    <div
      {...getRootProps({
        // Wrapper handles drag events only
        role: "group",
        "aria-disabled": isDisabled || undefined,
        className: clsx("at-filepicker-dropzone-wrapper", className),
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
        className={clsx(
          "at-filepicker-dropzone",
          isDragActive && "is-drag",
          errors && errors.length > 0 && "has-error",
        )}
        onClick={() => {
          if (!isDisabled) open();
        }}
      >
        {!isWaiting &&
          (isDragActive
            ? dragNode
            : (label ?? <DefaultLabel defaultLabelText={defaultLabelText} />))}
      </Button>
    </div>
  );
}
