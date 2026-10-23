// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/alert/alert.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/alert/metadata.json

import {
  Alert,
  Button,
  Heading,
  Link,
  Paragraph,
} from "@arbeidstilsynet/design-react";
import {
  ArrowsCirclepathIcon,
  ExclamationmarkTriangleIcon,
} from "@navikt/aksel-icons";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Alert",
  component: Alert,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Alert provides users with information that is especially important for them to see and understand. The component is designed to capture users' attention. The text in the alert should be short and clear.",
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
    role: "alert",
    children: "A message that is important for the user to see",
  },
});

export const VariantInfo = meta.story(() => (
  <Alert role="status" data-color="info">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      Have you remembered to book a passport appointment?
    </Heading>
    <Paragraph>
      There are long queues for booking a passport these days, so it may be wise
      to book well in advance of your trip.
    </Paragraph>
  </Alert>
));

export const VariantSuccess = meta.story(() => (
  <Alert role="status" data-color="success">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      Congratulations! You can now start your company
    </Heading>
    <Paragraph>
      It looks like the numbers add up, and that you have what it takes to start
      your company.
    </Paragraph>
  </Alert>
));

export const VariantWarning = meta.story(() => (
  <Alert role="status" data-color="warning">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      We are experiencing technical issues
    </Heading>
    <Paragraph>
      This means you may be interrupted while filling in the form. We are
      working to fix the issues.
    </Paragraph>
  </Alert>
));

export const VariantDanger = meta.story(() => (
  <Alert role="alert" data-color="danger">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      An error has occurred
    </Heading>
    <Paragraph>
      We are unable to retrieve the information you are looking for right now.
      Please try again later. If we still cannot show the information you need,
      please contact customer service on telephone 85 44 32 66.
    </Paragraph>
  </Alert>
));

export const Closable = meta.story({
  render: function Closable() {
    const [isVisible, setIsVisible] = useState(true);

    return (
      <>
        {isVisible && (
          <Alert role="alert" data-color="danger">
            <Paragraph>
              Could not save the document due to an unstable internet
              connection.
            </Paragraph>
            <div
              style={{
                display: "flex",
                gap: "var(--ds-size-3)",
                marginTop: "var(--ds-size-3)",
              }}
            >
              <Button
                data-variant="primary"
                onClick={() => setIsVisible(false)}
              >
                <ArrowsCirclepathIcon /> Try again
              </Button>
              <Button
                data-variant="tertiary"
                onClick={() => setIsVisible(false)}
              >
                <ExclamationmarkTriangleIcon /> Report error
              </Button>
            </div>
          </Alert>
        )}
      </>
    );
  },
});

export const WithHeading = meta.story(() => (
  <Alert role="status">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      Have you remembered to book a passport appointment?
    </Heading>
    <Paragraph>
      There are long queues for booking a passport these days, so it may be wise
      to book well in advance if you need a passport for the summer.
    </Paragraph>
  </Alert>
));

export const WithOnlyHeading = meta.story(() => (
  <Alert role="status" data-color="warning">
    <Paragraph>You have 7 days left to complete the application.</Paragraph>
  </Alert>
));

export const WithLink = meta.story(() => (
  <Alert role="status" data-color="warning">
    <Heading
      level={2}
      data-size="xs"
      style={{
        marginBottom: "var(--ds-size-2)",
      }}
    >
      The application deadline is in 3 days
    </Heading>
    <Paragraph>
      The deadline for applying for admission to education is 15 April.{" "}
      <Link href="#">Apply now</Link>
    </Paragraph>
  </Alert>
));

export const CorrectLiveRegionReact = meta.story({
  render: function CorrectLiveRegionReact() {
    const [showAlert, setShowAlert] = useState(false);
    return (
      <>
        <Button
          data-size="sm"
          variant="secondary"
          onClick={() => setShowAlert((value) => !value)}
        >
          {showAlert ? "Hide alert" : "Action that triggers an alert"}
        </Button>
        {/* Correct use: role="alert" is placed on the element where the alert appears */}
        <div role="alert">
          {showAlert && (
            <Alert role="status" data-color="warning">
              <Heading
                level={2}
                data-size="xs"
                style={{
                  marginBottom: "var(--ds-size-2)",
                }}
              >
                We are unable to save the form
              </Heading>
              <Paragraph>
                We have lost the connection to the server and cannot save the
                form. Please wait a moment and try again.
              </Paragraph>
            </Alert>
          )}
        </div>
      </>
    );
  },
});
