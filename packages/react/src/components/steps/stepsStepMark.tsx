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

/**
 * Renders the visual indicator (dot) for a step.
 *
 * Two usage modes:
 * - **With children** — pass an icon element as children; it will be rendered
 *   inside the dot at the correct size and colour.
 * - **Without children** — leave empty and control appearance with `data-color`:
 *   - No `data-color`: inherits the auto-state (empty dot, check when passed, etc.)
 *   - `"danger"` or `"warning"`: filled dot with a close (×) icon.
 *   - `"info"`: filled dot with an info (!) icon.
 *   - Any other palette value: filled dot in that colour with no icon.
 */
export function StepsStepMark({
  className,
  ...rest
}: Readonly<StepsStepMarkProps>) {
  return <mark className={clsx("at-steps__step-mark", className)} {...rest} />;
}
