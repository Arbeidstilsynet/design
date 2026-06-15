import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepMarkProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
}

export function StepsStepMark(props: Readonly<StepsStepMarkProps>) {
  return (
    <mark {...props} />
  );
}
