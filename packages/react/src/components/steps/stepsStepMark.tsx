import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepMarkProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {}

export function StepsStepMark({
  className,
  ...rest
}: Readonly<StepsStepMarkProps>) {
  return <mark className={clsx("at-steps__step-mark", className)} {...rest} />;
}
