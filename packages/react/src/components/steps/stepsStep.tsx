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
   * Set to `"complete"` to mark this individual step as completed,
   * regardless of the current active step. Shows a checkmark icon.
   */
  "data-state"?: "complete";
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
