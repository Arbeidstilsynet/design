import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepDetailsProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {}

export function StepsStepDetails({
  className,
  ...rest
}: Readonly<StepsStepDetailsProps>) {
  return <small className={clsx("at-steps__details", className)} {...rest} />;
}
