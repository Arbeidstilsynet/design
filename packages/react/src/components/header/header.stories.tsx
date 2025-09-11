import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Link } from "@digdir/designsystemet-react";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },

  subcomponents: {
    ["Header.Title"]: Header.Title,
    ["Header.Search"]: Header.Search,
    ["Header.Links"]: Header.Links,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: (args) => {
    const menuLinks = [
      { label: "Hjem", href: "#" },
      { label: "Om oss", href: "#" },
      { label: "Tjenester", href: "#" },
      { label: "Kontakt", href: "#" },
    ];
    return (
      <Header {...args}>
        <Header.Title />
        <Header.Search />
        <Header.Links>
          {menuLinks.map((link) => (
            <Header.Links.Item key={link.label} asChild={true}>
              <Link href={link.href}>{link.label}</Link>
            </Header.Links.Item>
          ))}
        </Header.Links>
      </Header>
    );
  },
};

export const WithCustomComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title />
      </Header>
    );
  },
};
