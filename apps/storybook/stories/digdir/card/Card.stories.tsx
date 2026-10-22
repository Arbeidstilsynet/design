// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/card/card.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/card/metadata.json

import {
  Card,
  type CardProps,
  Heading,
  Link,
  Paragraph,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

// Gnist: these designsystemet.no assets have no local copy, so they load from
// their site.
const site = "https://designsystemet.no";

const meta = preview.meta({
  title: "designsystemet.no/Card",
  component: Card,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Card.Block": Card.Block,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Card highlight information or tasks that are related. The component comes in two variants and can contain text, images, text fields, buttons, and links.",
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
    style: { maxWidth: "320px" },
    "data-color": "neutral",
    children: (
      <>
        <Heading>Lykkeland Primary School</Heading>
        <Paragraph>
          Lykkeland Primary School is a safe and inclusive local school where
          play, learning and curiosity go hand in hand.
        </Paragraph>
        <Paragraph data-size="sm">Solslett Municipality</Paragraph>
      </>
    ),
  },
});

export const Variants = meta.story(() => {
  const colorVariants = ["accent"];
  const variants = ["default", "tinted"];

  return (
    <>
      {variants.map((variant) =>
        colorVariants.map((color) => (
          <Card
            key={`${variant}-${color}`}
            data-variant={variant as "default" | "tinted"}
            data-color={color as CardProps["data-color"]}
          >
            <Card.Block>
              <Paragraph>{variant}</Paragraph>
            </Card.Block>
          </Card>
        )),
      )}
    </>
  );
});

export const Media = meta.story(() => (
  <Card data-color="neutral" style={{ maxWidth: "380px" }}>
    <Card.Block>
      <video
        // Gnist: the video loads from designsystemet.no; keep it out of
        // snapshot diffs.
        data-chromatic="ignore"
        controls
        preload="metadata"
        width="100%"
      >
        <source
          src={`${site}/videos/designsystemet/designsystemet-info.mp4`}
          type="video/mp4"
        />
        <track
          label="Norwegian"
          kind="subtitles"
          srcLang="nb"
          src={`${site}/videos/designsystemet/designsystemet-info-no.vtt`}
          default
        />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={`${site}/videos/designsystemet/designsystemet-info-en.vtt`}
        />
        Your browser does not support the video tag.
      </video>
    </Card.Block>
    <Card.Block>
      <Heading>About Designsystemet</Heading>
      <Paragraph>
        The video above provides a brief introduction to what Designsystemet is
        and how it can be used in the development of digital services.
      </Paragraph>
    </Card.Block>
  </Card>
));

export const WithLink = meta.story(() => (
  <Card data-color="neutral">
    <Card.Block>
      <Heading>
        <Link
          href="https://designsystemet.no"
          target="_blank"
          rel="noopener noreferrer"
        >
          Myrkheim Museum
        </Link>
      </Heading>
      <Paragraph>
        The Myrkheim Museum lies in the valley between the old mountain peaks
        and displays exhibitions from the time when the first travelling
        companies crossed the land. Here you can explore ancient maps, tools
        from the great wanderings, and tales preserved by the wardens of the
        forests.
      </Paragraph>
      <Paragraph data-size="sm">
        Myrkheim Council for Cultural Heritage
      </Paragraph>
    </Card.Block>
  </Card>
));

export const AsLink = meta.story(() => (
  <Card data-color="neutral" asChild>
    <a href="https://designsystemet.no" rel="noopener noreferrer">
      <Heading>Card as link</Heading>
      <Paragraph>
        Most provide as with carried business are much better more the perfected
        designer.
      </Paragraph>
    </a>
  </Card>
));

export const AsButton = meta.story(() => (
  <Card asChild data-color="neutral">
    <button type="button">
      <Card.Block>
        <Heading>Settings and privacy</Heading>
      </Card.Block>
      <Card.Block>
        <Paragraph>
          This opens a dialogue where you can update your privacy choices,
          adjust settings, and customise how the service handles your
          information. You can review your changes before saving.
        </Paragraph>
      </Card.Block>
    </button>
  </Card>
));

export const AsGrid = meta.story(() => (
  <Card
    data-color="neutral"
    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
  >
    <Card.Block>
      <Heading>Wanderer’s Fever</Heading>
    </Card.Block>
    <Card.Block>
      <Paragraph>
        Symptoms can include restlessness, heightened alertness, and a tendency
        to look over one’s shoulder. The condition usually eases after a good
        meal and a safe place to rest.
      </Paragraph>
    </Card.Block>
  </Card>
));

export const AsGridImage = meta.story(() => (
  <Card
    data-color="neutral"
    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
  >
    <Card.Block style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={`${site}/img/blog/why-we-need-a-common-design-system/miro.webp`}
        alt="Screenshot of a Miro board with 200 participants and numerous notes"
      />
    </Card.Block>

    <Card.Block>
      <Heading>
        <Link
          href="https://designsystemet.no/en/blog/why-we-need-a-common-design-system"
          target="_blank"
          rel="noopener noreferrer"
        >
          Why we need a common design system
        </Link>
      </Heading>
      <Paragraph>
        In autumn 2023, we hosted an open presentation and mini-workshop on a
        shared design system. More than 200 people took part, and we received
        440 pieces of feedback on benefits and challenges.
      </Paragraph>
    </Card.Block>
  </Card>
));
