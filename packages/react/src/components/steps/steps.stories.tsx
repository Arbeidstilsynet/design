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
      <li>
        <Steps.StepMark>
          <HeartIcon />
        </Steps.StepMark>
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </li>
      <li aria-current="step" data-color="danger">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </li>
    </Steps>
  ),
};

export const React: Story = {
  render: () => (
    <Steps>
      <li>
        <Steps.StepMark />
        <strong>Steg 1</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 2</strong>
      </li>
      <li aria-current="step">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </li>
    </Steps>
  ),
};

export const WithStateComplete: Story = {
  render: () => (
    <Steps data-state="complete">
      <li>
        <Steps.StepMark />
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </li>
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
          <li>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <strong>Steg 1</strong> Beskrivelse
          </li>
          <li data-color="danger">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 4</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 5</strong>
          </li>
        </Steps>
      </Grid>
      <Grid>
        <strong>
          With <code>data-direction="down"</code>:
        </strong>
        <Steps data-direction="down">
          <li>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <strong>Steg 1</strong> Beskrivelse
          </li>
          <li data-color="danger">
            <Steps.StepMark />
            <strong>Steg 2</strong>
            <br />
            Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
            scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
            a. Proin nec vulputate erat. Proin venenatis aliquam justo at
            venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
            vitae. Morbi molestie eleifend libero, et posuere magna semper non.
            Nullam dictum massa non nibh sagittis vestibulum.
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 4</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 5</strong>
          </li>
        </Steps>
      </Grid>
      <Grid>
        <strong>
          With <code>data-direction="up"</code>:
        </strong>
        <Steps data-direction="up">
          <li>
            <Steps.StepMark>
              <HeartIcon />
            </Steps.StepMark>
            <strong>Steg 5</strong> Beskrivelse
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 4</strong>
            <br />
            Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
            scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
            a. Proin nec vulputate erat. Proin venenatis aliquam justo at
            venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
            vitae. Morbi molestie eleifend libero, et posuere magna semper non.
            Nullam dictum massa non nibh sagittis vestibulum.
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
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
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </li>
        <li aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
      <strong>
        With <code>data-fade</code>:
      </strong>
      <Steps data-fade>
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </li>
        <li aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
      <strong>
        With <code>data-fade="start"</code>:
      </strong>
      <Steps data-fade="start">
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </li>
        <li aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
      <strong>
        With <code>data-fade="end"</code>:
      </strong>
      <Steps data-fade="end">
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
        </li>
        <li aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
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
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="down">
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
        </Steps>
        <strong>
          With <code>data-direction="down"</code> and{" "}
          <code>data-fade="end"</code>:
        </strong>
        <Steps data-fade="end" data-direction="down">
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
        </Steps>
      </Grid>
      <Grid data-gap="14">
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade</code>:
        </strong>
        <Steps data-fade data-direction="up">
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and{" "}
          <code>data-fade="start"</code>:
        </strong>
        <Steps data-fade="start" data-direction="up">
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
        </Steps>
        <strong>
          With <code>data-direction="up"</code> and <code>data-fade="end"</code>
          :
        </strong>
        <Steps data-fade="end" data-direction="up">
          <li>
            <Steps.StepMark />
            <strong>Steg 3</strong>
          </li>
          <li aria-current="step">
            <Steps.StepMark />
            <strong>Steg 2</strong>
          </li>
          <li>
            <Steps.StepMark />
            <strong>Steg 1</strong>
          </li>
        </Steps>
      </Grid>
    </Flex>
  ),
};

export const WithColors: Story = {
  render: () => (
    <Steps>
      <li>
        <Steps.StepMark />
        <strong>Steg 1</strong>
        <br />
        <small>Beskrivelse</small>
      </li>
      <li data-color="danger">
        <Steps.StepMark />
        <strong>Steg 2</strong>
        <br />
        <small>Donec et odio</small>
      </li>
      <li aria-current="step">
        <Steps.StepMark />
        <strong>Steg 3</strong>
      </li>
      <li data-color="warning">
        <Steps.StepMark />
        <strong>Steg 4</strong>
      </li>
      <li>
        <Steps.StepMark />
        <strong>Steg 5</strong>
      </li>
    </Steps>
  ),
};

export const WithVariantFilled: Story = {
  render: () => (
    <>
      <Steps data-variant="filled">
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </li>
        <li aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
      <Steps data-variant="filled" data-direction="down">
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </li>
        <li data-color="danger" aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </li>
        <li>
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
      <Steps data-variant="filled" data-direction="up">
        <li>
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </li>
        <li data-color="danger" aria-current="step">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </li>
        <li data-color="danger">
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </li>
      </Steps>
    </>
  ),
};

export const WithInteraction: Story = {
  render: () => (
    <Steps>
      <li>
        <a href="#none">
          <Steps.StepMark />
          <strong>Steg 1</strong>
          <br />
          <small>Beskrivelse</small>
        </a>
      </li>
      <li>
        <a href="#none">
          <Steps.StepMark />
          <strong>Steg 2</strong>
          <br />
          <small>Donec et odio</small>
        </a>
      </li>
      <li aria-current="step">
        <button type="button">
          <Steps.StepMark />
          <strong>Steg 3</strong>
        </button>
      </li>
      <li>
        <button type="button">
          <Steps.StepMark />
          <strong>Steg 4</strong>
        </button>
      </li>
    </Steps>
  ),
};

export const Timeline: Story = {
  parameters: { showInOverview: true },
  render: () => (
    <Steps data-direction="up">
      <li data-color="main">
        <Steps.StepMark>
          <HeartIcon />
        </Steps.StepMark>
        <strong>06.04.2025</strong> Enighet om løsning
      </li>
      <li data-color="main">
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
      </li>
      <li data-color="main">
        <Steps.StepMark>
          <FilePlusIcon />
        </Steps.StepMark>
        <strong>01.02.2025</strong> Sak opprettet
      </li>
    </Steps>
  ),
};
