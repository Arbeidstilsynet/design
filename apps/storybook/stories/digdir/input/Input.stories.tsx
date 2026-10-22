// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/input/input.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/input/metadata.json

import {
  Divider,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
  type TextfieldProps,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Input",
  component: Input,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Input is a form element used to collect user data. It offers basic functionality and is ideal when you need full control over the component's layout and validation, making it suitable for building custom elements.",
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
    "aria-label": "input",
  },
});

export const WithLabel = meta.story(() => (
  <Field>
    <Label>Social Security Number</Label>
    <Input />
  </Field>
));

export const WithError = meta.story(() => (
  <Field>
    <Label>Social Security Number</Label>
    <Input />
    <ValidationMessage>
      Please enter your social security number
    </ValidationMessage>
  </Field>
));

export const Disabled = meta.story(() => (
  <Field>
    <Label>Social Security Number</Label>
    <Input disabled value="12345678901" />
  </Field>
));

export const ReadOnly = meta.story(() => (
  <Field>
    <Label>Social Security Number</Label>
    <Input readOnly value="12345678901" />
  </Field>
));

export const ReadOnlyCheckAndRadio = meta.story(() => (
  <>
    <Fieldset>
      <Fieldset.Legend>Gender</Fieldset.Legend>
      <Field>
        <Input
          readOnly
          value="male"
          name="gender"
          type="radio"
          defaultChecked
        />
        <Label>Male</Label>
      </Field>
      <Field>
        <Input readOnly value="female" name="gender" type="radio" />
        <Label>Female</Label>
      </Field>
      <Field>
        <Input readOnly value="other" name="gender" type="radio" />
        <Label>Other</Label>
      </Field>
    </Fieldset>
    <Divider />
    <Field>
      <Input readOnly type="checkbox" defaultChecked name="checkbox" />
      <Label>I consent</Label>
    </Field>
  </>
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
        <Field>
          <Label>{`type="${type}"`}</Label>
          <Input type={type} />
        </Field>
      </div>
    );
  },
  parameters: {
    customStyles: {
      display: "block",
    },
  },
});
