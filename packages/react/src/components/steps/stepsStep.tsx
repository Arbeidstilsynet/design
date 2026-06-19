import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepProps
  extends DefaultProps<HTMLLIElement>, HTMLAttributes<HTMLLIElement> {
  /**
   * When true, the step is non-interactive and visually faint.
   */
  disabled?: boolean;
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
