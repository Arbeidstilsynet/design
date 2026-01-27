import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Divider, Heading, Link, Switch } from "../..";
import {
  InboxMenuItem,
  ProfileMenuItem,
} from "./stories-helpers/headerStoriesMenuItems";
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
  <Link key="home" href="">
    Hjem
  </Link>,
  <Link key="about" href="">
    Om oss
  </Link>,
  <Link key="services" href="">
    Tjenester
  </Link>,
];

/**
 * Default header with all compound components.
 * Shows illustration, logo, navbar, and menu with profile items.
 */
export const Preview: Story = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesIllustration />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">
              <Heading>Arbeidstilsynet</Heading>
            </Link>
          </Header.Logo>
        </Header.Title>
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
};

/**
 * Header without menu - only navigation links.
 * Useful for simple applications without user controls.
 */
export const NoMenu: Story = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesIllustration />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">
              <Heading>Arbeidstilsynet</Heading>
            </Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
      </Header>
    );
  },
};

/**
 * Header without navigation links - only menu controls.
 * Useful for simple applications or landing pages.
 */
export const NoNavigation: Story = {
  render: () => {
    return (
      <Header>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesIllustration />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">
              <Heading>Arbeidstilsynet</Heading>
            </Link>
          </Header.Logo>
        </Header.Title>
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
  render: () => {
    return (
      <Header
        links={links}
        style={{ "--at-header-max-width": "50rem" } as React.CSSProperties}
      >
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesIllustration />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">
              <Heading>Arbeidstilsynet</Heading>
            </Link>
          </Header.Logo>
        </Header.Title>
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
};
