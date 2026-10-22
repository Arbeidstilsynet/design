// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/breadcrumbs/breadcrumbs.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/breadcrumbs/metadata.json

import { Breadcrumbs } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Breadcrumbs",
  component: Breadcrumbs,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Breadcrumbs.List": Breadcrumbs.List,
    "Breadcrumbs.Item": Breadcrumbs.Item,
    "Breadcrumbs.Link": Breadcrumbs.Link,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Breadcrumbs help users understand where they are within a structure and make it possible to navigate back to higher levels.",
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
    "aria-label": "You are here:",
  },
  render: (args) => (
    <>
      <Breadcrumbs {...args}>
        <Breadcrumbs.Link href="#" aria-label="Back to Level 3">
          Level 3
        </Breadcrumbs.Link>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Level 1</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Level 2</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Level 3</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="#">Level 4</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </>
  ),
});

export const ListOnly = meta.story(() => (
  <Breadcrumbs aria-label="You are here:">
    <Breadcrumbs.List>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 1</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 2</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 3</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 4</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  </Breadcrumbs>
));

export const BackOnly = meta.story(() => (
  <Breadcrumbs aria-label="Breadcrumbs menu">
    <Breadcrumbs.Link href="#" aria-label="Back to Level 3">
      Level 3
    </Breadcrumbs.Link>
  </Breadcrumbs>
));

export const LongItems = meta.story(() => (
  <Breadcrumbs aria-label="Breadcrumbs menu">
    <Breadcrumbs.Link
      href="#"
      aria-label="Back to health certificate for seafood"
    >
      How to apply for a health certificate for seafood
    </Breadcrumbs.Link>
    <Breadcrumbs.List aria-label="You are here:">
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">
          Export to countries outside the EU/EEA
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Export of food and drink</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Export of fish and seafood</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">
          Guidance on health certificates for seafood
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">
          How to apply for a health certificate for seafood
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">
          How to apply for a health certificate in the new export solution
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  </Breadcrumbs>
));

export const MobileViewport = meta.story(() => (
  <Breadcrumbs aria-label="You are here:">
    <Breadcrumbs.Link href="#" aria-label="Back to Level 3">
      Level 3
    </Breadcrumbs.Link>
    <Breadcrumbs.List>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 1</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 2</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 3</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="#">Level 4</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  </Breadcrumbs>
));
