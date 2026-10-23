// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/paragraph/paragraph.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/paragraph/metadata.json

import { Paragraph } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Typography/Paragraph",
  component: Paragraph,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Paragraph is used for continuous text and is typically applied in articles, components, help text, and similar content.",
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
    children:
      "The privacy statement provides information about what personal data we process, how this data is processed, and what rights you have.",
  },
});

export const Sizes = meta.story({
  render: () => (
    <>
      <Paragraph data-size="xl">This is an xl paragraph</Paragraph>
      <Paragraph data-size="lg">This is a lg paragraph</Paragraph>
      <Paragraph data-size="md">This is a md paragraph</Paragraph>
      <Paragraph data-size="sm">This is a sm paragraph</Paragraph>
      <Paragraph data-size="xs">This is an xs paragraph</Paragraph>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
