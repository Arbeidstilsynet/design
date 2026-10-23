// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/button/button.dodont.tsx

import { Button } from "@arbeidstilsynet/design-react";
import {
  ArrowRightIcon,
  Chat2Icon,
  PersonPlusIcon,
  PlusIcon,
} from "@navikt/aksel-icons";
import preview from "../../../.storybook/preview";

// Only used by <DoDont> on the docs pages, so hidden from the sidebar.
const meta = preview.meta({
  title: "designsystemet.no/Button/DoDont",
  component: Button,
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
  <>
    <Button variant="primary">
      <Chat2Icon aria-hidden />
      Start chat
    </Button>
    <Button variant="secondary">
      <PersonPlusIcon aria-hidden />
      Add
    </Button>
  </>
));

export const DontIcon = meta.story(() => (
  <>
    <Button variant="primary">
      <Chat2Icon aria-hidden /> Start chat <ArrowRightIcon aria-hidden />
    </Button>
    <Button variant="secondary">
      <PlusIcon aria-hidden />
      Add
      <PersonPlusIcon aria-hidden />
    </Button>
  </>
));

export const DoIcon2 = meta.story(() => (
  <Button variant="primary" data-color="accent">
    Log in <ArrowRightIcon aria-hidden />
  </Button>
));

export const DontIcon2 = meta.story(() => (
  <Button variant="primary" data-color="accent">
    Click here <ArrowRightIcon aria-hidden />
  </Button>
));

export const DoIcon3 = meta.story(() => (
  <Button variant="primary" data-color="accent">
    Submit application
  </Button>
));

export const DontIcon3 = meta.story(() => (
  <>
    <Button variant="primary" data-color="accent">
      SUBMIT APPLICATION
    </Button>
    <Button variant="primary" data-color="accent">
      Submit Application
    </Button>
    <Button variant="primary" data-color="accent">
      submit application
    </Button>
  </>
));
