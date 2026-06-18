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
  title: "Arbeidstilsynet/Steps",
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
            <Steps.StepTitle>Steg 1</Steps.StepTitle> Beskrivelse
          </Steps.Step>
          <Steps.Step data-color="danger">
            <Steps.StepMark />
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
          <Steps.Step data-color="danger">
            <Steps.StepMark />
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
      <Steps data-fade>
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
        <Steps data-fade data-direction="up">
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

export const WithColors: Story = {
  render: () => (
    <Steps>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 1</Steps.StepTitle>
        <br />
        <small>Beskrivelse</small>
      </Steps.Step>
      <Steps.Step data-color="danger">
        <Steps.StepMark />
        <Steps.StepTitle>Steg 2</Steps.StepTitle>
        <br />
        <small>Donec et odio</small>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <Steps.StepMark />
        <Steps.StepTitle>Steg 3</Steps.StepTitle>
      </Steps.Step>
      <Steps.Step data-color="warning">
        <Steps.StepMark />
        <Steps.StepTitle>Steg 4</Steps.StepTitle>
      </Steps.Step>
      <Steps.Step>
        <Steps.StepMark />
        <Steps.StepTitle>Steg 5</Steps.StepTitle>
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
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <Steps data-variant="filled" data-direction="down">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step data-color="danger" aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>
      <Steps data-variant="filled" data-direction="up">
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step data-color="danger" aria-current="step">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </Steps.Step>
        <Steps.Step data-color="danger">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
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
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
        </a>
      </Steps.Step>
      <Steps.Step>
        <a href="#none">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
          <Steps.StepDescription>Donec et odio</Steps.StepDescription>
        </a>
      </Steps.Step>
      <Steps.Step aria-current="step">
        <button type="button">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </button>
      </Steps.Step>
      <Steps.Step>
        <button type="button">
          <Steps.StepMark />
          <Steps.StepTitle>Steg 4</Steps.StepTitle>
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
        <Steps.StepTitle>06.04.2025</Steps.StepTitle> Enighet om løsning
      </Steps.Step>
      <Steps.Step data-color="main">
        <Steps.StepMark>
          <HandshakeIcon />
        </Steps.StepMark>
        <Steps.StepTitle>05.04.2025</Steps.StepTitle> Oppfølgingsmøte gjennomført
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
        <Steps.StepTitle>01.02.2025</Steps.StepTitle> Sak opprettet
      </Steps.Step>
    </Steps>
  ),
};
