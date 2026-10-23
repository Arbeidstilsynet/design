// based on upstream component
// https://github.com/digdir/designsystemet/blob/v1.23.0/apps/www/app/_components/css-attributes/css-attributes.tsx

import cl from "clsx/lite";
import { Paragraph, Table } from "..";

type CssAttributesProps = {
  css: string;
  /** Attribute names (without `data-`) to leave out of the table. */
  exclude?: string[];
} & React.HTMLAttributes<HTMLTableElement>;

export function CssAttributes({
  css,
  exclude = noExclusions,
  className,
  ...rest
}: CssAttributesProps) {
  const attributes = Object.entries(getAttributes(css))
    .filter(([name]) => !exclude.includes(name))
    .toSorted(([a], [b]) => a.localeCompare(b));

  if (attributes.length === 0) {
    return (
      <Paragraph
        className="sb-unstyled"
        style={{ marginBlockEnd: "var(--ds-size-8)" }}
      >
        No relevant data attributes.
      </Paragraph>
    );
  }

  return (
    <Table
      zebra
      className={cl("sb-unstyled", className)}
      style={{ tableLayout: "fixed", marginBlockEnd: "var(--ds-size-8)" }}
      {...rest}
    >
      <caption style={{ marginBottom: "var(--ds-size-4)" }}>
        Data attributes
      </caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {attributes.map(([name, value]) => (
          <Table.Row key={name}>
            <Table.Cell>data-{name}</Table.Cell>
            <Table.Cell>{value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const noExclusions: string[] = [];

// Attributes that are global or set by other components, not this one.
const globalAttributes = new Set([
  "color",
  "size",
  "color-scheme",
  // Floating UI
  "is-floating",
  "floating",
  "floating-ui-portal",
]);

/* returns data-attributes and their possible values as key value pairs */
function getAttributes(css: string) {
  const res: Record<string, Set<string>> = {};

  for (const [, name, , value] of css.matchAll(
    /\[data-([^=\]|$~*^]+)(?:([|$~*^]?=)([^\]]+))?\]/g,
  )) {
    if (!name || globalAttributes.has(name)) continue;
    res[name] ??= new Set();
    if (value) res[name].add(value);
  }

  return Object.fromEntries(
    Object.entries(res).map(([name, values]) => [
      name,
      Array.from(values).join(", "),
    ]),
  );
}
