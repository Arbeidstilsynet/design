// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/error-summary/error-summary.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/error-summary/metadata.json

import { Button, ErrorSummary, Textfield } from "@arbeidstilsynet/design-react";
import { useState } from "react";
import { expect } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/ErrorSummary",
  component: ErrorSummary,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "ErrorSummary.Heading": ErrorSummary.Heading,
    "ErrorSummary.List": ErrorSummary.List,
    "ErrorSummary.Item": ErrorSummary.Item,
    "ErrorSummary.Link": ErrorSummary.Link,
  },
  tags: ["!autodocs"],
  // Gnist: stands in for the www `startAsInert` option. The error summary
  // focuses itself when it appears, so on docs pages it starts inert for
  // 500 ms to keep the page from scrolling to it on load.
  decorators: [
    (Story, { viewMode }) =>
      viewMode === "docs" ? (
        <div
          inert
          style={{ display: "contents" }}
          ref={(el) => {
            if (el) setTimeout(() => el.removeAttribute("inert"), 500);
          }}
        >
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
  parameters: {
    docs: {
      subtitle:
        "Error summary is a summary of errors. It provides the user with an overview of errors or issues that need to be addressed on a page or step in order to proceed.",
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
  render: (args) => (
    <ErrorSummary {...args}>
      <ErrorSummary.Heading>
        To proceed, you must correct the following errors:
      </ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">
            Birthdate cannot be after the year 2005
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">
            Phone number can only contain digits
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">Email must be valid</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
  ),
});

export const WithForm = meta.story({
  render: () => (
    <>
      <Textfield
        label="First name"
        id="first-name"
        error="First name must be at least 2 characters"
      />

      <Textfield
        label="Phone"
        id="phone"
        type="tel"
        error="Phone number can only contain digits"
      />

      <ErrorSummary>
        <ErrorSummary.Heading>
          To proceed, you must correct the following errors:
        </ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#first-name">
              First name must be at least 2 characters
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#phone">
              Phone number can only contain digits
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    </>
  ),
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});

export const ShowHide = meta.story({
  render: function ShowHide() {
    const [show, setShow] = useState(false);

    return (
      <>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            marginBottom: "var(--ds-size-4)",
          }}
        >
          <Button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Submit form"}
          </Button>
        </div>
        {show && (
          <ErrorSummary>
            <ErrorSummary.Heading>
              To proceed, you must correct the following errors:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              <ErrorSummary.Item>
                <ErrorSummary.Link href="#first-name">
                  First name must be at least 2 characters
                </ErrorSummary.Link>
              </ErrorSummary.Item>
              <ErrorSummary.Item>
                <ErrorSummary.Link href="#phone">
                  Phone number can only contain digits
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            </ErrorSummary.List>
          </ErrorSummary>
        )}
      </>
    );
  },
  // Gnist: show the error summary and check that it takes focus.
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit form" }));
    const errorSummary = canvas.getByRole("group");
    await expect(errorSummary).toBeVisible();
    await expect(errorSummary).toHaveFocus();
  },
  parameters: {
    customStyles: { flexDirection: "column", alignItems: "flex-start" },
  },
});
