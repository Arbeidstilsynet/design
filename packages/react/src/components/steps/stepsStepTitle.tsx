/*
 * Portions of this file are based on Steps from Mattilsynet Design System (https://github.com/Mattilsynet/design)
 * Copyright (c) 2024 Mattilsynet
 * Licensed under the MIT License
 */

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
