import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import type { LinkItem } from "./headerTitleLinks";

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
    const menuLinks: LinkItem[] = [
      { label: "Hjem", href: "#" },
      { label: "Om oss", href: "#" },
      { label: "Tjenester", href: "#" },
      { label: "Kontakt", href: "#" },
    ];
    return (
      <Header {...args}>
        <Header.Title 
          fagsystemNavn="Arbeidstilsynet"
          brukernavn="Ola Nordmann"
          links={menuLinks}
        />
      </Header>
    );
  },
};

export const WithCustomComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title />
        <div style={{ width: "100%", backgroundColor: "orange" }}>
          <p>Custom component can be placed here</p>
        </div>
      </Header>
    );
  },
};
