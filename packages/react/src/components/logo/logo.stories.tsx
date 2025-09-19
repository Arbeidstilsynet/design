import type { Meta, StoryObj } from "@storybook/react-vite";
import { LightDarkLogo } from "./lightdarklogo";
import { LogoBlack as LogoBlackComponent } from "./logoblack";
import { LogoWhite as LogoWhiteComponent } from "./logowhite";
import { LogoGreen as LogoGreenComponent } from "./logogreen";
/**
 * Story for Arbeidstilsynet logo.
 * This main component displays the Arbeidstilsynet logo with support for light and dark mode.
 *
 * The story includes:
 * - A preview of the LightDarkLogo component.
 * - Individual stories for the white, green, and black logo variants.
 * - The white logo story is displayed on a black background to ensure visibility.
 *
 * Usage:
 * - Import the LightDarkLogo component and use it in your application to display the logo.
 * - Use the individual logo components (LogoWhite, LogoGreen, LogoBlack) as needed.
 *
 */

const meta: Meta<typeof LightDarkLogo> = {
  title: "Arbeidstilsynet/Logo",
  component: LightDarkLogo,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => <LightDarkLogo {...args} />,
};

export const LogoWhite: Story = {
  render: (args) => (
    <div style={{ background: "#000", padding: "1rem" }} >
      <LogoWhiteComponent {...args} />
    </div >
  ),
};

export const LogoGreen: Story = {
  render: (args) => <LogoGreenComponent {...args} />,
};

export const LogoBlack: Story = {
  render: (args) => <LogoBlackComponent {...args} />,
};