import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import type { LinkItem } from "./headerTitleLinks";
import { Link } from "../..";

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
    ];
    return (
      <Header {...args}>
        <Header.Title
          fagsystemNavn="Gnist"
          brukernavn="Ola Nordmann"
          links={menuLinks}
        />
      </Header>
    );
  },
};

export const WithLinksComponent: Story = {
  render: (args) => {
    const menuLinks = [
      { label: "Søknader", href: "#" },
      { label: "Meldinger", href: "#" },
      { label: "Kart", href: "#" },
      { label: "Virksomheter", href: "#" },
    ];
    return (
      <Header {...args}>
        <Header.Title />
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

export const WithSearchComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title />
        <Header.Search text="Søk" />
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
