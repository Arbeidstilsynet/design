// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tooltip/tooltip.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/tooltip/metadata.json

import { Button, Tooltip } from "@arbeidstilsynet/design-react";
import { FilesIcon } from "@navikt/aksel-icons";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Tooltip",
  component: Tooltip,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Tooltip displays brief information when the user hovers over or focuses on an element. It is used for secondary information, such as explaining the meaning of an icon.",
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
    content: "Copy",
    placement: "top",
    children: (
      <Button icon aria-label="Copy">
        <FilesIcon aria-hidden />
      </Button>
    ),
  },
  // Gnist: hover the trigger, so its snapshot shows the open tooltip.
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Copy" }));
    const tooltip = await waitFor(() => {
      const element =
        canvasElement.ownerDocument.body.querySelector(".ds-tooltip");
      if (!element) throw new Error("Tooltip not rendered");
      return element;
    });
    await waitFor(() => expect(tooltip).toBeVisible());
    await expect(tooltip).toHaveTextContent("Copy");
  },
  parameters: {
    // Gnist: the tooltip is in the top layer; fill the viewport so the
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

export const WithString = meta.story(() => (
  <Tooltip content="Organisation number">Org. no.</Tooltip>
));

export const Placement = meta.story(() => (
  <Tooltip content="Copy" placement="bottom">
    <Button icon aria-label="Copy">
      <FilesIcon aria-hidden />
    </Button>
  </Tooltip>
));

export const Aria = meta.story(() => (
  <>
    <Tooltip content="I am aria-describedby">
      <Button>I am aria-describedby</Button>
    </Tooltip>

    <Tooltip content="I am aria-labelledby">
      <Button icon>
        <FilesIcon aria-hidden />
      </Button>
    </Tooltip>
  </>
));
