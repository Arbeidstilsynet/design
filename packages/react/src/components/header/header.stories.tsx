import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },

  subcomponents: {
    ["Header.Banner"]: Header.Banner,
    ["Header.Title"]: Header.Title,
    ["Header.Search"]: Header.Search,
    ["Header.Links"]: Header.Links,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => {
    const links = [
      { href: "#", text: "Link 1" },
      { href: "#", text: "Link 2" },
      { href: "#", text: "Link 3" },
    ];
    return (
      <Header {...args}>
        <Header.Banner>Miljøbanner</Header.Banner>
        <Header.Title />
        <Header.Search />
        <Header.Links links={links} />
      </Header>
    );
  },
};

export const WithCustomComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Banner />
        <Header.Title />
      </Header>
    );
  },
};
