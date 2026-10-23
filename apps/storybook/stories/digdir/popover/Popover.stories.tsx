// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/popover/popover.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/popover/metadata.json

import { Button, Paragraph, Popover } from "@arbeidstilsynet/design-react";
import { TrashIcon } from "@navikt/aksel-icons";
import { useId, useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Popover",
  component: Popover,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Popover.TriggerContext": Popover.TriggerContext,
    "Popover.Trigger": Popover.Trigger,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Popover appears above other elements in the interface and is linked to a specific element. It is used to display additional information, interactive elements, or brief explanations without navigating away from the page.",
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
    placement: "top",
    children:
      "The popover provides a quick message. You can use it to show the user information that is relevant to the context.",
  },
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover {...args} />
    </Popover.TriggerContext>
  ),
  // Gnist: open the popover, so its snapshot shows the open state.
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open popover" }));
    await waitFor(() =>
      expect(
        canvas.getByText(/The popover provides a quick message/),
      ).toBeVisible(),
    );
  },
  parameters: {
    // Gnist: the open popover is in the top layer; fill the viewport so the
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

export const Interactive = meta.story(() => (
  <Popover.TriggerContext>
    <Popover.Trigger data-color="danger" aria-label="Delete row">
      <TrashIcon title="Delete row" />
    </Popover.Trigger>
    <Popover data-color="danger">
      <Paragraph>
        Are you sure you want to delete this row? This action cannot be undone.
      </Paragraph>
      <div
        style={{
          display: "flex",
          gap: "var(--ds-size-2)",
          marginTop: "var(--ds-size-2)",
        }}
      >
        <Button data-size="sm">Yes, delete it</Button>
        <Button data-size="sm" variant="tertiary">
          Cancel
        </Button>
      </div>
    </Popover>
  </Popover.TriggerContext>
));

export const DottedUnderline = meta.story(() => (
  <Popover.TriggerContext>
    <Paragraph>
      We use <Popover.Trigger inline>design tokens</Popover.Trigger> to ensure a
      consistent design.
    </Paragraph>
    <Popover data-color="neutral">
      <Paragraph>
        <strong
          style={{
            display: "block",
          }}
        >
          Design tokens
        </strong>
        Design tokens are a collection of variables that define the visual style
        within a design system.
      </Paragraph>
    </Popover>
  </Popover.TriggerContext>
));

export const Controlled = meta.story({
  render: function Controlled() {
    const [open, setOpen] = useState(false);

    return (
      <Popover.TriggerContext>
        <Popover.Trigger onClick={() => setOpen(!open)}>Delete</Popover.Trigger>
        <Popover open={open} onClose={() => setOpen(false)} data-color="danger">
          <Paragraph>Are you sure you want to delete this?</Paragraph>
          <div
            style={{
              display: "flex",
              gap: "var(--ds-size-2)",
              marginTop: "var(--ds-size-2)",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              data-size="sm"
              data-color="danger"
            >
              Delete
            </Button>
            <Button
              data-variant="tertiary"
              onClick={() => setOpen(false)}
              data-size="sm"
            >
              Cancel
            </Button>
          </div>
        </Popover>
      </Popover.TriggerContext>
    );
  },
});

export const WithoutContext = meta.story({
  render: function WithoutContext() {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
      <>
        <Button
          data-color="danger"
          popovertarget={id}
          onClick={() => setOpen(!open)}
        >
          Delete
        </Button>

        <Popover
          id={id}
          open={open}
          onClose={() => setOpen(false)}
          data-color="danger"
        >
          <Paragraph>Are you sure you want to delete?</Paragraph>
          <Button
            onClick={() => setOpen(false)}
            data-size="sm"
            style={{ marginTop: "var(--ds-size-2)" }}
          >
            Delete
          </Button>
        </Popover>
      </>
    );
  },
});
