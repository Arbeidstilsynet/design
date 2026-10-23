// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/textfield/textfield.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/textfield/metadata.json

import {
  Field,
  Label,
  Select,
  Tag,
  Textfield,
  type TextfieldProps,
} from "@arbeidstilsynet/design-react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Textfield",
  component: Textfield,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle: "Textfield allows users to enter free text or numbers. ",
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
    label: "Label",
    description: "Description",
  },
  parameters: {
    customStyles: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
});

export const WithRows = meta.story(() => (
  <Textfield label="Label" multiline rows={4} />
));

export const WithAffix = meta.story(() => (
  <Textfield
    prefix="GBP"
    suffix="per month"
    label="How much does it cost per month?"
  />
));

export const WithCounter = meta.story(() => (
  <Textfield counter={10} label="How many pounds does it cost per month?" />
));

export const Required = meta.story(() => (
  <Textfield
    label={
      <>
        Where do you live?
        <Tag
          data-color="warning"
          style={{ marginInlineStart: "var(--ds-size-2)" }}
        >
          Required
        </Tag>
      </>
    }
    required
  />
));

export const InputType = meta.story({
  render: function InputType() {
    const [type, setType] = useState<TextfieldProps["type"]>("text");

    return (
      <div
        style={{
          display: "flex",
          gap: "var(--ds-size-4)",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <Field>
          <Label>Choose type</Label>
          <Select
            defaultValue="text"
            lang="en"
            onChange={(e) => setType(e.target.value as TextfieldProps["type"])}
          >
            <Select.Option value="text">text</Select.Option>
            <Select.Option value="color">color</Select.Option>
            <Select.Option value="date">date</Select.Option>
            <Select.Option value="datetime-local">datetime-local</Select.Option>
            <Select.Option value="email">email</Select.Option>
            <Select.Option value="file">file</Select.Option>
            <Select.Option value="month">month</Select.Option>
            <Select.Option value="hidden">hidden</Select.Option>
            <Select.Option value="number">number</Select.Option>
            <Select.Option value="password">password</Select.Option>
            <Select.Option value="search">search</Select.Option>
            <Select.Option value="tel">tel</Select.Option>
            <Select.Option value="time">time</Select.Option>
            <Select.Option value="url">url</Select.Option>
            <Select.Option value="week">week</Select.Option>
          </Select>
        </Field>
        <ArrowRightIcon aria-hidden width="3rem" height="3rem" />
        <Textfield label={`type="${type}"`} type={type} />
      </div>
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});
