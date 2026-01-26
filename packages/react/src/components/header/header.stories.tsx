import { EnvelopeClosedIcon, PersonCircleIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { Header } from "..";
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

interface PreviewArgs {
  logo: React.ReactNode;
  appName: React.ReactNode;
  menuTitle: string;
  menuLinks: React.ReactNode[];
  controls: React.ReactNode[];
}

const controls = [
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

export const Preview: StoryObj<PreviewArgs> = {
  args: {
    appName: "Arbeidstilsynet",
    menuTitle: "Ola Nordmann",
    controls: controls,
  },
  render: (args) => {
    const ref = useRef(null);
    return (
      <Header
        image={<HeaderStoriesLogo />}
        appName={args.appName}
        menuTitle={args.menuTitle}
        menuControls={args.controls}
      >
        <Link href="">Hjem</Link>
        <Link href="">Om oss</Link>
        <Link href="">Tjenester</Link>
      </Header>
    );
  },
};
