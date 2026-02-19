import { Button } from "@arbeidstilsynet/design-react";
import {
  ExternalLinkIcon,
  LaptopIcon
} from "@navikt/aksel-icons";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";

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

const buttonColors = ["accent", "neutral", "info", "warning", "danger"] as const;
// const buttonColors = ["info", "reverse", "success", "warning"] as const;
const buttonVariants = ["primary", "secondary", "tertiary"] as const;

const HelpText = ({ text }: { text: string }) => (
  <span style={{ fontSize: "var(--ds-font-size-1)", color: `var(--ds-color-neutral-text-subtle)` }}>{text}</span>
);

const ButtonGroupStory = ({
  ["data-size"]: size = "md",
  disabled = false,
  icon = false,
  children,
  rounded = false,
}: { ["data-size"]?: "sm" | "md" | "lg"; disabled?: boolean; icon?: boolean; children?: React.ReactNode; rounded?: boolean }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: new Array(buttonColors.length + 1).fill("auto").join(" "),
      gap: "var(--ds-size-4)",
      placeItems: "center",
    }}
  >
    {<div style={{ visibility: "hidden" }} />}

    {buttonColors.map((color) => (
      <HelpText key={color} text={color} />
    ))}

    {buttonVariants.map((variant) => (
      <>
        <HelpText key={variant} text={variant} />
        {buttonColors.map((color) => (
          <Button
            key={`${variant}-${color}`}
            variant={variant}
            data-color={color}
            data-size={size}
            children={children}
            disabled={disabled}
            icon={icon}
            style={rounded ? { borderRadius: "50%" } : undefined}
          />
        ))}
      </>
    ))}
  </div>
);

export const Variants: Story = {
  decorators: [
    () => <ButtonGroupStory children="Knapp" />,
  ],
};

export const Disabled: Story = {
  decorators: [
    () => <ButtonGroupStory disabled children="Knapp" />,
  ],
};

export const Small: Story = {
  decorators: [
    () => <ButtonGroupStory data-size="sm" children="Knapp" />,
  ],
};

export const Large: Story = {
  decorators: [
    () => <ButtonGroupStory data-size="lg" children="Knapp" />,
  ],
};

export const Icon: Story = {
  decorators: [
    () => <ButtonGroupStory icon children={<LaptopIcon />} />,
  ]
};

export const IconWithText: Story = {
  decorators: [
    () => <ButtonGroupStory children={<><LaptopIcon /> Knapp</>} />,
  ]
};

export const Rounded: Story = {
  decorators: [
    () => <ButtonGroupStory icon children={<LaptopIcon />} rounded />,
  ]
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
