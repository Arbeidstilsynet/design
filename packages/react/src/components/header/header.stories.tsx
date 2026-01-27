import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderProps } from "..";
import { Divider, Link, Switch } from "../..";
import {
  InboxMenuItem,
  ProfileMenuItem,
} from "./stories-helpers/headerStoriesMenuItems";
import { HeaderStoriesLogo } from "./stories-helpers/headeStoriesLogo";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
};

export default meta;

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
export const Preview: StoryObj<HeaderProps> = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesLogo />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">Arbeidstilsynet</Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu menuButtonText="Ola Nordmann" closeButtonText="Lukk">
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
 * Header without illustration - only shows logo.
 * Useful for simpler headers or when illustration is not needed.
 */
export const WithoutIllustration: StoryObj<HeaderProps> = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Logo>
            <Link href="/">Arbeidstilsynet</Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu menuButtonText="Ola Nordmann">
          <ProfileMenuItem />
          <Divider />
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
};

/**
 * Header with minimal menu - no custom controls.
 * On desktop, only shows navigation links in navbar.
 * On mobile, navigation links appear in the hamburger menu.
 */
export const MinimalMenu: StoryObj<HeaderProps> = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesLogo />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">Arbeidstilsynet</Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu menuButtonText="Meny" />
      </Header>
    );
  },
};

/**
 * Header with rich menu controls including inbox with badge.
 * Demonstrates custom menu content with multiple interactive elements.
 */
export const RichMenu: StoryObj<HeaderProps> = {
  render: () => {
    return (
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesLogo />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">Arbeidstilsynet</Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu
          menuButtonText="Kari Nordmann"
          closeButtonText="Lukk menyen"
        >
          <ProfileMenuItem />
          <InboxMenuItem count={42} />
          <Divider />
          <Switch label="Mørk modus" position="end" />
          <Switch label="Høy kontrast" position="end" />
        </Header.Menu>
      </Header>
    );
  },
};

/**
 * Header without navigation links - only menu controls.
 * Useful for simple applications or landing pages.
 */
export const NoNavigation: StoryObj<HeaderProps> = {
  render: () => {
    return (
      <Header>
        <Header.Title>
          <Header.Illustration>
            <HeaderStoriesLogo />
          </Header.Illustration>
          <Header.Logo>
            <Link href="/">Arbeidstilsynet</Link>
          </Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu menuButtonText="Innstillinger">
          <Switch label="Mørk modus" position="end" />
        </Header.Menu>
      </Header>
    );
  },
};
