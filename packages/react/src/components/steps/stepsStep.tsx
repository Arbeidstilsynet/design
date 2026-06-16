import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepProps
  extends DefaultProps<HTMLLIElement>, HTMLAttributes<HTMLLIElement> {
}

export function StepsStep({
  className,
  ...rest
}: Readonly<StepsStepProps>) {
  return (
    <li className={clsx("at-steps__step", className)} {...rest} />
  );
}
