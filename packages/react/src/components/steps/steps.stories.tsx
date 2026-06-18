import {
  ExclamationmarkTriangleIcon,
  HeartIcon,
  InformationIcon,
  PersonChatIcon,
} from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, type ComponentPropsWithoutRef } from "react";
import { Steps } from "..";

type StoryLayoutProps = ComponentPropsWithoutRef<"div"> & {
  "data-gap"?: string | number;
  "data-items"?: string | number;
};

function toDsSizeToken(value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return `var(--ds-size-${value})`;
}

function Flex({
  children,
  style,
  "data-gap": dataGap,
  "data-items": _dataItems,
  ...rest
}: StoryLayoutProps) {
  return (
    <div
      {...rest}
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexWrap: "wrap",
        gap: toDsSizeToken(dataGap) ?? "var(--ds-size-14)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Grid({
  children,
  style,
  "data-gap": dataGap,
  ...rest
}: StoryLayoutProps) {
  return (
    <div
      {...rest}
      style={{
        display: "grid",
        gap: toDsSizeToken(dataGap) ?? "var(--ds-size-14)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Steps> = {
  title: "Arbeidstilsynet/Steps",
  component: Steps,
  parameters: {
    layout: "padded",
  },
  subcomponents: {
    ["Steps.Step"]: Steps.Step,
    ["Steps.StepMark"]: Steps.StepMark,
    ["Steps.StepTitle"]: Steps.StepTitle,
    ["Steps.StepDescription"]: Steps.StepDescription,
    ["Steps.StepDetails"]: Steps.StepDetails,
    ["Steps.StepFill"]: Steps.StepFill,
  },
  decorators: [
    (Story) => (
      <Grid data-gap="14">
        <Story />
      </Grid>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Steps with all sub-components: `StepMark`, `StepTitle`, `StepDescription`, and `StepDetails`.
 * The third step is marked as the current step with `aria-current="step"`.
 */
export const Default: Story = {
  render: (args) => (
    <Steps {...args}>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 1</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 2</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <Steps.StepMark />
        <Steps.StepTitle>Steg 3</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 4</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 5</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 6</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
    </Steps>
  ),
};

/**
 * All steps are marked as completed using `data-state="complete"`.
 * Use this to indicate a finished process.
 */
export const WithStateComplete: Story = {
  render: () => (
    <Steps data-state="complete">
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 1</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 2</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 3</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 4</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 5</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 6</Steps.StepTitle>
        <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        <Steps.StepDetails>Detaljer</Steps.StepDetails>
      </Steps.Step>
    </Steps>
  ),
};

/**
 * Demonstrates all three `data-direction` values.
 *
 * - `"right"` (default): horizontal layout.
 * - `"down"`: vertical layout, progressing top to bottom.
 * - `"up"`: vertical layout, progressing bottom to top.
 */
export const WithDirection: Story = {
  render: () => (
    <Flex data-items="500" data-gap="14">
      <Grid style={{ flexBasis: "100%" }}>
        <strong>
          With <code>data-direction="right"</code>:
        </strong>
        <Steps data-direction="right">
          <Steps.Step>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark data-color="danger" />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 4</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 5</Steps.StepTitle>
          </Steps.Step>
        </Steps>
      </Grid>
      <Grid>
        <strong>
          With <code>data-direction="down"</code>:
        </strong>
        <Steps data-direction="down">
          <Steps.Step>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <Steps.StepTitle>Steg 1</Steps.StepTitle> Beskrivelse
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark data-color="danger" />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
            <br />
            Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
            scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
            a. Proin nec vulputate erat. Proin venenatis aliquam justo at
            venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
            vitae. Morbi molestie eleifend libero, et posuere magna semper non.
            Nullam dictum massa non nibh sagittis vestibulum.
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 4</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 5</Steps.StepTitle>
          </Steps.Step>
        </Steps>
      </Grid>
      <Grid>
        <strong>
          With <code>data-direction="up"</code>:
        </strong>
        <Steps data-direction="up">
          <Steps.Step>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <Steps.StepTitle>Steg 5</Steps.StepTitle> Beskrivelse
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 4</Steps.StepTitle>
            <br />
            Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
            scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
            a. Proin nec vulputate erat. Proin venenatis aliquam justo at
            venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
            vitae. Morbi molestie eleifend libero, et posuere magna semper non.
            Nullam dictum massa non nibh sagittis vestibulum.
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
        </Steps>
      </Grid>
    </Flex>
  ),
};

/**
 * Demonstrates the `data-fade` prop which dims steps away from the active one.
 *
 * - No `data-fade`: No fade effect is applied
 * - `data-fade="start"`: Apply fade effect before first step
 * - `data-fade="end"`: Apply fade effect after last step
 * - `data-fade="both"`: Apply fade effect before first step and after last step
 * - `data-fade="none"`: No fade effect is applied
 */
export const WithFade: Story = {
  render: () => (
    <>
      <strong>
        No <code>data-fade</code>:
      </strong>
      <Steps>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade</code>:
      </strong>
      <Steps data-fade="both">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade="start"</code>:
      </strong>
      <Steps data-fade="start">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade="end"</code>:
      </strong>
      <Steps data-fade="end">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
    </>
  ),
};

/**
 * Combines `data-fade` with vertical `data-direction` values.
 * Shows how fading works alongside `"down"` and `"up"` layouts.
 */
export const WithFadeAndDirection: Story = {
  render: () => (
    <Flex data-items="500" data-gap="14">
      <Grid data-gap="14">
        <strong>
          With <code>data-direction="down"</code> and <code>data-fade</code>:
        </strong>
        <Steps data-fade="both" data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="end"</code>:
        </strong>
        <Steps data-fade="end" data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
        </Steps>
      </Grid>
      <Grid data-gap="14">
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade</code>:
        </strong>
        <Steps data-fade="both" data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade="end"</code>
          :
        </strong>
        <Steps data-fade="end" data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
        </Steps>
      </Grid>
    </Flex>
  ),
};

/**
 * Uses `data-color` on individual `Steps.Step` or `Steps.StepMark` elements
 * to highlight specific steps (e.g., warnings, errors, or informational steps).
 */
export const WithColors: Story = {
  render: () => (
    <Flex data-items="500" data-gap="14">
      <Grid data-gap="14">
        <strong>
          With <code>data-color="warning"</code>:
        </strong>
        <Steps>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark data-color="danger" />
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark data-color="warning" />
            <Steps.StepTitle>Steg 4</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 5</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <Steps.StepTitle>Steg 6</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </Steps.Step>
        </Steps>
        {["info", "warning", "neutral"].map((color) => (
          <React.Fragment key={color}>
            <strong>
              With <code>data-color="{color}"</code> and{" "}
              <code>aria-current="step"</code>:
            </strong>
            <Steps>
              <Steps.Step>
                <Steps.StepMark />
                <Steps.StepTitle>Steg 1</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
              <Steps.Step>
                <Steps.StepMark data-color="danger" />
                <Steps.StepTitle>Steg 2</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
              <Steps.Step>
                <Steps.StepMark />
                <Steps.StepTitle>Steg 3</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
              <Steps.Step aria-current="step">
                <Steps.StepMark data-color={color} />
                <Steps.StepTitle>Steg 4</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
              <Steps.Step>
                <Steps.StepMark />
                <Steps.StepTitle>Steg 5</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
              <Steps.Step>
                <Steps.StepMark />
                <Steps.StepTitle>Steg 6</Steps.StepTitle>
                <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
                <Steps.StepDetails>Detaljer</Steps.StepDetails>
              </Steps.Step>
            </Steps>
          </React.Fragment>
        ))}
      </Grid>
    </Flex>
  ),
};

/**
 * Uses `Steps.StepFill` inside the active step to render a filled progress indicator
 * instead of the default dot mark.
 */
export const WithVariantFilled: Story = {
  render: () => (
    <>
      <Steps>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepFill />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <Steps data-direction="down">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark data-color="danger" />
          <Steps.StepFill data-color="danger" />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <Steps data-direction="up">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark data-color="warning" />
          <Steps.StepFill data-color="warning" />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark data-color="danger" />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
    </>
  ),
};

const InteractiveStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Steps>
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <Steps.Step
          aria-current={activeStep === step ? "step" : undefined}
          key={step}
        >
          <button type="button" onClick={() => setActiveStep(step)}>
            <Steps.StepMark data-color={step === 2 ? "warning" : undefined} />
            <Steps.StepTitle>Steg {step}</Steps.StepTitle>
            <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
            <Steps.StepDetails>Detaljer</Steps.StepDetails>
          </button>
        </Steps.Step>
      ))}
    </Steps>
  );
};

/**
 * Interactive example where clicking a step mark sets it as the active step.
 * Demonstrates controlled usage with `aria-current="step"`.
 */
export const WithInteraction: Story = {
  render: () => <InteractiveStepsComponent />,
};

export const Timeline: Story = {
  parameters: { showInOverview: true },
  render: () => (
    <Steps data-direction="up" data-state="complete" data-fade="start">
      <Steps.Step>
        <Steps.StepMark>
          <ExclamationmarkTriangleIcon />
        </Steps.StepMark>
        <Steps.StepTitle>Varsel om nedetid</Steps.StepTitle>
        <Steps.StepDescription>
          Tidskontroll vil være utilgjengelig fra fredag 17.04.2026 kl 21 til
          lørdag 18.04.2026 ca. kl 14.
        </Steps.StepDescription>
        <Steps.StepDetails>I går av Per Hansen</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark>
          <InformationIcon />
        </Steps.StepMark>
        <Steps.StepTitle>Ny versjon</Steps.StepTitle>
        <Steps.StepDescription>
          Sortering av brudd i vedleggsrapporter er nå kronologisk, mm. Se
          versjonshistorikk.
        </Steps.StepDescription>
        <Steps.StepDetails>05.05.2026 kl 16.33</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark>
          <PersonChatIcon />
        </Steps.StepMark>
        <Steps.StepTitle>Søker testere</Steps.StepTitle>
        <Steps.StepDescription>
          Til å teste ny funksjonalitet i Tidskontroll.
        </Steps.StepDescription>
        <Steps.StepDetails>02.04.2026 kl 09.30</Steps.StepDetails>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark>
          <InformationIcon />
        </Steps.StepMark>
        <Steps.StepTitle>Ny versjon</Steps.StepTitle>
        <Steps.StepDescription>
          Sortering av brudd i vedleggsrapporter er nå kronologisk, mm. Se
          versjonshistorikk.
        </Steps.StepDescription>
        <Steps.StepDetails>21.02.2026 kl 15.45</Steps.StepDetails>
      </Steps.Step>
    </Steps>
  ),
};
