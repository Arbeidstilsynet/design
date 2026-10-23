// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/badge/badge.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/badge/metadata.json

import { Badge, Button, Tabs } from "@arbeidstilsynet/design-react";
import {
  ChatIcon,
  EnvelopeClosedFillIcon,
  InboxIcon,
  VideoFillIcon,
  VideoIcon,
} from "@navikt/aksel-icons";
import type { CSSProperties } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Badge",
  component: Badge,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Badge.Position": Badge.Position,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Badge is a non-interactive component that displays status with or without a number. Use tag if you want text instead of a number.",
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
    count: 15,
    maxCount: 9,
  },
});

export const Floating = meta.story(() => (
  <>
    <Badge.Position placement="top-right">
      <Badge data-color="danger" count={2}></Badge>
      <EnvelopeClosedFillIcon
        title="Messages"
        style={{ height: "2rem", width: "auto" }}
      />
    </Badge.Position>
  </>
));

export const Bullet = meta.story(() => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Badge data-color="success" style={{ marginInlineEnd: "0.5rem" }} />
    Active
  </div>
));

export const CustomPlacement = meta.story(() => (
  <>
    <Badge.Position
      placement="top-right"
      style={
        {
          "--dsc-badge-top": "16%",
          "--dsc-badge-right": "10%",
        } as CSSProperties
      }
    >
      <Badge data-color="accent"></Badge>
      <EnvelopeClosedFillIcon title="Messages" />
    </Badge.Position>
  </>
));

export const Status = meta.story(() => (
  <>
    <Badge.Position data-size="sm">
      <Badge data-color="danger" />
      <VideoFillIcon title="Video camera" />
    </Badge.Position>
    <Badge.Position data-size="md">
      <Badge data-color="danger" />
      <VideoFillIcon title="Video camera" />
    </Badge.Position>
    <Badge.Position data-size="lg">
      <Badge data-color="danger" />
      <VideoFillIcon title="Video camera" />
    </Badge.Position>
  </>
));

export const InTabs = meta.story(() => (
  <Tabs defaultValue="value1">
    <Tabs.List>
      <Tabs.Tab value="value1">
        Favorites
        <Badge count={64} maxCount={10} data-color="neutral" />
      </Tabs.Tab>
      <Tabs.Tab value="value2">Archive</Tabs.Tab>
      <Tabs.Tab value="value3">
        Recent
        <Badge count={2} data-color="neutral" />
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="value1">content 1</Tabs.Panel>
    <Tabs.Panel value="value2">content 2</Tabs.Panel>
    <Tabs.Panel value="value3">content 3</Tabs.Panel>
  </Tabs>
));

export const InButton = meta.story(() => (
  <>
    <Button icon variant="tertiary">
      <Badge.Position>
        <Badge data-color="danger" count={1000} maxCount={99} />
        <InboxIcon title="Inbox" />
      </Badge.Position>
    </Button>
    <Button icon variant="tertiary">
      <Badge.Position>
        <Badge data-color="danger" count={10} />
        <ChatIcon title="Messages" />
      </Badge.Position>
    </Button>
    <Button icon variant="tertiary">
      <Badge.Position>
        <Badge data-color="danger"></Badge>
        <VideoIcon title="Turn on video" />
      </Badge.Position>
    </Button>
  </>
));

export const Variants = meta.story(() => {
  const VariantsMap: {
    [key: string]: { [key: string]: string };
  } = {
    neutralBase: {
      "data-color": "neutral",
    },
    neutralTinted: {
      "data-color": "neutral",
      variant: "tinted",
    },
    dangerBase: {
      "data-color": "danger",
    },
    dangerTinted: {
      "data-color": "danger",
      variant: "tinted",
    },
    infoBase: {
      "data-color": "info",
    },
    infoTinted: {
      "data-color": "info",
      variant: "tinted",
    },
    warningBase: {
      "data-color": "warning",
    },
    warningTinted: {
      "data-color": "warning",
      variant: "tinted",
    },
  };
  return (
    <>
      {Object.entries(VariantsMap).map(([key, value]) => (
        <Badge key={key} {...value} count={15} maxCount={9} />
      ))}
    </>
  );
});
