import preview from "../../../../../apps/storybook/.storybook/preview";
import { LightDarkImage } from ".";
import { LogoBlack } from "../logo/logoblack";
import { LogoWhite } from "../logo/logowhite";

const meta = preview.meta({
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
});

/**
 * Toggle between dark and light mode in the toolbar to see the image switch.
 * If storybook is set to "auto" color scheme, it will follow your system settings.
 */
export const Preview = meta.story({
  render: (args) => <LightDarkImage {...args} />,
  args: {
    light: <LogoBlack width={200} />,
    dark: <LogoWhite width={200} />,
  },
});
