// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/link/link.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/link/metadata.json

import { Link, Paragraph } from "@arbeidstilsynet/design-react";
import { Chat2Icon } from "@navikt/aksel-icons";
import { Fragment, useId } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Link",
  component: Link,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Link is clickable text or graphics that take the user to other pages or documents.",
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
    href: "https://designsystemet.no/en/patterns/external-links/",
    children: "Labelling links",
  },
});

export const InText = meta.story({
  render: function InText() {
    const rand = useId();

    return (
      <Paragraph>
        We use components from{" "}
        <Link href={"https://designsystemet.no?q=" + rand}>
          designsystemet.no
        </Link>
        .
      </Paragraph>
    );
  },
});

export const WithIcon = meta.story(() => (
  <Link href="https://designsystemet.no/slack">
    <Chat2Icon aria-hidden height={"1.5rem"} width={"1.5rem"} />
    <span>Talk to us on Slack</span>
  </Link>
));

export const Neutral = meta.story(() => (
  <Link
    href={"https://designsystemet.no/en/intro/privacy-policy"}
    data-color="neutral"
  >
    Privacy Policy
  </Link>
));

// Gnist: a link alone and in text in a selection of colours, covering what
// our override changes. Keep this single matrix: it is the override's part of
// the combined Chromatic snapshot in Link.chromatic.stories.tsx.

const linkColors = ["accent", "neutral", "info", "warning", "danger"] as const;

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
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: "var(--ds-size-4)",
        alignItems: "center",
      }}
    >
      <div style={{ visibility: "hidden" }} />
      <HelpText text="link" />
      <HelpText text="in text" />
      {linkColors.map((color) => (
        <Fragment key={color}>
          <HelpText text={color} />
          <Link href="https://designsystemet.no/" data-color={color}>
            Link
          </Link>
          <Paragraph>
            Text with a{" "}
            <Link href="https://designsystemet.no/" data-color={color}>
              link
            </Link>
            .
          </Paragraph>
        </Fragment>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Link href={href} data-color={color}>
  Link
</Link>`,
      },
    },
  },
});
