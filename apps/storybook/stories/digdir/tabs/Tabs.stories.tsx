// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tabs/tabs.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tabs/metadata.json

import { Tabs, Tooltip } from "@arbeidstilsynet/design-react";
import { BicycleIcon, CarIcon, MotorcycleIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Tabs",
  component: Tabs,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Tabs.List": Tabs.List,
    "Tabs.Tab": Tabs.Tab,
    "Tabs.Panel": Tabs.Panel,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Tabs allow users to navigate between related sections of content, with only one section visible at a time. This is an effective way to organize and present related content on the same page.",
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
    defaultValue: "value1",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="value1">content 1</Tabs.Panel>
      <Tabs.Panel value="value2">content 2</Tabs.Panel>
      <Tabs.Panel value="value3">content 3</Tabs.Panel>
    </Tabs>
  ),
});

export const IconsOnly = meta.story(() => (
  <Tabs defaultValue="car">
    <Tabs.List>
      <Tooltip content="Your cars">
        <Tabs.Tab value="car">
          <CarIcon title="Car" />
        </Tabs.Tab>
      </Tooltip>
      <Tooltip content="Your bicycles">
        <Tabs.Tab value="bicycle">
          <BicycleIcon title="Bicycle" />
        </Tabs.Tab>
      </Tooltip>
      <Tooltip content="Your motorcycles">
        <Tabs.Tab value="motorcycle">
          <MotorcycleIcon title="Motorcycle" />
        </Tabs.Tab>
      </Tooltip>
    </Tabs.List>
    <Tabs.Panel value="car">
      You have no items of this type registered with us
    </Tabs.Panel>
    <Tabs.Panel value="bicycle">
      You have no items of this type registered with us
    </Tabs.Panel>
    <Tabs.Panel value="motorcycle">
      You have no items of this type registered with us
    </Tabs.Panel>
  </Tabs>
));

export const IconsWithText = meta.story(() => (
  <Tabs defaultValue="car">
    <Tabs.List>
      <Tabs.Tab value="car">
        <CarIcon aria-hidden="true" />
        Cars
      </Tabs.Tab>

      <Tabs.Tab value="bicycle">
        <BicycleIcon aria-hidden="true" />
        Bicycles
      </Tabs.Tab>

      <Tabs.Tab value="motorcycle">
        <MotorcycleIcon aria-hidden="true" />
        Motorcycles
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="car">
      You have no items of this type registered with us
    </Tabs.Panel>
    <Tabs.Panel value="bicycle">
      You have no items of this type registered with us
    </Tabs.Panel>
    <Tabs.Panel value="motorcycle">
      You have no items of this type registered with us
    </Tabs.Panel>
  </Tabs>
));

export const Controlled = meta.story({
  render: function Controlled() {
    const [value, setValue] = useState("value1");

    return (
      <Tabs value={value} onChange={(newValue) => setValue(newValue)}>
        <Tabs.List>
          <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="value1">content 1</Tabs.Panel>
        <Tabs.Panel value="value2">content 2</Tabs.Panel>
        <Tabs.Panel value="value3">content 3</Tabs.Panel>
      </Tabs>
    );
  },
});

export const PanelReuse = meta.story({
  render: function PanelReuse() {
    const [selectedTab, setSelectedTab] = useState("About");
    const tabs = [
      ["About", <div key="about">About</div>],
      ["Timetable", <div key="timetable">Timetable</div>],
      ["Exam", <div key="exam">Exam</div>],
    ] as const;

    return (
      <Tabs defaultValue={selectedTab} onChange={setSelectedTab}>
        <Tabs.List>
          {tabs.map(([label]) => (
            <Tabs.Tab
              key={label}
              value={label}
              aria-selected={`${selectedTab === label}`}
            >
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map(([label, content]) => (
          <Tabs.Panel key={label} value={label} hidden={selectedTab !== label}>
            {content}
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  },
});
