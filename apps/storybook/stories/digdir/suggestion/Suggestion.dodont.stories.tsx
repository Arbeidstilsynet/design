// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/suggestion/suggestion.dodont.tsx

import {
  EXPERIMENTAL_Suggestion,
  Field,
  Label,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Suggestion/DoDont",
  component: EXPERIMENTAL_Suggestion,
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

export const DoIcon = meta.story(() => {
  const DATA_PLACES = [
    "Albania",
    "Andorra",
    "Austria",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kazakhstan",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ];
  return (
    <Field>
      <Label>Which country are you from?</Label>
      <EXPERIMENTAL_Suggestion>
        <EXPERIMENTAL_Suggestion.Input />
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
              <div>Europe</div>
            </EXPERIMENTAL_Suggestion.Option>
          ))}
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});

export const DontIcon = meta.story(() => {
  const DATA_PLACES = [
    "Albania",
    "Andorra",
    "Austria",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kazakhstan",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ];
  return (
    <Field>
      <Label>Type to search for countries</Label>
      <EXPERIMENTAL_Suggestion>
        <EXPERIMENTAL_Suggestion.Input />
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
              <div>Europe</div>
            </EXPERIMENTAL_Suggestion.Option>
          ))}
        </EXPERIMENTAL_Suggestion.List>
      </EXPERIMENTAL_Suggestion>
    </Field>
  );
});
