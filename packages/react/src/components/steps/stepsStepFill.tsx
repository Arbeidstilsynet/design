/*
 * Portions of this file are based on Steps from Mattilsynet Design System (https://github.com/Mattilsynet/design)
 * Copyright (c) 2024 Mattilsynet
 * Licensed under the MIT License
 */

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
