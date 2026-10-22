// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/switch/switch.dodont.tsx

import { Fieldset, Switch } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Switch/DoDont",
  component: Switch,
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
  <Switch label="Flight mode" data-color="accent" />
));

export const DontIcon = meta.story(() => (
  <Switch label="Turn off flight mode" data-color="accent" />
));

export const DoIcon2 = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Turn notifications on/off</Fieldset.Legend>
    <Switch label="Email" />
    <Switch label="SMS" />
  </Fieldset>
));

export const DontIcon2 = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Turn notifications on/off</Fieldset.Legend>
    <Switch label="Send email" />
    <Switch label="SMS" />
  </Fieldset>
));
