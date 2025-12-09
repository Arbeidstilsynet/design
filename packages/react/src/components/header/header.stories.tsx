import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import type { LinkItem } from "./headerTitleLinks";
import { Link, Search, Switch } from "../..";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },

  subcomponents: {
    ["Header.Title"]: Header.Title,
    ["Header.Links"]: Header.Links,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

interface PreviewArgs {
  fagsystemNavn: string;
  brukernavn: string;
  menulinks: LinkItem[];
  controls: React.ReactNode[];
}

const menuLinks: LinkItem[] = [
  { label: "Hjem", href: "#" },
  { label: "Om oss", href: "#" },
  { label: "Tjenester", href: "#" },
];

const controls = [<Switch label="Mørk modus" position="end" />];

const ekstraLinks = [
  { label: "Søknader", href: "#" },
  { label: "Meldinger", href: "#" },
  { label: "Kart", href: "#" },
  { label: "Virksomheter", href: "#" },
];

export const Preview: StoryObj<PreviewArgs> = {
  args: {
    fagsystemNavn: "Arbeidstilsynet",
    brukernavn: "Ola Nordmann",
    menulinks: menuLinks,
    controls: controls,
  },
  render: (args) => {
    return (
      <Header>
        <Header.Title
          fagsystemNavn={args.fagsystemNavn}
          brukernavn={args.brukernavn}
          links={args.menulinks}
          controls={args.controls}
        />
      </Header>
    );
  },
};

export const WithLinksComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title />
        <Header.Links>
          {ekstraLinks.map((link) => (
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
        <Search>
          <Search.Input name="placeholder" aria-label="Søk" />
          <Search.Clear />
          <Search.Button />
        </Search>
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
