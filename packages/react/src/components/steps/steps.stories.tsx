import { FilePlusIcon, HandshakeIcon, HeartIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentPropsWithoutRef } from "react";
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
  title: "Designsystem/Steps",
  component: Steps,
  parameters: {
    layout: "padded",
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

export const Default: Story = {
  render: () => (
    <Steps>
      <Steps.Step>
        <Steps.StepMark>
          <HeartIcon />
        </Steps.StepMark>
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </Steps.Step>
      <Steps.Step aria-current="step" data-color="danger">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </Steps.Step>
    </Steps>
  ),
};

export const React: Story = {
  render: () => (
    <Steps>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 1</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 2</strong>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </Steps.Step>
    </Steps>
  ),
};

export const WithStateComplete: Story = {
  render: () => (
    <Steps data-state="complete">
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </Steps.Step>
    </Steps>
  ),
};

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
            <strong>Steg 1</strong> Beskrivelse
          </Steps.Step>
          <Steps.Step data-color="danger">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 4</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 5</strong>
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
            <strong>Steg 1</strong> Beskrivelse
          </Steps.Step>
          <Steps.Step data-color="danger">
            <Steps.StepMark />
            <strong>Steg 2</strong>
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
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 4</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 5</strong>
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
            <strong>Steg 5</strong> Beskrivelse
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 4</strong>
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
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
        </Steps>
      </Grid>
    </Flex>
  ),
};

export const WithFade: Story = {
  render: () => (
    <>
      <strong>
        No <code>data-fade</code>:
      </strong>
      <Steps>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade</code>:
      </strong>
      <Steps data-fade>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade="start"</code>:
      </strong>
      <Steps data-fade="start">
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
      <strong>
        With <code>data-fade="end"</code>:
      </strong>
      <Steps data-fade="end">
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
    </>
  ),
};

export const WithFadeAndDirection: Story = {
  render: () => (
    <Flex data-items="500" data-gap="14">
      <Grid data-gap="14">
        <strong>
          With <code>data-direction="down"</code> and <code>data-fade</code>:
        </strong>
        <Steps data-fade data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="end"</code>:
        </strong>
        <Steps data-fade="end" data-direction="down">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
        </Steps>
      </Grid>
      <Grid data-gap="14">
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade</code>:
        </strong>
        <Steps data-fade data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade="end"</code>
          :
        </strong>
        <Steps data-fade="end" data-direction="up">
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </Steps.Step>
        </Steps>
      </Grid>
    </Flex>
  ),
};

export const WithColors: Story = {
  render: () => (
    <Steps>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </Steps.Step>
      <Steps.Step data-color="danger">
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </Steps.Step>
      <Steps.Step data-color="warning">
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </Steps.Step>
    </Steps>
  ),
};

export const WithVariantFilled: Story = {
  render: () => (
    <>
      <Steps data-variant="filled">
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
      <Steps data-variant="filled" data-direction="down">
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </Steps.Step>
        <Steps.Step data-color="danger" aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
      <Steps data-variant="filled" data-direction="up">
        <Steps.Step>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </Steps.Step>
        <Steps.Step data-color="danger" aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </Steps.Step>
        <Steps.Step data-color="danger">
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </Steps.Step>
      </Steps>
    </>
  ),
};

export const WithInteraction: Story = {
  render: () => (
    <Steps>
      <Steps.Step>
        <a href="#none">
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </a>
      </Steps.Step>
      <Steps.Step>
        <a href="#none">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </a>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <button type="button">
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </button>
      </Steps.Step>
      <Steps.Step>
        <button type="button">
          <Steps.StepMark />
          <strong>Steg 4</strong>
        </button>
      </Steps.Step>
    </Steps>
  ),
};

export const Timeline: Story = {
  parameters: { showInOverview: true },
  render: () => (
    <Steps data-direction="up">
      <Steps.Step data-color="main">
        <Steps.StepMark>
          <HeartIcon />
        </Steps.StepMark>
        <strong>06.04.2025</strong> Enighet om løsning
      </Steps.Step>
      <Steps.Step data-color="main">
        <Steps.StepMark>
          <HandshakeIcon />
        </Steps.StepMark>
        <strong>05.04.2025</strong> Oppfølgingsmøte gjennomført
        <br />
        Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
        scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur a.
        Proin nec vulputate erat. Proin venenatis aliquam justo at venenatis.
        Proin pharetra turpis sem, et consectetur nunc fringilla vitae. Morbi
        molestie eleifend libero, et posuere magna semper non. Nullam dictum
        massa non nibh sagittis vestibulum.
      </Steps.Step>
      <Steps.Step data-color="main">
        <Steps.StepMark>
          <FilePlusIcon />
        </Steps.StepMark>
        <strong>01.02.2025</strong> Sak opprettet
      </Steps.Step>
    </Steps>
  ),
};
