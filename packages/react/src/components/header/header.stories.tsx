import {
  CircleIcon,
  ExternalLinkIcon,
  FingerButtonIcon,
} from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Button, Divider, Heading, Link } from "../..";
import { HeaderStoriesIllustration } from "./stories-helpers/headerStoriesIllustration";
import {
  DarkModeMenuItem,
  InboxMenuItem,
  ProfileMenuItem,
  TODOsMenuItem,
} from "./stories-helpers/headerStoriesMenuItems";
import { HeaderStoriesTitle } from "./stories-helpers/headerStoriesTitle";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    customStyles: {
      padding: "0",
    },
  },
  subcomponents: {
    ["Header.Title"]: Header.Title,
    ["Header.Illustration"]: Header.Illustration,
    ["Header.Logo"]: Header.Logo,
    ["Header.Navbar"]: Header.Navbar,
    ["Header.Menu"]: Header.Menu,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const links = [
  <Link key="home" href="./#" aria-label="Link til første" aria-current="page">
    Første
  </Link>,
  <Link key="about" href="./#" aria-label="Link til andre">
    Andre
  </Link>,
  <Link key="services" href="./#" aria-label="Link til tredje">
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
            <Header.Logo>
              <HeaderStoriesTitle />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <ProfileMenuItem />
          <InboxMenuItem />
          <TODOsMenuItem />
          <Divider />
          <DarkModeMenuItem />
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
            <Header.Logo>
              <HeaderStoriesTitle />
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
            <Header.Logo>
              <HeaderStoriesTitle />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Innstillinger">
          <DarkModeMenuItem />
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
            <Header.Logo>
              <HeaderStoriesTitle />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />

        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <ProfileMenuItem />
          <InboxMenuItem />
          <TODOsMenuItem />
          <Divider />
          <DarkModeMenuItem />
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};

export const CustomLogoFont: Story = {
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
              <Heading style={{ fontFamily: "monospace" }}>Fagsystem</Heading>
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />

        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <ProfileMenuItem />
          <InboxMenuItem />
          <TODOsMenuItem />
          <Divider />
          <DarkModeMenuItem />
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
            <Header.Logo>
              <HeaderStoriesTitle />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <DarkModeMenuItem />
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
            <Header.Logo>
              <HeaderStoriesTitle />
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <Header.Menu.Row>
            <Link href="#">
              <Header.Menu.Row.Icon>
                <ExternalLinkIcon />
              </Header.Menu.Row.Icon>
              <span>Link</span>
            </Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Link href="#">
              <Header.Menu.Row.Icon>
                <CircleIcon />
              </Header.Menu.Row.Icon>
              <span>Badge (info)</span>
              <Header.Menu.Row.Badge color="info">1</Header.Menu.Row.Badge>
            </Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Link href="#">
              <Header.Menu.Row.Icon>
                <CircleIcon />
              </Header.Menu.Row.Icon>
              <span>Badge (warning)</span>
              <Header.Menu.Row.Badge color="warning">2</Header.Menu.Row.Badge>
            </Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Link href="#">
              <Header.Menu.Row.Icon>
                <CircleIcon />
              </Header.Menu.Row.Icon>
              <span>Badge (success)</span>
              <Header.Menu.Row.Badge color="success">3</Header.Menu.Row.Badge>
            </Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Link href="#">
              <Header.Menu.Row.Icon>
                <CircleIcon />
              </Header.Menu.Row.Icon>
              <span>Badge (danger)</span>
              <Header.Menu.Row.Badge color="danger">4</Header.Menu.Row.Badge>
            </Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Link href="#">No icon</Link>
          </Header.Menu.Row>
          <Header.Menu.Row padded>
            <Link href="#">No icon (padded)</Link>
          </Header.Menu.Row>
          <Header.Menu.Row>
            <Button>
              <Header.Menu.Row.Icon>
                <FingerButtonIcon />
              </Header.Menu.Row.Icon>
              <span>Button</span>
            </Button>
          </Header.Menu.Row>
        </Header.Menu>
      </Header>
    );
  },
  args: {
    links,
  },
};
