// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/divider/divider.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/divider/metadata.json

import { Divider, Paragraph } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Divider",
  component: Divider,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Divider is used to create a visual separation between content. It is a simple horizontal line that spans the available width.",
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
    <>
      <Paragraph>
        Divider is used to separate content into smaller parts.
      </Paragraph>
      <Divider {...args} />
      <Paragraph>
        It can also be used to separate content that is related to each other.
      </Paragraph>
    </>
  ),
  parameters: {
    // Gnist: stack the paragraphs so the divider spans the full width.
    customStyles: {
      display: "block",
    },
  },
});
