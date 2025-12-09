import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "..";
import type { LinkItem } from "./headerTitleLinks";
import { Search, Switch } from "../..";

function LogoSvg({
  width = 48,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="40" rx="4" fill="#0062BA" />
      <path d="M24 8L32 16H28V28H20V16H16L24 8Z" fill="white" />
      <circle cx="24" cy="32" r="2" fill="white" />
    </svg>
  );
}

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

type Story = StoryObj<typeof meta>;

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

const controls = [<Switch label="Mørk modus" position="end" />];

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
          logo={<LogoSvg />}
          appName={args.appName}
          userName={args.userName}
          links={args.menulinks}
          controls={args.controls}
        />
      </Header>
    );
  },
};

export const WithSearchComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title
          appName="Fagsystem"
          userName="Ola Nordmann"
          logo={<LogoSvg />}
        />
        <Search data-size="sm" style={{ width: "26rem" }}>
          <Search.Input name="placeholder" aria-label="Søk" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </Header>
    );
  },
};

export const WithCustomComponent: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <Header.Title
          appName="Fagsystem"
          userName="Ola Nordmann"
          logo={<LogoSvg />}
        />
        <div style={{ width: "100%", backgroundColor: "orange" }}>
          <p>Custom component can be placed here</p>
        </div>
      </Header>
    );
  },
};
