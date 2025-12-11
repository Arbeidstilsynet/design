import { EnvelopeClosedIcon, PersonCircleIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import { Badge, Divider, Link, Switch } from "../..";
import type { LinkItem } from "./headerTitleLinks";

const meta: Meta<typeof Header> = {
  title: "Arbeidstilsynet/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },

  subcomponents: {
    ["Header.Title"]: Header.Title,
  },
};

export default meta;

interface PreviewArgs {
  appName: string;
  userName: string;
  menulinks: LinkItem[];
  controls: React.ReactNode[];
}

const menuLinks: LinkItem[] = [
  { label: "Hjem", href: "#" },
  { label: "Om oss", href: "#" },
  { label: "Tjenester", href: "#" },
];

const controls = [
  <>
    <PersonCircleIcon />
    <Link href="#">Profil</Link>
  </>,
  <>
    <EnvelopeClosedIcon />
    <Link href="#">Innboks</Link>
    <Badge count={15} style={{ marginLeft: "auto" }} />
  </>,
  <Divider />,
  <Switch label="Mørk modus" position="end" />,
];

export const Preview: StoryObj<PreviewArgs> = {
  args: {
    appName: "Arbeidstilsynet",
    userName: "Ola Nordmann",
    menulinks: menuLinks,
    controls: controls,
  },
  render: (args) => {
    return (
      <Header>
        <Header.Title
          appName={args.appName}
          userName={args.userName}
          links={args.menulinks}
          controls={args.controls}
        />
      </Header>
    );
  },
};
