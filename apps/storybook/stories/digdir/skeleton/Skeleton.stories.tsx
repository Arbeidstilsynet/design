// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/skeleton/skeleton.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/skeleton/metadata.json

import { Heading, Paragraph, Skeleton } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Skeleton",
  component: Skeleton,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Skeleton is used to indicate that content on a page is loading. It provides the user with a visual hint of what the content will eventually look like.",
    },
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
    // Gnist: the stories put an aria-hidden Skeleton inside a Heading on
    // purpose, so the empty-heading rule doesn't apply to them.
    a11y: {
      config: {
        rules: [{ id: "empty-heading", selector: ":has(.ds-skeleton)" }],
      },
    },
  },
});

export const Preview = meta.story({
  args: {
    width: 200,
    height: 100,
  },
});

export const Components = meta.story(() => (
  <>
    <Skeleton variant="circle" width="50px" height="50px" />
    <Skeleton variant="rectangle" width="100px" height="50px" />
    <Paragraph>
      <Skeleton variant="text" width="10" />
    </Paragraph>
  </>
));

export const UsageExample = meta.story({
  render: () => (
    <>
      <Skeleton height="150px" />
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          padding: "5px 0 5px 0",
        }}
      >
        <Skeleton variant="circle" width="30px" height="30px" />
        <Heading>
          <Skeleton variant="text">A medium title</Skeleton>
        </Heading>
      </div>
      <Skeleton variant="text" width="140" />
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const Text = meta.story(() => (
  <>
    <div style={{ flex: "1 1 200px" }}>
      <Heading>A title</Heading>
      <Paragraph data-size="sm">
        Here is a paragraph that spans multiple lines
      </Paragraph>
    </div>
    <div style={{ flex: "1 1 200px" }}>
      <Heading>
        <Skeleton variant="text">A title</Skeleton>
      </Heading>
      <Paragraph data-size="sm">
        <Skeleton variant="text" width={40} />
      </Paragraph>
    </div>
  </>
));
