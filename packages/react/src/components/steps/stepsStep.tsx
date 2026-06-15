import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface StepsStepProps
  extends DefaultProps<HTMLLIElement>, HTMLAttributes<HTMLLIElement> {
}

export function StepsStep(props: Readonly<StepsStepProps>) {
  return (
    <li {...props} />
  );
}
