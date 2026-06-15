import { Steps as StepsParent } from "./steps";
import { StepsStep } from "./stepsStep";
import { StepsStepMark } from "./stepsStepMark";

export type { StepsProps } from "./steps";
export type { StepsStepProps } from "./stepsStep";
export type { StepsStepMarkProps } from "./stepsStepMark";

const Steps = Object.assign(StepsParent, {
  Step: StepsStep,
  StepMark: StepsStepMark,
});

export {
  Steps,
  StepsStep,
  StepsStepMark
};

