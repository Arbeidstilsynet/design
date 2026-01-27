import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderProps } from "..";
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
export const NoMenu: StoryObj<HeaderProps> = {
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
export const NoNavigation: StoryObj<HeaderProps> = {
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
