import { Steps as StepsParent } from "./steps";
import { StepsStep } from "./stepsStep";
import { StepsStepDescription } from "./stepsStepDescription";
import { StepsStepDetails } from "./stepsStepDetails";
import { StepsStepFill } from "./stepsStepFill";
import { StepsStepMark } from "./stepsStepMark";
import { StepsStepTitle } from "./stepsStepTitle";

export type { StepsProps } from "./steps";
export type { StepsStepProps } from "./stepsStep";
export type { StepsStepDescriptionProps } from "./stepsStepDescription";
export type { StepsStepDetailsProps } from "./stepsStepDetails";
export type { StepsStepFillProps } from "./stepsStepFill";
export type { StepsStepMarkProps } from "./stepsStepMark";
export type { StepsStepTitleProps } from "./stepsStepTitle";

const Steps = Object.assign(StepsParent, {
  Step: StepsStep,
  StepDescription: StepsStepDescription,
  StepDetails: StepsStepDetails,
  StepFill: StepsStepFill,
  StepMark: StepsStepMark,
  StepTitle: StepsStepTitle,
});

export {
  Steps,
  StepsStep, StepsStepDescription, StepsStepDetails, StepsStepFill, StepsStepMark,
  StepsStepTitle
};

