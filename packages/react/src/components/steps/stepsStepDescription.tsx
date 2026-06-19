/*
 * Portions of this file are based on Steps from Mattilsynet Design System (https://github.com/Mattilsynet/design)
 * Copyright (c) 2024 Mattilsynet
 * Licensed under the MIT License
 */

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepDescriptionProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {}

export function StepsStepDescription({
  className,
  ...rest
}: Readonly<StepsStepDescriptionProps>) {
  return (
    <small className={clsx("at-steps__description", className)} {...rest} />
  );
}
