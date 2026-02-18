import {
  CircleIcon,
  ExternalLinkIcon,
  FingerButtonIcon,
  InboxIcon,
  PersonCircleIcon,
  TasklistIcon,
} from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Button, Divider, Link, Switch } from "../..";
import { HeaderStoriesIllustration } from "./stories-helpers/headerStoriesIllustration";
import { HeaderStoriesTitle } from "./stories-helpers/headerStoriesTitle";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    customStyles: {
      padding: "0",
      paddingBottom: "var(--ds-size-4)",
    },
  },
  subcomponents: {
    ["Header.Title"]: Header.Title,
    ["Header.Illustration"]: Header.Illustration,
    ["Header.Logo"]: Header.Logo,
    ["Header.Navbar"]: Header.Navbar,
    ["Header.Menu"]: Header.Menu,
    ["Header.MenuRow"]: Header.MenuRow,
    ["Header.MenuIcon"]: Header.MenuIcon,
    ["Header.MenuBadge"]: Header.MenuBadge,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const links = [
  <Link key="home" href="./#" aria-current="page">
    Første
  </Link>,
  <Link key="about" href="./#">
    Andre
  </Link>,
  <Link key="services" href="./#">
    Tredje
  </Link>,
];

/**
 * Default header with all compound components.
 * Shows illustration, logo, navbar, and menu with profile items.
 */
export const Preview: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <PersonCircleIcon aria-label="Profil ikon" />
              </Header.MenuIcon>
              <span>Profil</span>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <InboxIcon aria-label="Innboks ikon" />
              </Header.MenuIcon>
              <span>Innboks</span>
              <Header.MenuBadge color="warning">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <TasklistIcon aria-label="Gjøremål ikon" />
              </Header.MenuIcon>
              <span>Gjøremål</span>
              <Header.MenuBadge color="info">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Divider />
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};

/**
 * Header without menu - only navigation links.
 * Useful for simple applications without user controls.
 */
export const NoMenu: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
      </Header>
    );
  },
  args: {
    links,
  },
};

/**
 * Header without navigation links - only menu controls.
 * Useful for simple applications or landing pages.
 */
export const NoNavigation: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Innstillinger">
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
};

/**
 * Header with custom max-width.
 * Demonstrates overriding the `--at-header-max-width` CSS variable
 * to constrain the header content to a narrower width.
 */
export const CustomMaxWidth: Story = {
  render: (args) => {
    return (
      <Header
        {...args}
        style={{ "--at-header-max-width": "50rem" } as React.CSSProperties}
      >
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />

        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <PersonCircleIcon aria-label="Profil ikon" />
              </Header.MenuIcon>
              <span>Profil</span>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <InboxIcon aria-label="Innboks ikon" />
              </Header.MenuIcon>
              <span>Innboks</span>
              <Header.MenuBadge color="warning">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <TasklistIcon aria-label="Gjøremål ikon" />
              </Header.MenuIcon>
              <span>Gjøremål</span>
              <Header.MenuBadge color="info">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Divider />
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};

export const SVGLogo: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link
          href="/"
          style={{
            color: "var(--ds-color-neutral-text-default)",
            textDecoration: "none",
          }}
          aria-label="Link til hjem"
        >
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo>
              <HeaderStoriesTitle aria-label="Fagsystem tittel" />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />

        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <PersonCircleIcon aria-label="Profil ikon" />
              </Header.MenuIcon>
              <span>Profil</span>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <InboxIcon aria-label="Innboks ikon" />
              </Header.MenuIcon>
              <span>Innboks</span>
              <Header.MenuBadge color="warning">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <TasklistIcon aria-label="Gjøremål ikon" />
              </Header.MenuIcon>
              <span>Gjøremål</span>
              <Header.MenuBadge color="info">19</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Divider />
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};

export const OnlyDarkModeInMenu: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};

export const DifferentMenuRows: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" aria-label="Link til hjem">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration aria-label="Fagsystem logo" />
            </Header.Illustration>
            <Header.Logo style={{ fontFamily: "Literata" }}>
              Fagsystem
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <ExternalLinkIcon aria-label="External link icon" />
              </Header.MenuIcon>
              <span>Link</span>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <CircleIcon aria-label="Circle icon" />
              </Header.MenuIcon>
              <span>Badge (info)</span>
              <Header.MenuBadge color="info">1</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <CircleIcon aria-label="Circle icon" />
              </Header.MenuIcon>
              <span>Badge (warning)</span>
              <Header.MenuBadge color="warning">2</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <CircleIcon aria-label="Circle icon" />
              </Header.MenuIcon>
              <span>Badge (success)</span>
              <Header.MenuBadge color="success">3</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">
              <Header.MenuIcon>
                <CircleIcon aria-label="Circle icon" />
              </Header.MenuIcon>
              <span>Badge (danger)</span>
              <Header.MenuBadge color="danger">4</Header.MenuBadge>
            </Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Link href="#">No icon</Link>
          </Header.MenuRow>
          <Header.MenuRow padded>
            <Link href="#">No icon (padded)</Link>
          </Header.MenuRow>
          <Header.MenuRow>
            <Button>
              <Header.MenuIcon>
                <FingerButtonIcon aria-label="Button icon" />
              </Header.MenuIcon>
              <span>Button</span>
            </Button>
          </Header.MenuRow>
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};
