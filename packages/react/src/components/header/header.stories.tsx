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

// Mock router link component for demonstration
const MockRouterLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const menuLinks: LinkItem[] = [
  { label: "Hjem", href: "/" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Tjenester", href: "/tjenester" },
];

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

export const CustomLinks: StoryObj<PreviewArgs> = {
  args: {
    appName: "Arbeidstilsynet",
    userName: "Ola Nordmann",
    controls: controls,
  },
  render: (args) => {
    return (
      <Header>
        <Header.Title
          appName={args.appName}
          userName={args.userName}
          controls={args.controls}
        >
          <MockRouterLink to="/">Hjem</MockRouterLink>
          <MockRouterLink to="/saker">Saker</MockRouterLink>
          <MockRouterLink to="/virksomheter">Virksomheter</MockRouterLink>
        </Header.Title>
      </Header>
    );
  },
};
