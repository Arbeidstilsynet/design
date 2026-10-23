// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/skip-link/skip-link.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/skip-link/metadata.json

import { Paragraph, SkipLink } from "@arbeidstilsynet/design-react";
import { useId } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/SkipLink",
  component: SkipLink,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Skip link helps people using keyboard navigation to navigate, so they can easily go to the main content on a page.",
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
    children: "Skip to main content",
    href: "#main-content",
  },
  render: function Preview(args) {
    const id = useId();

    return (
      <>
        <Paragraph>
          To reveal the skip link, tab into this example, or click inside the
          example and press <kbd>Tab</kbd>.
          {/* Gnist: a unique id, since docs pages render the story twice. */}
          <SkipLink {...args} href={`#${id}`} />
        </Paragraph>
        <main id={id} tabIndex={-1}>
          Region that can receive focus from the skip link.
        </main>
      </>
    );
  },
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
