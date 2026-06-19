// Based on the Steps component by Mattilsynet
// https://github.com/Mattilsynet/design/tree/next/designsystem/steps

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepFillProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {}

export function StepsStepFill({
  className,
  ...rest
}: Readonly<StepsStepFillProps>) {
  return <div className={clsx("at-steps__fill", className)} {...rest} />;
}
