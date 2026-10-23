// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/suggestion/suggestion.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/suggestion/metadata.json

import {
  Button,
  Divider,
  EXPERIMENTAL_Suggestion,
  Field,
  Label,
  Paragraph,
  type SuggestionItem,
} from "@arbeidstilsynet/design-react";
import { useRef, useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Suggestion",
  component: EXPERIMENTAL_Suggestion,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Suggestion.Input": EXPERIMENTAL_Suggestion.Input,
    "Suggestion.Toggle": EXPERIMENTAL_Suggestion.Toggle,
    "Suggestion.Clear": EXPERIMENTAL_Suggestion.Clear,
    "Suggestion.List": EXPERIMENTAL_Suggestion.List,
    "Suggestion.Option": EXPERIMENTAL_Suggestion.Option,
    "Suggestion.Empty": EXPERIMENTAL_Suggestion.Empty,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        'Suggestion is a searchable "select" with support for multiple selections.',
    },
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
    // Gnist: our Storybook tests run axe on every story. Axe can't find the
    // listbox inside shadow DOM, so it flags the <data> chips for selected
    // items, and it misreports the roles u-elements sets.
    a11y: {
      config: {
        rules: [
          {
            id: "aria-required-parent",
            matches: (element: Element) =>
              !(element instanceof HTMLDataElement),
          },
          {
            // https://github.com/dequelabs/axe-core/issues/4672
            id: "aria-allowed-role",
            enabled: false,
          },
        ],
      },
    },
  },
});

export const Preview = meta.story({
  render: function Preview(args) {
    const DATA_PLACES = ["Sogndal", "Oslo", "Brønnøysund"];
    return (
      <Field>
        <Label>Select a destination</Label>
        <EXPERIMENTAL_Suggestion {...args}>
          <EXPERIMENTAL_Suggestion.Input />
          <EXPERIMENTAL_Suggestion.Toggle />
          <EXPERIMENTAL_Suggestion.Clear />
          <EXPERIMENTAL_Suggestion.List>
            <EXPERIMENTAL_Suggestion.Empty>
              No results found
            </EXPERIMENTAL_Suggestion.Empty>
            {DATA_PLACES.map((place) => (
              <EXPERIMENTAL_Suggestion.Option
                key={place}
                label={place}
                value={place}
              >
                {place}
                <div>Municipality</div>
              </EXPERIMENTAL_Suggestion.Option>
            ))}
          </EXPERIMENTAL_Suggestion.List>
        </EXPERIMENTAL_Suggestion>
      </Field>
    );
  },
  // Gnist: open the list, so its snapshot shows the open state.
  play: async ({ canvas, userEvent }) => {
    const input = await waitFor(() => canvas.getByRole("combobox"));
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute("aria-expanded", "true"));
    await waitFor(() =>
      expect(canvas.getByRole("option", { name: /Sogndal/ })).toBeVisible(),
    );
  },
  parameters: {
    // Gnist: room for the open list, which the snapshot would otherwise crop.
    customStyles: {
      story: {
        alignItems: "flex-start",
        minHeight: "300px",
      },
    },
    // Gnist: interactive component, opted in to its own snapshot.
    chromatic: { disableSnapshot: false },
  },
});

export const Multiple = meta.story(() => {
  const DATA_PLACES = [
    "Sogndal",
    "Oslo",
    "Brønnøysund",
    "Stavanger",
    "Trondheim",
    "Bergen",
    "Lillestrøm",
  ];
  return (
    <Field>
      <Label>Select a destination</Label>
      <EXPERIMENTAL_Suggestion multiple>
        <EXPERIMENTAL_Suggestion.Input />
        <EXPERIMENTAL_Suggestion.Toggle />
        <EXPERIMENTAL_Suggestion.Clear />
        <EXPERIMENTAL_Suggestion.List>
          <EXPERIMENTAL_Suggestion.Empty>
            No results found
          </EXPERIMENTAL_Suggestion.Empty>
          {DATA_PLACES.map((place) => (
            <EXPERIMENTAL_Suggestion.Option key={place}>
              {place}
            </EXPERIMENTAL_Suggestion.Option>
          ))}
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});

export const Filter = meta.story(() => {
  const DATA_PLACES = [
    "Sogndal",
    "Oslo",
    "Brønnøysund",
    "Stavanger",
    "Trondheim",
    "Bergen",
    "Lillestrøm",
  ];
  return (
    <Field>
      <Label>Enter a number between 1-6</Label>
      <EXPERIMENTAL_Suggestion filter={false}>
        <EXPERIMENTAL_Suggestion.Input />
        <EXPERIMENTAL_Suggestion.Toggle />
        <EXPERIMENTAL_Suggestion.Clear />
        <EXPERIMENTAL_Suggestion.List>
          <EXPERIMENTAL_Suggestion.Empty>
            No results found
          </EXPERIMENTAL_Suggestion.Empty>
          {DATA_PLACES.map((label) => (
            <EXPERIMENTAL_Suggestion.Option
              key={label}
              value={label.toLowerCase()}
            >
              {label}
            </EXPERIMENTAL_Suggestion.Option>
          ))}
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});

export const ControlledMultiple = meta.story({
  render: function ControlledMultiple() {
    const DATA_PLACES = [
      "Sogndal",
      "Oslo",
      "Brønnøysund",
      "Stavanger",
      "Trondheim",
      "Bergen",
      "Lillestrøm",
    ];
    const [selected, setSelected] = useState<string[]>(["Oslo"]);

    return (
      <>
        <Field>
          <Label>Select destinations</Label>
          <EXPERIMENTAL_Suggestion
            multiple
            selected={selected}
            onSelectedChange={(items) =>
              setSelected(items.map((item) => item.value))
            }
          >
            <EXPERIMENTAL_Suggestion.Input />
            <EXPERIMENTAL_Suggestion.Toggle />
            <EXPERIMENTAL_Suggestion.Clear />
            <EXPERIMENTAL_Suggestion.List>
              <EXPERIMENTAL_Suggestion.Empty>
                No results found
              </EXPERIMENTAL_Suggestion.Empty>
              {DATA_PLACES.map((place) => (
                <EXPERIMENTAL_Suggestion.Option
                  key={place}
                  label={place}
                  value={place}
                >
                  {place}
                  <div>Municipality</div>
                </EXPERIMENTAL_Suggestion.Option>
              ))}
            </EXPERIMENTAL_Suggestion.List>
          </EXPERIMENTAL_Suggestion>
        </Field>
        <Divider style={{ marginTop: "var(--ds-size-4)" }} />

        <Paragraph style={{ margin: "var(--ds-size-2) 0" }}>
          Selected destinations: {selected.join(", ")}
        </Paragraph>

        <Button
          onClick={() => {
            setSelected(["Sogndal", "Stavanger"]);
          }}
        >
          Set destinations to Sogndal, Stavanger
        </Button>
      </>
    );
  },
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const Creatable = meta.story(() => {
  const DATA_PLACES = [
    "Sogndal",
    "Oslo",
    "Brønnøysund",
    "Stavanger",
    "Trondheim",
    "Bergen",
    "Lillestrøm",
  ];
  return (
    <Field>
      <Label>Select destination</Label>
      <EXPERIMENTAL_Suggestion creatable multiple>
        <EXPERIMENTAL_Suggestion.Input />
        <EXPERIMENTAL_Suggestion.Toggle />
        <EXPERIMENTAL_Suggestion.Clear />
        <EXPERIMENTAL_Suggestion.List>
          <EXPERIMENTAL_Suggestion.Empty data-empty='Add "%s"' />
          {DATA_PLACES.map((place) => (
            <EXPERIMENTAL_Suggestion.Option key={place}>
              {place}
            </EXPERIMENTAL_Suggestion.Option>
          ))}
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});

export const FetchExternal = meta.story({
  render: function FetchExternal() {
    const empty = "Search for recipes";
    const [options, setOptions] = useState<string[] | string>(empty); // Store results
    const timer = useRef<ReturnType<typeof setTimeout> | number>(0);
    const latestValue = useRef("");

    const getRecipes = async (value: string) => {
      if (!value) return setOptions(empty);
      const api = `https://dummyjson.com/recipes/search?q=${value}`;
      const data = await (await fetch(api)).json();
      if (latestValue.current !== value) return;
      setOptions(
        Array.isArray(data.recipes)
          ? data.recipes.map(({ name }: { name: string }) => name)
          : [],
      );
    };

    const handleInput = (event: React.InputEvent<HTMLInputElement>) => {
      const value = encodeURIComponent(event.currentTarget.value.trim());
      latestValue.current = value;
      setOptions(value ? "Loading..." : empty);
      clearTimeout(timer.current);
      timer.current = setTimeout(getRecipes, 500, value); // Debounce API call
    };

    return (
      <Field lang="en">
        <Label>Search for recipes (in English)</Label>
        <EXPERIMENTAL_Suggestion filter={false}>
          <EXPERIMENTAL_Suggestion.Input
            type="search"
            onInput={handleInput} // Note: using onInput, not onChange
          />
          <EXPERIMENTAL_Suggestion.Toggle />
          <EXPERIMENTAL_Suggestion.Clear />
          <EXPERIMENTAL_Suggestion.List>
            {Array.isArray(options) ? (
              options.map((option) => (
                <EXPERIMENTAL_Suggestion.Option key={option}>
                  {option}
                </EXPERIMENTAL_Suggestion.Option>
              ))
            ) : (
              <EXPERIMENTAL_Suggestion.Empty>
                {options}
              </EXPERIMENTAL_Suggestion.Empty>
            )}
          </EXPERIMENTAL_Suggestion.List>
        </EXPERIMENTAL_Suggestion>
      </Field>
    );
  },
});

export const ClickToNavigate = meta.story(() => {
  const handleSelect = (item: SuggestionItem | null) => {
    const href = item?.value;
    if (href) window.location.href = href;
  };

  return (
    <Field>
      <Label>Click to navigate</Label>
      <EXPERIMENTAL_Suggestion onSelectedChange={handleSelect}>
        <EXPERIMENTAL_Suggestion.Input />
        <EXPERIMENTAL_Suggestion.Toggle />
        <EXPERIMENTAL_Suggestion.Clear />
        <EXPERIMENTAL_Suggestion.List>
          <EXPERIMENTAL_Suggestion.Option value="https://www.designsystemet.no/">
            Designsystemet
          </EXPERIMENTAL_Suggestion.Option>
          <EXPERIMENTAL_Suggestion.Option value="https://www.digdir.no/">
            Digdir
          </EXPERIMENTAL_Suggestion.Option>
          <EXPERIMENTAL_Suggestion.Option value="https://www.uutilsynet.no/">
            UU-tilsynet
          </EXPERIMENTAL_Suggestion.Option>
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});

export const EmailSuggestions = meta.story({
  render: function EmailSuggestions() {
    const [options, setOptions] = useState<string[]>([]); // Store results
    const vendora = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];

    const handleInput = (event: React.InputEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value.trim();
      const name = value.split("@")[0];
      setOptions(value ? vendora.map((vendor) => `${name}@${vendor}`) : []);
    };

    return (
      <Field>
        <Label>Enter your email</Label>
        <EXPERIMENTAL_Suggestion creatable>
          <EXPERIMENTAL_Suggestion.Input
            onInput={handleInput} // Note: using onInput, not onChange
          />
          <EXPERIMENTAL_Suggestion.Toggle />
          <EXPERIMENTAL_Suggestion.Clear />
          <EXPERIMENTAL_Suggestion.List>
            <EXPERIMENTAL_Suggestion.Empty />
            {options.map((option) => (
              <EXPERIMENTAL_Suggestion.Option key={option} value={option}>
                {option}
              </EXPERIMENTAL_Suggestion.Option>
            ))}
          </EXPERIMENTAL_Suggestion.List>
        </EXPERIMENTAL_Suggestion>
      </Field>
    );
  },
});
