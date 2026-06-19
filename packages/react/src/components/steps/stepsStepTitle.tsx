// Based on the Steps component by Mattilsynet
// https://github.com/Mattilsynet/design/tree/next/designsystem/steps

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepTitleProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {}

export function StepsStepTitle({
  className,
  ...rest
}: Readonly<StepsStepTitleProps>) {
  return <strong className={clsx("at-steps__title", className)} {...rest} />;
}
