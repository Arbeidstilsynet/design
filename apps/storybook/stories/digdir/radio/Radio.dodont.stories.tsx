// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/radio/radio.dodont.tsx

import { Fieldset, Paragraph, Radio } from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Radio/DoDont",
  component: Radio,
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
  <Fieldset>
    <Fieldset.Legend>Would you like a meeting?</Fieldset.Legend>
    <Fieldset.Description>
      You can request a meeting with us where we explain the contents of the
      decision.
    </Fieldset.Description>
    <Radio label="Yes" value="yes" name="meeting" />
    <Radio label="No" value="no" name="meeting" />
  </Fieldset>
));

export const DontIcon = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Would you like a meeting?</Fieldset.Legend>
    <Radio label="Yes" value="yes" name="meeting-dont" />
    <Radio label="No" value="no" name="meeting-dont" />
    <Paragraph>
      You can request a meeting with us where we explain the contents of the
      decision.
    </Paragraph>
  </Fieldset>
));
