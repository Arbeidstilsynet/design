import { Steps as StepsParent } from "./steps";
import { StepsStepMark } from "./stepsStepMark";

export type { StepsProps } from "./steps";

const Steps = Object.assign(StepsParent, {
  StepMark: StepsStepMark,
});

export {
  Steps,
  StepsStepMark
};

