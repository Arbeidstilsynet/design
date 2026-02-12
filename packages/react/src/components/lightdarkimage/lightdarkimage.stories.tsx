import type { Meta, StoryObj } from "@storybook/react-vite";
import { LightDarkImage } from ".";
import { LogoBlack } from "../logo/logoblack";
import { LogoWhite } from "../logo/logowhite";

const meta: Meta<typeof LightDarkImage> = {
  title: "Arbeidstilsynet/LightDarkImage",
  component: LightDarkImage,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    light: {
      control: false,
    },
    dark: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Toggle between dark and light mode in the toolbar to see the image switch.
 * If storybook is set to "auto" color scheme, it will follow your system settings.
 */
export const Preview: Story = {
  render: (args) => <LightDarkImage {...args} />,
  args: {
    light: <LogoBlack width={200} />,
    dark: <LogoWhite width={200} />,
  },
};
