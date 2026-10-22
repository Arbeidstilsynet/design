// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/link/link.dodont.tsx

import { Link } from "@arbeidstilsynet/design-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Link/DoDont",
  component: Link,
  tags: ["!autodocs", "!dev"],
  parameters: {
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-6)",
    },
  },
});

export const DoIcon = meta.story(() => (
  <Link href="https://arbeidsplassen.nav.no/stillinger">
    <span>Find available jobs on arbeidsplassen.no</span>
  </Link>
));

export const DontIcon = meta.story(() => (
  <Link href="https://arbeidsplassen.nav.no/stillinger">
    <ExternalLinkIcon aria-hidden height={"1.5rem"} width={"1.5rem"} />
    <span>Find available jobs</span>
  </Link>
));

export const DoIcon2 = meta.story(() => (
  <Link href="https://designsystemet.no/en/patterns/external-links/">
    <span>Labelling links</span>
  </Link>
));

export const DontIcon2 = meta.story(() => (
  <Link href="https://designsystemet.no/en/patterns/external-links/">
    <span>Read more</span>
  </Link>
));
