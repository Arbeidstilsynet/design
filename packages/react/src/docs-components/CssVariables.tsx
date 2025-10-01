// based on upstream component
// https://github.com/digdir/designsystemet/blob/7d233fbf6841ff1839607ec93984d5aec049a5b5/apps/storybook/docs-components/CssVariables/CssVariables.tsx

import cl from "clsx/lite";
import { Heading, Table } from "..";

type CssVariablesProps = {
  css: string;
} & React.HTMLAttributes<HTMLTableElement>;

export function CssVariables({ css, className, ...rest }: CssVariablesProps) {
  const cssVariables = getCssVariables(css);

  return (
    <>
      <Heading data-size="sm" className="sb-unstyled">
        CSS-variables
      </Heading>
      <Table
        zebra
        className={cl("sb-unstyled", className)}
        style={{
          tableLayout: "fixed",
        }}
        {...rest}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(cssVariables).map(([name, value]) => (
            <Table.Row key={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

/* get variables and its value from css file */
function getCssVariables(css: string) {
  const res: { [key: string]: string } = {};

  // temporarily remove inline strings, as they may contain ; and } characters
  // and thus ruin the matching for property declarations
  const stringsRemovedFromCss = Array.from(css.matchAll(/"[^"]*"/g)).map(
    (x) => x[0],
  );
  const cssWithRemovedStrings = stringsRemovedFromCss.reduce(
    (prev, curr, idx) => prev.replace(curr, `<placeholder-${idx}>`),
    css,
  );
  // get all --at-* property declarations
  const cssVars = Array.from(
    cssWithRemovedStrings.matchAll(/(?<!var\()(--at-[^;}]+)[;}]/g),
  ).map((matches) => matches[1]);

  /* Iterate over the CSS properties */
  for (const declaration of cssVars) {
    if (!declaration) continue;
    const [name, value] = declaration.split(":");
    if (!name || !value) continue;
    // Choose the earliest declaration of the property.
    // We assume later declarations are part of a sub-selector.
    if (!res[name]) {
      // Return the original inline string from the value, if it was removed earlier
      const valueWithOriginalString = value.replace(
        /<placeholder-(\d+)>/,
        (_, p1: string) => stringsRemovedFromCss[parseInt(p1, 10)]!,
      );
      res[name] = valueWithOriginalString;
    }
  }

  return res;
}
