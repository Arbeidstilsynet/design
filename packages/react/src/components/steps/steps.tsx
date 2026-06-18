import { clsx } from "clsx/lite";
import { forwardRef } from "react";

export type StepsProps = React.ComponentPropsWithoutRef<"ol"> & {
  "data-direction"?: "right" | "up" | "down";
  "data-fade"?: boolean | "true" | "false" | "none" | "start" | "end";
  "data-state"?: "complete";
  "data-variant"?: "filled";
};
export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { className, ...rest }: StepsProps,
  ref,
) {
  return <ol className={clsx("at-steps", className)} ref={ref} {...rest} />;
});
