import { clsx } from "clsx/lite";
import { HTMLAttributes, Ref } from "react";

export interface FilePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  ref?: Ref<HTMLDivElement>;
}

export function FilePicker({ ref, className, ...rest }: FilePickerProps) {
  return (
    <div ref={ref} className={clsx("at-filepicker", className)} {...rest}>
      Place Holder
    </div>
  );
}
