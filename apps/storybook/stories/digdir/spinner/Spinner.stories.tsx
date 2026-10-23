// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/spinner/spinner.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/spinner/metadata.json

import { Paragraph, Spinner } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Spinner",
  component: Spinner,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Spinner is used to indicate that content or an action is loading, and that the user must wait before they can continue.",
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
    "aria-label": "Loading coffee",
  },
});

export const Sizes = meta.story(() => (
  <>
    <Spinner aria-label="Loading coffee" data-size="2xs" />
    <Spinner aria-label="Loading coffee" data-size="xs" />
    <Spinner aria-label="Loading coffee" data-size="sm" />
    <Spinner aria-label="Loading coffee" data-size="md" />
    <Spinner aria-label="Loading coffee" data-size="lg" />
    <Spinner aria-label="Loading coffee" data-size="xl" />
  </>
));

export const Text = meta.story(() => (
  <>
    <Spinner aria-label="Preparing" data-size="sm" />
    <Paragraph>Preparing your file</Paragraph>
  </>
));
