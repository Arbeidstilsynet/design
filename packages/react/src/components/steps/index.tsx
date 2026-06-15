import { Steps as StepsParent } from "./steps";
import { StepsStep } from "./stepsStep";
import { StepsStepDescription } from "./stepsStepDescription";
import { StepsStepMark } from "./stepsStepMark";
import { StepsStepTitle } from "./stepsStepTitle";

export type { StepsProps } from "./steps";
export type { StepsStepProps } from "./stepsStep";
export type { StepsStepDescriptionProps } from "./stepsStepDescription";
export type { StepsStepMarkProps } from "./stepsStepMark";
export type { StepsStepTitleProps } from "./stepsStepTitle";

const Steps = Object.assign(StepsParent, {
  Step: StepsStep,
  StepMark: StepsStepMark,
  StepTitle: StepsStepTitle,
  StepDescription: StepsStepDescription,
});

export {
  Steps,
  StepsStep, StepsStepDescription, StepsStepMark,
  StepsStepTitle
};
