// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/avatar-stack/avatar-stack.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/avatar-stack/metadata.json

import {
  Avatar,
  Checkbox,
  EXPERIMENTAL_AvatarStack,
  Field,
  Label,
  Tooltip,
} from "@arbeidstilsynet/design-react";
import { BriefcaseIcon } from "@navikt/aksel-icons";
import { type CSSProperties, useState } from "react";
import preview from "../../../.storybook/preview";
// Gnist: local copies of the designsystemet.no images, so snapshots don't
// depend on their site.
import cat1 from "../../assets/img/cats/Cat 1.jpg";
import cat2 from "../../assets/img/cats/Cat 2.jpg";
import cat3 from "../../assets/img/cats/Cat 3.jpg";
import cat4 from "../../assets/img/cats/Cat 4.jpg";
import cat6 from "../../assets/img/cats/Cat 6.jpg";

const meta = preview.meta({
  title: "designsystemet.no/AvatarStack",
  component: EXPERIMENTAL_AvatarStack,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle: "Avatar stack stacks a collection of avatar elements",
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
  render: (args) => (
    <EXPERIMENTAL_AvatarStack {...args}>
      <li>
        <Avatar aria-label="cat">
          <img src={cat1} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="briefcase">
          <BriefcaseIcon />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="Søren Magnussen">sm</Avatar>
      </li>
      <li>
        <Avatar aria-label="Mark Downright">md</Avatar>
      </li>
      <li>
        <Avatar aria-label="Ola Nordman">on</Avatar>
      </li>
    </EXPERIMENTAL_AvatarStack>
  ),
});

export const Playground = meta.story({
  render: function Playground() {
    const [expandable, setExpandable] = useState(false);
    const [overlap, setOverlap] = useState(32);
    const [radius, setRadius] = useState(32);
    const [size, setSize] = useState(64);
    const [gap, setGap] = useState(2);

    return (
      <>
        <fieldset
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-size-4)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--ds-size-3)",
              alignItems: "center",
            }}
          >
            <Checkbox
              label="Expandable"
              checked={expandable}
              onChange={() => setExpandable(!expandable)}
            />
          </div>
          <Field>
            <Label>Size {`${size}px`}</Label>
            <input
              min="24"
              max="150"
              step="0.1"
              type="range"
              value={size}
              onChange={(e) => setSize(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Overlap {`${overlap}px`}</Label>
            <input
              min="0"
              max="100"
              step="1"
              type="range"
              value={overlap}
              onChange={(e) => setOverlap(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Gap {`${gap}px`}</Label>
            <input
              min="0"
              max="15"
              step="1"
              type="range"
              value={gap}
              onChange={(e) => setGap(e.target.valueAsNumber)}
            />
          </Field>
          <Field>
            <Label>Radius {`${radius}px`}</Label>
            <input
              min="0"
              max="75"
              step="1"
              type="range"
              value={radius}
              onChange={(e) => setRadius(e.target.valueAsNumber)}
            />
          </Field>
        </fieldset>
        <br />
        <EXPERIMENTAL_AvatarStack
          expandable={expandable || undefined}
          style={
            {
              "--dsc-avatar-stack-size": `${size}px`,
              "--dsc-avatar-stack-gap": `${gap}px`,
              "--dsc-avatar-stack-overlap": `${overlap}px`,
              "--dsc-avatar-stack-radius": `${radius}px`,
            } as CSSProperties
          }
        >
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">md</Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
          <li>+10</li>
        </EXPERIMENTAL_AvatarStack>
      </>
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const Expandable = meta.story({
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "var(--ds-size-4)",
        flexWrap: "wrap",
      }}
    >
      <fieldset>
        <legend>expandable</legend>
        <EXPERIMENTAL_AvatarStack expandable>
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
        </EXPERIMENTAL_AvatarStack>
      </fieldset>
      <fieldset>
        <legend>expandable="fixed"</legend>
        <EXPERIMENTAL_AvatarStack expandable="fixed">
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat1} alt="" />
            </Avatar>
          </li>
          <li>
            <Avatar aria-label="">
              <img src={cat6} alt="" />
            </Avatar>
          </li>
        </EXPERIMENTAL_AvatarStack>
      </fieldset>
    </div>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const Radius = meta.story({
  render: () => (
    <EXPERIMENTAL_AvatarStack
      aria-label="example of square avatars"
      expandable
      style={
        {
          "--dsc-avatar-stack-radius": "var(--ds-border-radius-md)",
        } as CSSProperties
      }
    >
      <li>
        <Avatar aria-label="variant square" />
      </li>
      <li>
        <Avatar aria-label="Ola Nordmann">
          <img src={cat1} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="Ola Nordmann">
          <img src={cat2} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="Ola Nordmann">
          <img src={cat3} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="Ola Nordmann">
          <img src={cat4} alt="" />
        </Avatar>
      </li>
    </EXPERIMENTAL_AvatarStack>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const DataSize = meta.story({
  render: () => (
    <EXPERIMENTAL_AvatarStack
      style={
        {
          "--dsc-avatar-stack-size": "clamp(5rem, 1.5rem + 2vw, 10rem)",
        } as CSSProperties
      }
    >
      <li>
        <Avatar aria-label="">
          <img src={cat6} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="">
          <img src={cat1} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="">
          <img src={cat6} alt="" />
        </Avatar>
      </li>
      <li>
        <Avatar aria-label="">
          <img src={cat1} alt="" />
        </Avatar>
      </li>
    </EXPERIMENTAL_AvatarStack>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const Gap = meta.story({
  render: () => (
    <EXPERIMENTAL_AvatarStack
      style={
        {
          "--dsc-avatar-stack-gap": "6px",
        } as CSSProperties
      }
    >
      <li>
        <Avatar aria-label="">AA</Avatar>
      </li>
      <li>
        <Avatar aria-label="">BB</Avatar>
      </li>
      <li>
        <Avatar aria-label="">CC</Avatar>
      </li>
      <li>
        <Avatar aria-label="">DD</Avatar>
      </li>
    </EXPERIMENTAL_AvatarStack>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const AdditionalAvatars = meta.story({
  render: () => (
    <>
      <EXPERIMENTAL_AvatarStack>
        <li>
          <Avatar aria-label="">
            <img src={cat1} alt="" />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label="">
            <BriefcaseIcon />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label="">sm</Avatar>
        </li>
        <li>
          <Avatar
            data-color="neutral"
            aria-label=""
            style={{ "--dsc-avatar-font-size": "1.1rem" } as CSSProperties}
          >
            +14
          </Avatar>
        </li>
      </EXPERIMENTAL_AvatarStack>
      <EXPERIMENTAL_AvatarStack>
        <li>
          <Avatar aria-label="">
            <img src={cat1} alt="" />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label="">
            <BriefcaseIcon />
          </Avatar>
        </li>
        <li>
          <Avatar aria-label="">sm</Avatar>
        </li>
        <li>
          <Avatar aria-label="">on</Avatar>
        </li>
        <li>+14</li>
      </EXPERIMENTAL_AvatarStack>
    </>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const WithTooltipAndLink = meta.story({
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--ds-size-4)" }}>
      <fieldset>
        <legend>Link + Tooltip</legend>
        <EXPERIMENTAL_AvatarStack aria-label="contributors">
          <li>
            <Tooltip content="Ola Cat">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat1} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Kari Cat">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat6} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Cat 2">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat1} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Børge Cat">
              <Avatar aria-label="" asChild>
                <a href="#">BK</a>
              </Avatar>
            </Tooltip>
          </li>
        </EXPERIMENTAL_AvatarStack>
      </fieldset>
      <fieldset>
        <legend>Link + Tooltip expandable</legend>
        <EXPERIMENTAL_AvatarStack expandable="fixed" aria-label="contributors">
          <li>
            <Tooltip content="Ola Cat">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat6} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Kari Cat">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat1} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Cat 2">
              <Avatar aria-label="" asChild>
                <a href="#">
                  <img src={cat6} alt="" />
                </a>
              </Avatar>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Børge Cat">
              <Avatar aria-label="" asChild>
                <a href="#">BK</a>
              </Avatar>
            </Tooltip>
          </li>
        </EXPERIMENTAL_AvatarStack>
      </fieldset>
    </div>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});
