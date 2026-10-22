// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/chip/chip.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/chip/metadata.json

import { Chip } from "@arbeidstilsynet/design-react";
import { Fragment, useId } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Chip",
  component: Chip.Radio,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Chip.Button": Chip.Button,
    "Chip.Checkbox": Chip.Checkbox,
    "Chip.Removable": Chip.Removable,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Chip are small, interactive components that allow users to control how they want to see content. For example, they can be used to filter categories in a search result and show which filters are active.",
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
  render: function Preview(args) {
    const name = useId();

    return (
      <>
        <Chip.Radio {...args} name={name} value="english" defaultChecked>
          English
        </Chip.Radio>
        <Chip.Radio {...args} name={name} value="norwegian">
          Norwegian
        </Chip.Radio>
      </>
    );
  },
});

export const CheckboxVariant = meta.story(() => (
  <Chip.Checkbox>English</Chip.Checkbox>
));

export const Removable = meta.story(() => (
  <Chip.Removable aria-label="Delete Norway">Norway</Chip.Removable>
));

export const AsButton = meta.story(() => (
  <Chip.Button>Clear all filters</Chip.Button>
));

export const Wrap = meta.story(() => (
  <div style={{ maxWidth: 340 }}>
    <Chip.Button data-wrap="wrap">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Chip.Button>
  </div>
));

// Gnist: unchecked chips in a selection of colours, covering what our
// override changes. Keep this single matrix: it is the override's part of the
// combined Chromatic snapshot in Chip.chromatic.stories.tsx.

const chipColors = ["accent", "neutral", "info", "warning", "danger"] as const;
const chipKinds = ["radio", "checkbox", "button", "disabled"] as const;

const HelpText = ({ text }: { text: string }) => (
  <span
    style={{
      fontSize: "var(--ds-font-size-3)",
      color: `var(--ds-color-neutral-text-subtle)`,
    }}
  >
    {text}
  </span>
);

export const ColorMatrix = meta.story({
  render: function ColorMatrix() {
    const name = useId();

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${chipKinds.length + 1}, max-content)`,
          gap: "var(--ds-size-4)",
          placeItems: "center",
        }}
      >
        <div style={{ visibility: "hidden" }} />
        {chipKinds.map((kind) => (
          <HelpText key={kind} text={kind} />
        ))}
        {chipColors.map((color) => (
          <Fragment key={color}>
            <HelpText text={color} />
            <Chip.Radio name={`${name}-${color}`} data-color={color}>
              Radio
            </Chip.Radio>
            <Chip.Checkbox data-color={color}>Checkbox</Chip.Checkbox>
            <Chip.Button data-color={color}>Button</Chip.Button>
            <Chip.Checkbox data-color={color} disabled>
              Disabled
            </Chip.Checkbox>
          </Fragment>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Chip.Checkbox data-color={color}>Checkbox</Chip.Checkbox>`,
      },
    },
  },
});
