/*
 * Portions of this file are based on Steps from Mattilsynet Design System (https://github.com/Mattilsynet/design)
 * Copyright (c) 2024 Mattilsynet
 * Licensed under the MIT License
 */

import { clsx } from "clsx/lite";
import { type HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsProps
  extends DefaultProps<HTMLOListElement>, HTMLAttributes<HTMLOListElement> {
  /**
   * Controls the direction of the progression line connecting steps.
   *
   * - `"right"` (default): horizontal layout, line runs left to right.
   * - `"down"`: vertical layout, steps listed top to bottom.
   * - `"up"`: vertical layout, steps listed bottom to top.
   */
  "data-direction"?: "right" | "up" | "down";

  /**
   * Adds fade effect before first or after last step.
   *
   * - `"both"`: Apply fade effect before first step and after last step.
   * - `"start"`: Apply fade effect before first step.
   * - `"end"`: Apply fade effect after last step.
   * - `"none"`: No fade effect is applied.
   */
  "data-fade"?: "start" | "end" | "both" | "none";

  /**
   * Set to `"complete"` to mark all steps as completed.
   * Useful for displaying a finished process.
   */
  "data-state"?: "complete";
}

export function Steps({ className, ...rest }: Readonly<StepsProps>) {
  return <ol className={clsx("at-steps", className)} {...rest} />;
}
