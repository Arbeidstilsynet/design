import { clsx } from "clsx/lite";
import { type HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsProps
  extends DefaultProps<HTMLOListElement>, HTMLAttributes<HTMLOListElement> {
  "data-direction"?: "right" | "up" | "down";
  "data-fade"?: boolean | "true" | "false" | "none" | "start" | "end";
  "data-state"?: "complete";
}

export function Steps({ className, ...rest }: Readonly<StepsProps>) {
  return <ol className={clsx("at-steps", className)} {...rest} />;
}
