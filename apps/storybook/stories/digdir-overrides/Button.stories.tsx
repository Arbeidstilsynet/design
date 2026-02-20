import { Button } from "@arbeidstilsynet/design-react";
import { ExternalLinkIcon, LaptopIcon } from "@navikt/aksel-icons";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { Fragment, type ReactNode } from "react";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "designsystemet.no/Button",
  component: Button,
  parameters: {
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
  },
};

export default meta;

export const Preview: Story = {
  render: ({ ...args }) => {
    return <Button {...args} />;
  },
  args: {
    children: "Knapp",
    disabled: false,
    variant: "primary",
    icon: false,
    ["data-color"]: "accent",
    ["data-size"]: "md",
  },
};

const buttonColors = [
  "accent",
  "neutral",
  "info",
  "warning",
  "danger",
] as const;
const buttonVariants = ["primary", "secondary", "tertiary"] as const;

const HelpText = ({ text }: { text: string }) => (
  <span
    style={{
      fontSize: "var(--ds-font-size-3)",
      color: `var(--ds-color-neutral-text-subtle)`,
    }}
  >
    {text}
  </span>
);

const ButtonGroupStory = ({
  ["data-size"]: size = "md",
  disabled = false,
  icon = false,
  children,
  rounded = false,
}: {
  ["data-size"]?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: boolean;
  children?: ReactNode;
  rounded?: boolean;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: new Array(buttonColors.length + 1)
        .fill("auto")
        .join(" "),
      gap: "var(--ds-size-4)",
      placeItems: "center",
    }}
  >
    {<div style={{ visibility: "hidden" }} />}

    {buttonColors.map((color) => (
      <HelpText key={color} text={color} />
    ))}

    {buttonVariants.map((variant) => (
      <Fragment key={variant}>
        <HelpText text={variant} />
        {buttonColors.map((color) => (
          <Button
            key={`${variant}-${color}`}
            variant={variant}
            data-color={color}
            data-size={size}
            disabled={disabled}
            icon={icon}
            style={rounded ? { borderRadius: "50%" } : undefined}
          >
            {children}
          </Button>
        ))}
      </Fragment>
    ))}
  </div>
);

const codeDocs = (code: string) => ({ docs: { source: { code } } });

export const Variants: Story = {
  render: () => <ButtonGroupStory>Knapp</ButtonGroupStory>,
  parameters: codeDocs(`
    <Button variant={variant} data-color={color}>
      Knapp
    </Button>
  `),
};

export const Disabled: Story = {
  render: () => <ButtonGroupStory disabled>Knapp</ButtonGroupStory>,
  parameters: codeDocs(`
    <Button variant={variant} data-color={color} disabled>
      Knapp
    </Button>
  `),
};

export const Small: Story = {
  render: () => <ButtonGroupStory data-size="sm">Knapp</ButtonGroupStory>,
  parameters: codeDocs(`
    <Button variant={variant} data-color={color} data-size="sm">
      Knapp
    </Button>
  `),
};

export const Large: Story = {
  render: () => <ButtonGroupStory data-size="lg">Knapp</ButtonGroupStory>,
  parameters: codeDocs(`
    <Button variant={variant} data-color={color} data-size="lg">
      Knapp
    </Button>
  `),
};

export const Icon: Story = {
  render: () => (
    <ButtonGroupStory icon>
      <LaptopIcon title="Laptop" />
    </ButtonGroupStory>
  ),
  parameters: codeDocs(`
    <Button variant={variant} data-color={color} icon>
      <LaptopIcon title="Laptop" />
    </Button>
  `),
};

export const IconWithText: Story = {
  render: () => (
    <ButtonGroupStory>
      <>
        <LaptopIcon title="Laptop" /> Knapp
      </>
    </ButtonGroupStory>
  ),
  parameters: codeDocs(`
    <Button variant={variant} data-color={color}>
      <LaptopIcon title="Laptop" /> Knapp
    </Button>
  `),
};

export const Rounded: Story = {
  render: () => (
    <ButtonGroupStory icon rounded>
      <LaptopIcon title="Laptop" />
    </ButtonGroupStory>
  ),
  parameters: codeDocs(`
    <Button
      variant={variant}
      data-color={color}
      icon
      style={{ borderRadius: "50%" }}
    >
      <LaptopIcon title="Laptop" />
    </Button>
  `),
};

export const AsLink: StoryFn<typeof Button> = () => (
  <Button asChild>
    <a target="_blank" rel="noreferrer" href="https://www.designsystemet.no">
      Gå til Designsystemet
      <ExternalLinkIcon title="Ekstern lenke" />
    </a>
  </Button>
);

export const Loading: StoryFn<typeof Button> = () => (
  <>
    <Button variant="primary" loading>
      Laster...
    </Button>
    <Button variant="secondary" loading>
      Laster...
    </Button>
    <Button variant="tertiary" loading>
      Laster...
    </Button>
  </>
);
