// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/list/list.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/list/metadata.json

import { Heading, List } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/List",
  component: List.Unordered,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "List.Ordered": List.Ordered,
    "List.Item": List.Item,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "List is used to present content in a clear and structured way, for example to summarize main points or show the user which steps must be followed in a specific order.",
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
    <List.Unordered {...args}>
      <List.Item>Bøyabreen</List.Item>
      <List.Item>Briksdalsbreen</List.Item>
      <List.Item>Nigardsbreen</List.Item>
    </List.Unordered>
  ),
});

export const Ordered = meta.story({
  render: () => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: "var(--ds-size-2)" }}
      >
        How to do it:
      </Heading>

      <List.Ordered>
        <List.Item>
          Pat the chicken breasts dry before seasoning and frying
        </List.Item>
        <List.Item>Add salt and pepper to the breasts</List.Item>
        <List.Item>
          Fry the breasts on high heat for two minutes on each side
        </List.Item>
      </List.Ordered>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const Unordered = meta.story({
  render: () => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: "var(--ds-size-2)" }}
      >
        The association is required to have an auditor if it has
      </Heading>

      <List.Unordered>
        <List.Item>
          an average number of employees equivalent to ten full-time positions
          or more
        </List.Item>
        <List.Item>
          a balance sheet total of 27 million kroner or more
        </List.Item>
        <List.Item>operating income of 35 million kroner or more</List.Item>
      </List.Unordered>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const Write1 = meta.story({
  render: () => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: "var(--ds-size-2)" }}
      >
        The application deadline is
      </Heading>
      <List.Unordered>
        <List.Item>
          15 November for the full year or autumn semester only
        </List.Item>
        <List.Item>15 March for the spring semester</List.Item>
      </List.Unordered>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const Write2 = meta.story({
  render: () => (
    <>
      <Heading
        level={2}
        data-size="xs"
        style={{ marginBottom: "var(--ds-size-2)" }}
      >
        As a general rule, you must meet these requirements:
      </Heading>
      <List.Unordered>
        <List.Item>You must be between 18 and 67 years old.</List.Item>
        <List.Item>
          You must have been a member of the National Insurance Scheme for the
          last 5 years before you became ill or injured.
        </List.Item>
        <List.Item>
          You must have at least a 50 per cent reduction in your ability to work
          and earn an income.
        </List.Item>
      </List.Unordered>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
