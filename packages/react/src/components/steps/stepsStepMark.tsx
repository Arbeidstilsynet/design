import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepMarkProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
  /**
   * Sets the color and icon of the step mark.
   *
   * - `"danger"` or `"warning"`: shows a close (×) icon.
   * - `"info"`: shows an info (!) icon.
   * - Other values: uses the color palette's default filled style.
   */
  "data-color"?: string;
}

export function StepsStepMark({
  className,
  ...rest
}: Readonly<StepsStepMarkProps>) {
  return <mark className={clsx("at-steps__step-mark", className)} {...rest} />;
}
