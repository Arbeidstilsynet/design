import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Divider, Heading, Link, Switch } from "../..";
import {
  InboxMenuItem,
  ProfileMenuItem,
} from "./stories-helpers/headerStoriesMenuItems";
import { HeaderStoriesTitle } from "./stories-helpers/headerStoriesTitle";
import { HeaderStoriesIllustration } from "./stories-helpers/headeStoriesIllustation";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
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
  <Link data-color="primary" key="home" href="./#">
    Hjem
  </Link>,
  <Link data-color="secondary" key="about" href="./#">
    Saker
  </Link>,
  <Link data-color="secondary" key="services" href="./#">
    Virksomheter
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
        <Link href="/">
          <Header.Title>
              <Header.Illustration>
                <HeaderStoriesIllustration />
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
        <Link href="/">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration />
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
        <Link href="/">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration />
            </Header.Illustration>
            <Header.Logo>
              <HeaderStoriesTitle />
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
        <Link href="/">
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration />
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

export const CustomLogoFont: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Link href="/" style={{ color: "var(--ds-color-neutral-text-default)", textDecoration: "none" }}>
          <Header.Title>
            <Header.Illustration>
              <HeaderStoriesIllustration />
            </Header.Illustration>
            <Header.Logo>
                <Heading style={{ fontFamily: "monospace" }}>
                  Fagsystem
                </Heading>
            </Header.Logo>
          </Header.Title>
        </Link>
        <Header.Navbar />
        <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
          <ProfileMenuItem />
          <InboxMenuItem />
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
