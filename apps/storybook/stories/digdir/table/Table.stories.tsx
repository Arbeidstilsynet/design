// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/table/table.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/table/metadata.json

import {
  Table,
  type TableHeaderCellProps,
} from "@arbeidstilsynet/design-react";
import { useId, useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Table",
  component: Table,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Table.Head": Table.Head,
    "Table.Body": Table.Body,
    "Table.Foot": Table.Foot,
    "Table.Row": Table.Row,
    "Table.HeaderCell": Table.HeaderCell,
    "Table.Cell": Table.Cell,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Table is used to display structured information in a neat and organized manner. Tables can make it easier for users to scan and compare information.",
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
    <Table {...args}>
      <caption>Table caption</caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell 4</Table.Cell>
          <Table.Cell>Cell 5</Table.Cell>
          <Table.Cell>Cell 6</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.HeaderCell>Footer 1</Table.HeaderCell>
          <Table.HeaderCell>Footer 2</Table.HeaderCell>
          <Table.HeaderCell>Footer 3</Table.HeaderCell>
        </Table.Row>
      </Table.Foot>
    </Table>
  ),
});

export const Zebra = meta.story(() => (
  <Table zebra>
    <caption>Number of applications per month</caption>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Month</Table.HeaderCell>
        <Table.HeaderCell>2023</Table.HeaderCell>
        <Table.HeaderCell>2024</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell scope="row">January</Table.HeaderCell>
        <Table.Cell>1 230</Table.Cell>
        <Table.Cell>1 450</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell scope="row">February</Table.HeaderCell>
        <Table.Cell>980</Table.Cell>
        <Table.Cell>1 120</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell scope="row">March</Table.HeaderCell>
        <Table.Cell>1 150</Table.Cell>
        <Table.Cell>1 300</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
));

export const Border = meta.story(() => (
  <Table border>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Header 1</Table.HeaderCell>
        <Table.HeaderCell>Header 2</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
));

export const Hover = meta.story(() => (
  <Table hover>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Header 1</Table.HeaderCell>
        <Table.HeaderCell>Header 2</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell 1</Table.Cell>
        <Table.Cell>Cell 2</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell 3</Table.Cell>
        <Table.Cell>Cell 4</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
));

export const Sortable = meta.story({
  render: function Sortable() {
    const dummyData = [
      {
        id: 1,
        name: "Lise Example",
        email: "lise@example.com",
        phone: "22345678",
      },
      {
        id: 2,
        name: "Kari Example",
        email: "kari@example.com",
        phone: "87654321",
      },
      {
        id: 3,
        name: "Ola Example",
        email: "ola@example.com",
        phone: "32345678",
      },
      {
        id: 4,
        name: "Per Example",
        email: "per@example.com",
        phone: "12345678",
      },
    ];

    const [sortField, setSortField] = useState<
      keyof (typeof dummyData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] =
      useState<TableHeaderCellProps["sort"]>(undefined);

    const handleSort = (field: keyof (typeof dummyData)[0]) => {
      if (sortField === field && sortDirection === "descending") {
        setSortField(null);
        setSortDirection(undefined);
      } else {
        setSortField(field);
        setSortDirection(
          sortField === field && sortDirection === "ascending"
            ? "descending"
            : "ascending",
        );
      }
    };

    const sortedData = [...dummyData].sort((a, b) => {
      if (sortField === null) return 0;
      if (a[sortField] < b[sortField])
        return sortDirection === "ascending" ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === "ascending" ? 1 : -1;
      return 0;
    });

    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              sort={sortField === "name" ? sortDirection : "none"}
              onClick={() => handleSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell
              sort={sortField === "phone" ? sortDirection : "none"}
              onClick={() => handleSort("phone")}
            >
              Phone
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.phone}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
});

export const FixedTable = meta.story(() => {
  const rows = Array.from({ length: 3 }, (_, i) => i + 1);
  return (
    <Table
      style={{
        tableLayout: "fixed",
      }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row}>
            <Table.Cell>{`Cell ${row}1`}</Table.Cell>
            <Table.Cell>{`Cell ${row}2`}</Table.Cell>
            <Table.Cell>{`Cell ${row}3`}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
});

export const Numbers = meta.story(() => (
  <Table
    style={{
      tableLayout: "fixed",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    <caption>Number of applications per month</caption>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell scope="col">Month</Table.HeaderCell>
        <Table.HeaderCell scope="col" style={{ textAlign: "right" }}>
          2023
        </Table.HeaderCell>
        <Table.HeaderCell scope="col" style={{ textAlign: "right" }}>
          2024
        </Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell scope="row">January</Table.HeaderCell>
        <Table.Cell style={{ textAlign: "right" }}>1 230</Table.Cell>
        <Table.Cell style={{ textAlign: "right" }}>1 450</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell scope="row">February</Table.HeaderCell>
        <Table.Cell style={{ textAlign: "right" }}>980</Table.Cell>
        <Table.Cell style={{ textAlign: "right" }}>1 120</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell scope="row">March</Table.HeaderCell>
        <Table.Cell style={{ textAlign: "right" }}>1 150</Table.Cell>
        <Table.Cell style={{ textAlign: "right" }}>1 300</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
));

export const HTMLClickableRows = meta.story({
  render: function HTMLClickableRows() {
    const id = useId();

    return (
      <table className="ds-table">
        <caption>Click anywhere on a row to navigate</caption>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr data-clickdelegatefor={id}>
            <td>
              <a
                className="ds-link"
                id={id}
                href="https://designsystemet.no"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to website
              </a>
            </td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
        </tbody>
      </table>
    );
  },
});

export const Scrollable = meta.story(() => (
  <div style={{ overflowX: "auto" }}>
    <table className="ds-table">
      <thead>
        <tr style={{ whiteSpace: "nowrap" }}>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
          <th>Header 4</th>
          <th>Header 5</th>
          <th>Header 6</th>
          <th>Header 7</th>
          <th>Header 8</th>
          <th>Header 9</th>
          <th>Header 10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
          <td>Cell 4</td>
          <td>Cell 5</td>
          <td>Cell 6</td>
          <td>Cell 7</td>
          <td>Cell 8</td>
          <td>Cell 9</td>
          <td>Cell 10</td>
        </tr>
      </tbody>
    </table>
  </div>
));
