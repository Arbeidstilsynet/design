import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepDescriptionProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
}

export function StepsStepDescription({
  className,
  ...rest
}: Readonly<StepsStepDescriptionProps>) {
  return (
    <small className={clsx("at-steps__description", className)} {...rest} />
  );
}
