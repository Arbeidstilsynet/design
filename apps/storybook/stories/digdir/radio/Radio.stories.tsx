// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/radio/radio.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/radio/metadata.json

import {
  Fieldset,
  Radio,
  useRadioGroup,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Radio",
  component: Radio,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "A Radio is an option the user can select. Use multiple radio to show a list of options. Users can switch between the options, but can only select one.",
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
    label: "Radio",
    value: "value",
    name: "name",
  },
});

export const Group = meta.story({
  render: function Group() {
    const { getRadioProps } = useRadioGroup({
      name: "contact",
      value: "email",
    });

    return (
      <Fieldset>
        <Fieldset.Legend>How would you like us to contact you?</Fieldset.Legend>
        <Fieldset.Description>
          Choose the method that works best for you. We use this only to send
          important updates about your case.
        </Fieldset.Description>
        <Radio
          label="Email"
          description="We will use the email address you provided earlier (name@example.com)"
          {...getRadioProps("email")}
        />
        <Radio
          label="SMS"
          description="We will use the phone number you provided earlier (99 99 99 99)"
          {...getRadioProps("sms")}
        />
        <Radio
          label="Letter"
          description="Delivery may take 3-5 working days, depending on the postal service."
          {...getRadioProps("letter")}
        />
      </Fieldset>
    );
  },
});

export const WithError = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Which district do you live in?</Fieldset.Legend>
    <Fieldset.Description>
      Trondheim is divided into four districts
    </Fieldset.Description>
    <Radio label="Østbyen" value="ostbyen" name="city" />
    <Radio label="Lerkendal" value="lerkendal" name="city" />
    <Radio label="Heimdal" value="heimdal" name="city" />
    <Radio label="Midtbyen" value="midtbyen" name="city" />
    <ValidationMessage data-color="danger">
      You must choose a district before you can continue.
    </ValidationMessage>
  </Fieldset>
));

export const Inline = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Contact by email?</Fieldset.Legend>
    <Fieldset.Description>
      Confirm whether you would like to be contacted by email.
    </Fieldset.Description>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--ds-size-6)" }}>
      <Radio name="my-inline" label="Yes" value="yes" />
      <Radio name="my-inline" label="No" value="no" />
    </div>
  </Fieldset>
));

export const Outline = meta.story({
  render: function Outline() {
    const { getRadioProps } = useRadioGroup({
      name: "course-level",
      variant: "outline",
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Which course level fits you best?</Fieldset.Legend>
        <Fieldset.Description>
          Choose the level that best describes your experience with the topic.
        </Fieldset.Description>
        <Radio
          label="Beginner"
          description="Best for you if you are completely new and want a gentle introduction."
          {...getRadioProps("beginner")}
        />
        <Radio
          label="Intermediate"
          description="Best for you if you know the basics and want to go deeper."
          {...getRadioProps("intermediate")}
        />
        <Radio
          label="Expert"
          description="Best for you if you want advanced topics and hands-on cases."
          {...getRadioProps("expert")}
        />
      </Fieldset>
    );
  },
});

export const ReadOnly = meta.story(() => (
  <Radio label="Radio" value="value" name="name" readOnly />
));
