// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/checkbox/checkbox.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/checkbox/metadata.json

import {
  Checkbox,
  Fieldset,
  Table,
  useCheckboxGroup,
  ValidationMessage,
} from "@arbeidstilsynet/design-react";
import { useEffect, useId, useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Checkbox",
  component: Checkbox,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Checkbox allows users to select one or more options. It can also be used in situations where the user needs to confirm something.",
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
    label: "Checkbox label",
    description: "Description",
    value: "value",
  },
});

export const OneOption = meta.story(() => (
  <Fieldset>
    <Fieldset.Legend>Confirm that you are over 18</Fieldset.Legend>
    <Fieldset.Description>
      To send you the information you have asked for, we need you to confirm
      that you are of legal age.
    </Fieldset.Description>
    <Checkbox label="I confirm that I am over 18" value="consent" />
  </Fieldset>
));

export const Group = meta.story({
  render: function Group() {
    const { getCheckboxProps } = useCheckboxGroup({
      value: ["email"],
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Fieldset.Description>
          Select all the options that are relevant to you.
        </Fieldset.Description>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
      </Fieldset>
    );
  },
});

export const WithError = meta.story({
  render: function WithError() {
    const [error, setError] = useState("");
    const { getCheckboxProps, validationMessageProps, value } =
      useCheckboxGroup({
        value: ["email"],
        error,
      });

    useEffect(() => {
      if (value.length < 2) {
        setError("You must select at least two options");
      } else {
        setError("");
      }
    }, [value]);

    return (
      <Fieldset>
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Fieldset.Description>
          Select all the options that are relevant to you.
        </Fieldset.Description>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});

export const Disabled = meta.story({
  render: function Disabled() {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ["email"],
      disabled: true,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Fieldset.Description>
          Select all the options that are relevant to you.
        </Fieldset.Description>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});

export const ReadOnlyGroup = meta.story({
  render: function ReadOnlyGroup() {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ["email"],
      readOnly: true,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          How would you prefer us to contact you?
        </Fieldset.Legend>
        <Fieldset.Description>
          Select all the options that are relevant to you.
        </Fieldset.Description>
        <Checkbox label="E-mail" {...getCheckboxProps("email")} />
        <Checkbox label="Phone" {...getCheckboxProps("phone")} />
        <Checkbox label="Text message" {...getCheckboxProps("text")} />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});

export const InTable = meta.story({
  render: function InTable() {
    const id = useId();
    const tableData = [
      {
        id: 1,
        navn: "Lise Nordmann",
        epost: "lise@nordmann.no",
        telefon: "68051156",
      },
      {
        id: 2,
        navn: "Kari Nordmann",
        epost: "kari@nordmann.no",
        telefon: "68059679",
      },
      {
        id: 3,
        navn: "Ola Nordmann",
        epost: "ola@nordmann.no",
        telefon: "68055731",
      },
      {
        id: 4,
        navn: "Per Nordmann",
        epost: "per@nordmann.no",
        telefon: "68059631",
      },
    ];

    const { getCheckboxProps } = useCheckboxGroup({
      name: "checkbox-table",
      value: ["2", "3"],
    });

    return (
      <Table>
        <colgroup>
          {/* ensure the first column only takes up the necessary space */}
          <col style={{ width: "1px" }} />
          <col />
          <col />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                aria-label="Select all"
                {...getCheckboxProps({
                  allowIndeterminate: true,
                  value: "all",
                })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tableData.map((person) => (
            <Table.Row key={person.id}>
              <Table.Cell>
                <Checkbox
                  aria-labelledby={`${id}-checkbox-${person.id}-name`}
                  {...getCheckboxProps(person.id.toString())}
                />
              </Table.Cell>
              <Table.Cell id={`${id}-checkbox-${person.id}-name`}>
                {person.navn}
              </Table.Cell>
              <Table.Cell>{person.epost}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
});

export const Outline = meta.story({
  render: function Outline() {
    const { getCheckboxProps } = useCheckboxGroup({
      value: ["operations"],
      variant: "outline",
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          Which notifications do you want to receive?
        </Fieldset.Legend>
        <Fieldset.Description>
          Choose the notification types that are relevant to you.
        </Fieldset.Description>
        <Checkbox
          label="Service updates"
          description="Alerts about planned maintenance and service disruptions."
          {...getCheckboxProps("operations")}
        />
        <Checkbox
          label="Reminders"
          description="Alerts about deadlines and tasks that need your attention."
          {...getCheckboxProps("reminders")}
        />
      </Fieldset>
    );
  },
});

export const ReadOnly = meta.story(() => (
  <Checkbox
    label="Checkbox label"
    description="Description"
    value="value"
    readOnly
  />
));
