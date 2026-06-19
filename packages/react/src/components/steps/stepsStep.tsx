// Based on the Steps component by Mattilsynet
// https://github.com/Mattilsynet/design/tree/next/designsystem/steps

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepProps
  extends DefaultProps<HTMLLIElement>, HTMLAttributes<HTMLLIElement> {
  /**
   * When true, the step is non-interactive and visually faint.
   */
  disabled?: boolean;

  /**
   * Marks this step as the current active step.
   * Set to `"step"` to indicate the user's current position in the sequence.
   * Steps before the current one are shown as completed; steps after are shown as upcoming.
   */
  "aria-current"?: "step" | HTMLAttributes<HTMLLIElement>["aria-current"];

  /**
   * Controls the completion appearance of this step's mark, overriding
   * automatic state derived from `aria-current`.
   *
   * - `"complete"`: Force the mark to appear checked (filled circle with
   *   checkmark), regardless of where the active step is.
   * - `"incomplete"`: Force the mark to appear unchecked (empty circle),
   *   even when the step would normally be auto-completed because a later
   *   step carries `aria-current="step"`.
   */
  "data-state"?: "complete" | "incomplete";
}

export function StepsStep({
  className,
  disabled,
  ...rest
}: Readonly<StepsStepProps>) {
  return (
    <li
      className={clsx("at-steps__step", className)}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  );
}
