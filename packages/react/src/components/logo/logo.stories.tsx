import type { Meta, StoryObj } from "@storybook/react-vite";
import { LightDarkLogo } from "./lightdarklogo";
import { LogoBlack as LogoBlackComponent } from "./logoblack";
import { LogoGreen as LogoGreenComponent } from "./logogreen";
import { LogoWhite as LogoWhiteComponent } from "./logowhite";

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
    <div style={{ background: "#000" }}>
      <LogoWhiteComponent {...args} />
    </div>
  ),
};

export const LogoGreen: Story = {
  render: (args) => (
    <div style={{ background: "#fff" }}>
      <LogoGreenComponent {...args} />
    </div>
  ),
};

export const LogoBlack: Story = {
  render: (args) => (
    <div style={{ background: "#fff" }}>
      <LogoBlackComponent {...args} />
    </div>
  ),
};
