// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/button/button.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/button/metadata.json

import { Button, type ButtonProps } from "@arbeidstilsynet/design-react";
import { PencilWritingIcon } from "@navikt/aksel-icons";
import { Fragment } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Button",
  component: Button,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle: "Button allows users to perform actions.",
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
    children: "My button",
  },
});

export const Variants = meta.story(() => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
  </>
));

export const ColorVariants = meta.story(() => {
  const colorVariants = ["accent", "neutral", "danger"];

  return (
    <>
      {colorVariants.map((color) => (
        <Button
          key={color}
          data-color={color as ButtonProps["data-color"]}
          variant="primary"
        >
          {color}
        </Button>
      ))}
    </>
  );
});

export const Icons = meta.story(() => (
  <>
    <Button icon aria-label="Icon only">
      <PencilWritingIcon aria-hidden />
    </Button>
    <Button>
      <PencilWritingIcon aria-hidden />
      Edit
    </Button>
  </>
));

export const CombinedColors = meta.story(() => (
  <>
    <Button variant="primary" data-color="neutral">
      Publish
    </Button>
    <Button variant="secondary" data-color="neutral">
      Save draft
    </Button>
    <Button variant="tertiary" data-color="danger">
      Delete
    </Button>
  </>
));

export const AsLink = meta.story(() => (
  <Button asChild>
    <a target="_blank" rel="noreferrer" href="https://www.designsystemet.no">
      Go to designsystemet.no
    </a>
  </Button>
));

export const Loading = meta.story(() => (
  <>
    <Button variant="primary" loading>
      Loading…
    </Button>
    <Button variant="secondary" loading>
      Loading…
    </Button>
    <Button variant="tertiary" loading>
      Loading…
    </Button>
  </>
));

// Gnist: every variant in a selection of colours, with text, icon and rounded
// icon buttons, covering what our override changes. Keep this single matrix:
// it is the override's part of the combined Chromatic snapshot in
// Button.chromatic.stories.tsx.

const buttonColors = [
  "accent",
  "neutral",
  "info",
  "warning",
  "danger",
] as const;
const buttonVariants = ["primary", "secondary", "tertiary"] as const;

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

export const VariantMatrix = meta.story({
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${buttonVariants.length + 1}, max-content)`,
        gap: "var(--ds-size-4)",
        placeItems: "center",
      }}
    >
      <div style={{ visibility: "hidden" }} />
      {buttonVariants.map((variant) => (
        <HelpText key={variant} text={variant} />
      ))}
      {buttonColors.map((color) => (
        <Fragment key={color}>
          <HelpText text={color} />
          {buttonVariants.map((variant) => (
            <div
              key={variant}
              style={{
                display: "flex",
                gap: "var(--ds-size-2)",
                alignItems: "center",
              }}
            >
              <Button variant={variant} data-color={color}>
                Button
              </Button>
              <Button variant={variant} data-color={color}>
                <PencilWritingIcon aria-hidden />
                Edit
              </Button>
              <Button
                variant={variant}
                data-color={color}
                icon
                aria-label="Edit"
              >
                <PencilWritingIcon aria-hidden />
              </Button>
              <Button
                variant={variant}
                data-color={color}
                icon
                aria-label="Edit"
                style={{ borderRadius: "50%" }}
              >
                <PencilWritingIcon aria-hidden />
              </Button>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant={variant} data-color={color}>
  Button
</Button>
<Button variant={variant} data-color={color}>
  <PencilWritingIcon aria-hidden />
  Edit
</Button>
<Button variant={variant} data-color={color} icon aria-label="Edit">
  <PencilWritingIcon aria-hidden />
</Button>
<Button
  variant={variant}
  data-color={color}
  icon
  aria-label="Edit"
  style={{ borderRadius: "50%" }}
>
  <PencilWritingIcon aria-hidden />
</Button>`,
      },
    },
  },
});
