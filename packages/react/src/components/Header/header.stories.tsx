import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    showBanner: {
      control: "boolean",
      description: "Whether to show the banner or not",
    },
    bannerText: {
      control: "text",
      description: "Text to display in the banner",
    },
    showTitle: {
      control: "boolean",
      description: "Whether to show the title or not",
    },
    fagsystemNavn: {
      control: "text",
      description: "Name of the system",
    },
    brukernavn: {
      control: "text",
      description: "Name of the user",
    },
    showSearch: {
      control: "boolean",
      description: "Whether to show the search section or not",
    },
    showLinks: {
      control: "boolean",
      description: "Whether to show the links section or not",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    showBanner: true,
    bannerText: "Dette er en bannertekst",
    showTitle: true,
    fagsystemNavn: "Fagsystemet",
    brukernavn: "Ola Nordmann",
    showLinks: true,
    showSearch: true,
    links: [
      { href: "#", text: "Link 1" },
      { href: "#", text: "Link 2" },
      { href: "#", text: "Link 3" },
    ],
  },
  render: (args) => (
    <Header {...args} />
  ),
};

export const WithCustomComponent: Story = {
  render: (args) => (<Header {...args} showTitle={false} titleComponent={<div>This is a custom component</div>} />),
}