// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tag/tag.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tag/metadata.json

import { Paragraph, Tag, type TagProps } from "@arbeidstilsynet/design-react";
import { RobotIcon } from "@navikt/aksel-icons";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Tag",
  component: Tag,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Tag is a label that can be used to categorize items or communicate progress, status, or process. Tags can provide users with a quicker overview of content.",
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
    children: "New",
  },
});

export const Sizes = meta.story(() => {
  const sizes = ["sm", "md", "lg"] as const;
  return (
    <>
      {sizes.map((size) => (
        <Tag key={size} data-size={size}>
          {size}
        </Tag>
      ))}
    </>
  );
});

export const Colors = meta.story(() => {
  const colors = [
    "accent",
    "brand1",
    "brand2",
    "brand3",
    "neutral",
    "success",
    "warning",
    "danger",
    "info",
  ] as TagProps["data-color"][];
  return (
    <>
      {colors.map((color) => (
        <Tag key={color} data-color={color}>
          {color}
        </Tag>
      ))}
    </>
  );
});

export const Icons = meta.story(() => (
  <Tag
    data-color="neutral"
    data-size="md"
    style={{
      paddingInlineStart: "var(--ds-size-1)",
    }}
  >
    <RobotIcon aria-hidden style={{ marginInlineEnd: "var(--ds-size-1)" }} />
    This text is AI-generated
  </Tag>
));

export const Variants = meta.story(() => {
  const colors = [
    "accent",
    "brand1",
    "brand2",
    "brand3",
    "neutral",
    "success",
    "warning",
    "danger",
    "info",
  ] as TagProps["data-color"][];
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "var(--ds-size-2)",
          flexWrap: "wrap",
        }}
      >
        <Paragraph>Default:</Paragraph>
        {colors.map((color) => (
          <Tag
            key={color}
            data-color={color as TagProps["data-color"]}
            variant="default"
          >
            {color}
          </Tag>
        ))}
      </div>
      <br />
      <div
        style={{
          display: "flex",
          gap: "var(--ds-size-2)",
          flexWrap: "wrap",
        }}
      >
        <Paragraph>Outline:</Paragraph>
        {colors.map((color) => (
          <Tag
            key={color}
            data-color={color as TagProps["data-color"]}
            variant="outline"
          >
            {color}
          </Tag>
        ))}
      </div>
    </>
  );
});
