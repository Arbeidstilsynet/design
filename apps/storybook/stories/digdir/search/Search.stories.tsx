// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/search/search.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/search/metadata.json

import {
  Button,
  Divider,
  Field,
  Label,
  Paragraph,
  Search,
} from "@arbeidstilsynet/design-react";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Search",
  component: Search,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Search.Input": Search.Input,
    "Search.Clear": Search.Clear,
    "Search.Button": Search.Button,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Search allows users to quickly find relevant content on a website or in an application. The component consists of a search field, with or without a search button.",
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
    <Search {...args}>
      <Search.Input type="text" aria-label="Search" />
      <Search.Clear />
      <Button>Search</Button>
    </Search>
  ),
});

export const WithLabel = meta.story(() => (
  <Field>
    <Label>Search for cats</Label>
    <Search>
      <Search.Input type="text" name="cat-search" />
      <Search.Clear />
      <Button>Search</Button>
    </Search>
  </Field>
));

export const Variants = meta.story(() => (
  <>
    <Search>
      <Search.Input aria-label="Search" />
      <Search.Clear />
    </Search>

    <Divider style={{ marginTop: "var(--ds-size-4)" }} />

    <Search>
      <Search.Input type="text" aria-label="Search" />
      <Search.Clear />
      <Button>Search</Button>
    </Search>

    <Divider style={{ marginTop: "var(--ds-size-4)" }} />

    <Search>
      <Search.Input type="text" aria-label="Search" />
      <Search.Clear />
      <Button variant="secondary">Search</Button>
    </Search>
  </>
));

export const Form = meta.story({
  render: function Form() {
    const [value, setValue] = useState<string>();
    const [submittedValue, setSubmittedValue] = useState<string>();

    return (
      <>
        <form
          onSubmit={(e) => {
            // Prevent navigation from Storybook
            e.preventDefault();
            setSubmittedValue(value);
          }}
        >
          <Search>
            <Search.Input
              type="text"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Search.Clear />
            <Search.Button />
          </Search>
        </form>

        <Paragraph data-size="md" style={{ marginTop: "var(--ds-size-2)" }}>
          Submitted value: {submittedValue}
        </Paragraph>
      </>
    );
  },
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
