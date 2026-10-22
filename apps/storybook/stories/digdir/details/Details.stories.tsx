// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/details/details.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/details/metadata.json

import {
  Button,
  Card,
  Details,
  Link,
  Paragraph,
} from "@arbeidstilsynet/design-react";
import { ChevronDownUpIcon, ChevronUpDownIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Details",
  component: Details,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Details.Summary": Details.Summary,
    "Details.Content": Details.Content,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Details is a collapsible component that allows the user to show or hide content.",
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
    <Details {...args}>
      <Details.Summary>
        Who can register in the Volunteer Register?
      </Details.Summary>
      <Details.Content>
        To be registered in the Volunteer Register, the organization must
        conduct voluntary activities. Only associations, foundations, and
        limited companies can be registered. The business cannot distribute
        funds to individuals. The business must have a board.
      </Details.Content>
    </Details>
  ),
  // Gnist: open the details, so the story ends in its expanded state.
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByText("Who can register in the Volunteer Register?"),
    );
    await waitFor(() =>
      expect(canvas.getByText(/To be registered/)).toBeVisible(),
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const InCardWithColor = meta.story({
  render: () => (
    <>
      <Card
        // Gnist: Gnist has no brand3 colour; upstream uses data-color="brand3".
        data-color="accent"
        data-variant="tinted"
      >
        <Details>
          <Details.Summary>
            How do I get assigned a hunter number?
          </Details.Summary>
          <Details.Content>
            You will automatically be assigned a hunter number and registered in
            the Hunter Register when you have passed the hunter's exam.
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            I have forgotten my hunter number. Where can I find it?
          </Details.Summary>
          <Details.Content>
            <Paragraph>
              You can find this by logging in to{" "}
              <Link href="https://minjegerside.brreg.no/">My Page</Link>
            </Paragraph>
          </Details.Content>
        </Details>
      </Card>
      <br />
      <Card
        // Gnist: Gnist has no brand1 colour; upstream uses data-color="brand1".
        data-color="neutral"
      >
        <Details>
          <Details.Summary>Attachments</Details.Summary>
          <Details.Content>
            Attachment 1, attachment 2, attachment 3
          </Details.Content>
        </Details>
      </Card>
    </>
  ),
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});

export const Controlled = meta.story({
  render: function Controlled() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const isOpen = [open1, open2].every(Boolean);
    const toggleOpen = () => {
      setOpen1(!isOpen);
      setOpen2(!isOpen);
    };

    return (
      <>
        <Button variant="tertiary" onClick={toggleOpen} data-size="sm">
          {isOpen ? (
            <>
              <ChevronDownUpIcon aria-hidden />
              Close both
            </>
          ) : (
            <>
              <ChevronUpDownIcon aria-hidden />
              Open both
            </>
          )}
        </Button>
        <br />

        <Details open={open1} onToggle={() => setOpen1(!open1)}>
          <Details.Summary>Sole proprietorship</Details.Summary>
          <Details.Content>
            Are you starting out on your own? A sole proprietorship is often the
            simplest way to establish a business. This form of organisation has
            both advantages and disadvantages. It gives you a great deal of
            freedom, but can also involve significant risk because you are
            personally responsible for the finances.
          </Details.Content>
        </Details>
        <Details open={open2} onToggle={() => setOpen2(!open2)}>
          <Details.Summary>Limited company (AS)</Details.Summary>
          <Details.Content>
            Are you planning to start a business alone or together with others?
            Does the business involve a financial risk? Do you want rights as an
            employee and the possibility for others to invest in your company?
            Then a limited company may be a suitable form of organisation.
          </Details.Content>
        </Details>
      </>
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});
