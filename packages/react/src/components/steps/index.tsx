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

/**
 * Compound component for displaying a step-by-step progress indicator.
 *
 * ## Subcomponents
 *
 * - `Steps.Step` — Individual step item (renders as `<li>`)
 * - `Steps.StepMark` — Visual dot/icon for the step. Accepts an icon as child. Use `data-color` to override color.
 * - `Steps.StepTitle` — Label for the step
 * - `Steps.StepDescription` — Short secondary text below the title
 * - `Steps.StepDetails` — Additional detail text (e.g. body copy inside a vertical step)
 * - `Steps.StepFill` — Filled progress bar variant for the active step
 *
 * ## Props
 *
 * - `data-direction` — Layout direction: `"right"` (default, horizontal), `"down"`, or `"up"` (vertical)
 * - `data-fade` — Fades inactive steps: `"start"`, `"end"`, `"both"`, or `"none"`
 * - `data-state` — Set to `"complete"` to mark all steps as finished
 *
 * Mark the active step with `aria-current="step"` on `Steps.Step`.
 *
 * ## Usage
 *
 * ```tsx
 * <Steps>
 *   <Steps.Step>
 *     <Steps.StepMark />
 *     <Steps.StepTitle>Steg 1</Steps.StepTitle>
 *     <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
 *     <Steps.StepDetails>Detaljer</Steps.StepDetails>
 *   </Steps.Step>
 *   <Steps.Step aria-current="step">
 *     <Steps.StepMark />
 *     <Steps.StepTitle>Steg 2</Steps.StepTitle>
 *   </Steps.Step>
 *   <Steps.Step>
 *     <Steps.StepMark />
 *     <Steps.StepTitle>Steg 3</Steps.StepTitle>
 *   </Steps.Step>
 * </Steps>
 * ```
 */
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
  StepsStep,
  StepsStepDescription,
  StepsStepDetails,
  StepsStepFill,
  StepsStepMark,
  StepsStepTitle,
};
