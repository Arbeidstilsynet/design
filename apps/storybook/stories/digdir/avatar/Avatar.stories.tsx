// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/avatar/avatar.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/avatar/metadata.json

import {
  Avatar,
  type AvatarProps,
  Badge,
  Button,
  Dropdown,
} from "@arbeidstilsynet/design-react";
import { BriefcaseIcon } from "@navikt/aksel-icons";
import { type CSSProperties, useId } from "react";
import preview from "../../../.storybook/preview";
// Gnist: local copy of the designsystemet.no image, so snapshots don't
// depend on their site.
import cat1 from "../../assets/img/cats/Cat 1.jpg";

const meta = preview.meta({
  title: "designsystemet.no/Avatar",
  component: Avatar,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Avatar displays an image, initials, or icon for a person, entity, or profile.",
    },
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
  },
});

export const Preview = meta.story({
  args: {
    "aria-label": "Ola Nordmann",
  },
});

export const Initials = meta.story(() => (
  <Avatar aria-label="Ola Nordmann">ON</Avatar>
));

export const Sizes = meta.story(() => (
  <>
    <Avatar data-size="xs" aria-label="extra small">
      xs
    </Avatar>
    <Avatar data-size="sm" aria-label="small">
      sm
    </Avatar>
    <Avatar data-size="md" aria-label="medium">
      md
    </Avatar>
    <Avatar data-size="lg" aria-label="large">
      lg
    </Avatar>
  </>
));

export const ColorVariants = meta.story(() => {
  const colors = ["neutral", "accent"];

  return (
    <>
      {colors.map((color) => (
        <Avatar
          key={color}
          data-color={color as AvatarProps["data-color"]}
          aria-label={`color ${color}`}
        />
      ))}
    </>
  );
});

export const Radius = meta.story(() => (
  <>
    <Avatar aria-label="radius default" />
    <Avatar
      aria-label="radius 1rem"
      style={
        {
          "--dsc-avatar-radius": "1rem",
        } as CSSProperties
      }
    />
    <Avatar
      aria-label="radius lg"
      style={
        {
          "--dsc-avatar-radius": "var(--ds-border-radius-lg)",
        } as CSSProperties
      }
    >
      ON
    </Avatar>
    <Avatar
      aria-label="radius none"
      style={
        {
          "--dsc-avatar-radius": "0",
        } as CSSProperties
      }
    >
      ON
    </Avatar>
  </>
));

export const WithImageAndIcon = meta.story(() => (
  <>
    <Avatar aria-label="Ola Nordmann">
      <img src={cat1} alt="" />
    </Avatar>
    <Avatar aria-label="Ola Nordmann">
      <BriefcaseIcon />
    </Avatar>
  </>
));

export const InDropdown = meta.story({
  render: function InDropdown() {
    const id = useId();

    return (
      <>
        <Button popovertarget={id} variant="tertiary">
          <Avatar aria-hidden="true" data-size="sm">
            ON
          </Avatar>
          Ola Nordmann
        </Button>
        <Dropdown id={id} placement="bottom-end" autoPlacement={false}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>
                <Badge.Position overlap="circle">
                  <Badge data-color="danger" data-size="sm"></Badge>
                  <Avatar aria-hidden="true" data-size="xs">
                    ON
                  </Avatar>
                </Badge.Position>
                Ola Nordmann
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>
                <Avatar aria-hidden="true" data-size="xs">
                  <BriefcaseIcon />
                </Avatar>
                Sogndal kommune
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
});
