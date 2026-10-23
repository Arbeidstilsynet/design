// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/heading/heading.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/heading/metadata.json

import { Heading } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Typography/Heading",
  component: Heading,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Heading is used to structure content and create hierarchy on a page.",
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
    children: "This is a heading",
  },
});

export const Sizes = meta.story({
  render: () => (
    <>
      <Heading data-size="2xl" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is a 2xl heading
      </Heading>
      <Heading data-size="xl" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is an xl heading
      </Heading>
      <Heading data-size="lg" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is a lg heading
      </Heading>
      <Heading data-size="md" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is a md heading
      </Heading>
      <Heading data-size="sm" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is a sm heading
      </Heading>
      <Heading data-size="xs" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is an xs heading
      </Heading>
      <Heading data-size="2xs" style={{ marginBottom: "var(--ds-size-4)" }}>
        This is a 2xs heading
      </Heading>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
