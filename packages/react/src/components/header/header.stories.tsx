import { EnvelopeClosedIcon, PersonCircleIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderProps } from "..";
import { Badge, Divider, Link, Switch } from "../..";
import { HeaderStoriesLogo } from "./headeStoriesLogo";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
};

export default meta;

const menuControls = [
  <div style={{ display: "flex", alignItems: "center" }} key="profile">
    <PersonCircleIcon style={{ flexShrink: 0 }} />
    <Link
      href="#"
      style={{
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        minHeight: "0",
      }}
    >
      Profil
    </Link>
  </div>,
  <div style={{ display: "flex", alignItems: "center" }} key="inbox">
    <EnvelopeClosedIcon style={{ flexShrink: 0 }} />
    <Link
      href="#"
      style={{
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        minHeight: "0",
      }}
    >
      Innboks
    </Link>
    <Badge count={15} style={{ marginLeft: "auto" }} />
  </div>,
  <Divider key="divider1" />,
  <Switch key="dark-mode" label="Mørk modus" position="end" />,
];

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

export const Preview: StoryObj<HeaderProps> = {
  args: {
    appName: "Arbeidstilsynet",
    menuTitle: "Ola Nordmann",
    menuControls,
    links: links,
  },
  render: (args) => {
    return (
      <Header
        image={<HeaderStoriesLogo />}
        appName={args.appName}
        links={args.links}
        menuTitle={args.menuTitle}
        menuControls={args.menuControls}
      />
    );
  },
};
