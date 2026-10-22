// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/dropdown/dropdown.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/dropdown/metadata.json

import { Button, Dropdown } from "@arbeidstilsynet/design-react";
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from "@navikt/aksel-icons";
import { useId, useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Dropdown",
  component: Dropdown,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Dropdown.TriggerContext": Dropdown.TriggerContext,
    "Dropdown.Trigger": Dropdown.Trigger,
    "Dropdown.Heading": Dropdown.Heading,
    "Dropdown.List": Dropdown.List,
    "Dropdown.Item": Dropdown.Item,
    "Dropdown.Button": Dropdown.Button,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Dropdown is a generic dropdown list. It lays the foundation for building menus and lists.",
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
  render: function Preview(args) {
    const id = useId();

    return (
      <>
        <Button popovertarget={id}>Dropdown</Button>
        <Dropdown {...args} id={id}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Item 1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Item 2</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
  // Gnist: open the dropdown, so its snapshot shows the open state.
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Dropdown" }));
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Item 2" })).toBeVisible(),
    );
  },
  parameters: {
    // Gnist: the open dropdown is in the top layer; fill the viewport so the
    // snapshot captures it.
    layout: "fullscreen",
    customStyles: {
      story: {
        boxSizing: "border-box",
        height: "100cqh",
        width: "100cqw",
      },
    },
    // Gnist: interactive component, opted in to its own snapshot.
    chromatic: { disableSnapshot: false },
  },
});

export const Icons = meta.story({
  render: function Icons() {
    const id = useId();

    return (
      <>
        <Button popovertarget={id}>Dropdown</Button>
        <Dropdown id={id}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button asChild>
                <a
                  href="https://github.com/digdir/designsystemet"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon aria-hidden />
                  Github
                </a>
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button asChild>
                <a
                  href="https://designsystemet.no"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon aria-hidden />
                  Designsystemet.no
                </a>
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
});

export const Headings = meta.story({
  render: function Headings() {
    const id = useId();

    return (
      <>
        <Button popovertarget={id}>Dropdown</Button>
        <Dropdown id={id}>
          <Dropdown.Heading>First heading</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Button 1.1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Button 1.2</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.Heading>Second heading</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Button 2.1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Button 2.2</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
});

export const Controlled = meta.story({
  render: function Controlled() {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)}>
          Dropdown
          {open ? (
            <ChevronDownIcon aria-hidden />
          ) : (
            <ChevronUpIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown open={open} onClose={() => setOpen(false)}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Click me to close
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                I close too
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
});

export const TriggerContext = meta.story(() => (
  <Dropdown.TriggerContext>
    <Dropdown.Trigger>Trigger</Dropdown.Trigger>
    <Dropdown>
      <Dropdown.List>
        <Dropdown.Item>
          <Dropdown.Button>Item 1</Dropdown.Button>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown.Button>Item 2</Dropdown.Button>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  </Dropdown.TriggerContext>
));
