// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/dialog/dialog.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/dialog/metadata.json

import {
  Button,
  Checkbox,
  Dialog,
  type DialogProps,
  Fieldset,
  Heading,
  Label,
  Paragraph,
  Radio,
  Textarea,
  Textfield,
} from "@arbeidstilsynet/design-react";
import { type ChangeEvent, useId, useRef, useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Dialog",
  component: Dialog,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Dialog.Block": Dialog.Block,
    "Dialog.TriggerContext": Dialog.TriggerContext,
    "Dialog.Trigger": Dialog.Trigger,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "There are two types of dialogs: modal and non-modal. A modal dialog requires users to take action before they can continue using the page. A non-modal dialog allows users to continue using the page, even while the dialog is open.",
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
        <Button command="show-modal" commandfor={id}>
          Open Dialog
        </Button>
        <Dialog {...args} id={id}>
          <Heading style={{ marginBottom: "var(--ds-size-2)" }}>
            Dialog header
          </Heading>
          <Paragraph style={{ marginBottom: "var(--ds-size-2)" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
        </Dialog>
      </>
    );
  },
  // Gnist: open the dialog, so its snapshot shows the open state.
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open Dialog" }));
    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toHaveAttribute("open");
    await waitFor(() => expect(dialog).toBeVisible());
  },
  parameters: {
    // Gnist: the open modal dialog is in the top layer; fill the viewport so
    // the snapshot captures it.
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

export const WithCommand = meta.story({
  render: function WithCommand() {
    const id = useId();

    return (
      <>
        <Button command="show-modal" commandfor={id}>
          Open Dialog with command
        </Button>
        <Dialog id={id}>
          <Heading style={{ marginBottom: "var(--ds-size-2)" }}>
            Dialog header
          </Heading>
          <Paragraph style={{ marginBottom: "var(--ds-size-2)" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
        </Dialog>
      </>
    );
  },
});

export const TriggerContext = meta.story(() => (
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog>
      <Heading style={{ marginBottom: "var(--ds-size-2)" }}>
        Dialog header
      </Heading>
      <Paragraph style={{ marginBottom: "var(--ds-size-2)" }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
        doloremque obcaecati assumenda odio ducimus sunt et.
      </Paragraph>
      <Paragraph data-size="sm">Dialog footer</Paragraph>
    </Dialog>
  </Dialog.TriggerContext>
));

export const WithRef = meta.story({
  render: function WithRef() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <>
        <Button
          aria-haspopup="dialog"
          onClick={() => dialogRef.current?.showModal()}
        >
          Open Dialog with ref
        </Button>
        <Dialog ref={dialogRef}>
          <Heading style={{ marginBottom: "var(--ds-size-2)" }}>
            Dialog header
          </Heading>
          <Paragraph style={{ marginBottom: "var(--ds-size-2)" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
        </Dialog>
      </>
    );
  },
});

export const ModalDialog = meta.story({
  render: function ModalDialog() {
    const id = useId();

    return (
      <>
        <Button command="show-modal" commandfor={id}>
          Open modal dialog
        </Button>
        <Dialog id={id}>
          <Dialog.Block>
            <Paragraph data-size="sm">Confirm change</Paragraph>
            <Heading>Are you sure you want to change the application?</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>
              Note: You should not change the application after the deadline has
              passed. If you change the application now, you will no longer be
              included in the upcoming admission round. Please contact the
              service centre on +00 00 00 00 if you need guidance.
            </Paragraph>
          </Dialog.Block>
          <Dialog.Block>
            <div
              style={{
                display: "flex",
                gap: "var(--ds-size-4)",
                marginTop: "var(--ds-size-4)",
              }}
            >
              <Button
                variant="primary"
                data-color="danger"
                command="close"
                commandfor={id}
              >
                Yes, change
              </Button>
              <Button variant="secondary" command="close" commandfor={id}>
                Cancel
              </Button>
            </div>
          </Dialog.Block>
        </Dialog>
      </>
    );
  },
});

export const NonModalDialog = meta.story({
  render: function NonModalDialog() {
    const id = useId();
    const textareaId = useId();

    return (
      <>
        <Button command="--show-non-modal" commandfor={id}>
          Open non-modal dialog
        </Button>
        <Dialog
          id={id}
          modal={false}
          style={{
            zIndex: "10",
            top: "calc(100vh - 290px)",
            left: "calc(100vw - 385px)",
            margin: 0,
            maxWidth: "350px",
          }}
        >
          <Heading style={{ marginBottom: "var(--ds-size-4)" }}>
            Let us know
          </Heading>
          <Label htmlFor={textareaId}>How was your experience?</Label>
          <Textarea
            id={textareaId}
            style={{
              marginBottom: "var(--ds-size-6)",
            }}
          />
          <Button>Submit</Button>
        </Dialog>
      </>
    );
  },
});

export const WithForm = meta.story({
  render: function WithForm() {
    const id = useId();
    const [input, setInput] = useState("");

    return (
      <>
        <Button command="show-modal" commandfor={id}>
          Open dialog with command
        </Button>
        <Dialog onClose={() => setInput("")} closedby="any" id={id}>
          <Heading style={{ marginBottom: "var(--ds-size-2)" }}>
            Dialog with form
          </Heading>
          <Textfield
            label="Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // @ts-expect-error We want the native "autofocus" and Reacts onMount smartness (see https://react.dev/reference/react-dom/components/input#input)
            autofocus="true"
          />
          <div
            style={{
              display: "flex",
              gap: "var(--ds-size-4)",
              marginTop: "var(--ds-size-4)",
            }}
          >
            <Button
              command="close"
              commandfor={id}
              onClick={() =>
                alert(`You submitted the form with the name: ${input}`)
              }
            >
              Submit form
            </Button>
            <Button
              variant="secondary"
              data-color="danger"
              command="close"
              commandfor={id}
            >
              Cancel
            </Button>
          </div>
        </Dialog>
      </>
    );
  },
});

export const WithBlocks = meta.story({
  render: function WithBlocks() {
    const id = useId();

    return (
      <>
        <Button command="show-modal" commandfor={id}>
          Open Dialog with command
        </Button>
        <Dialog id={id}>
          <Dialog.Block>
            <Paragraph data-size="sm">Dialog subtitle</Paragraph>
            <Heading>Dialog with dividers</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sodales eros justo.
            </Paragraph>
          </Dialog.Block>
          <Dialog.Block>
            <Button variant="secondary" command="close" commandfor={id}>
              Close
            </Button>
          </Dialog.Block>
        </Dialog>
      </>
    );
  },
});

export const CloseWithClickOutside = meta.story({
  render: function CloseWithClickOutside() {
    const id = useId();

    return (
      <>
        <Button command="show-modal" commandfor={id}>
          Open Dialog with command
        </Button>
        <Dialog id={id} closedby="any">
          <Heading>Click outside to close</Heading>
        </Dialog>
      </>
    );
  },
});

export const Drawer = meta.story({
  render: function Drawer() {
    const id = useId();
    const [placement, setPlacement] =
      useState<DialogProps["placement"]>("bottom");
    const [modal, setModal] = useState(true);

    return (
      <>
        <Checkbox
          label="Modal"
          checked={modal}
          style={{ marginBottom: "var(--ds-size-4)" }}
          onChange={(e) => setModal(e.target.checked)}
        />
        <Fieldset
          onChange={(e: ChangeEvent<HTMLFieldSetElement>) => {
            const target = e.target as unknown as HTMLInputElement;
            setPlacement(target.value as DialogProps["placement"]);
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--ds-size-5)",
              marginBottom: "var(--ds-size-8)",
            }}
          >
            <Radio name="drawer" label="Center" value="center" />
            <Radio name="drawer" label="Top" value="top" />
            <Radio name="drawer" label="Bottom" value="bottom" />
            <Radio name="drawer" label="Left" value="left" />
            <Radio name="drawer" label="Right" value="right" />
          </div>
        </Fieldset>
        <Button
          command={modal ? "show-modal" : "--show-non-modal"}
          commandfor={id}
        >
          Open Dialog with command
        </Button>
        <Dialog
          id={id}
          closedby="any"
          placement={placement}
          style={{ zIndex: "10" }}
        >
          <Dialog.Block>
            <Paragraph>
              This is a {modal ? "modal" : "non-modal"} Dialog with{" "}
              <code>placement="{placement}"</code>
            </Paragraph>
          </Dialog.Block>
        </Dialog>
      </>
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});
