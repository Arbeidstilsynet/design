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
   * Fades out steps that are not the current one (`aria-current="step"`).
   *
   * - `true` / `"true"`: fades both before and after the active step.
   * - `"start"`: fades only the steps before the active step.
   * - `"end"`: fades only the steps after the active step.
   * - `"none"` / `false` / `"false"`: no fading (default).
   */
  "data-fade"?: boolean | "true" | "false" | "none" | "start" | "end";

  /**
   * Set to `"complete"` to mark all steps as completed.
   * Useful for displaying a finished process.
   */
  "data-state"?: "complete";
}

export function Steps({ className, ...rest }: Readonly<StepsProps>) {
  return <ol className={clsx("at-steps", className)} {...rest} />;
}
