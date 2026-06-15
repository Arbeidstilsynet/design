import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepTitleProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
}

export function StepsStepTitle({
  className,
  ...rest
}: Readonly<StepsStepTitleProps>) {
  return (
    <strong className={clsx("at-steps__title", className)} {...rest} />
  );
}
