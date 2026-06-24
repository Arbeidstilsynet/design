// based on upstream component
// https://github.com/digdir/designsystemet/blob/7d233fbf6841ff1839607ec93984d5aec049a5b5/apps/storybook/docs-components/CssVariables/CssVariables.tsx

import cl from "clsx/lite";
import { toast, ToastContainer } from "react-toastify";
import { Alert, Heading, Table, Tooltip } from "..";
// @ts-ignore - Exception for CSS modules - Ordinary, exported CSS files are defined in the CSS repo.
import classes from "./CssVariables.module.css";

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
              <Table.Cell>
                <CssVariableValue value={value} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ToastContainer position="bottom-center" autoClose={1500} pauseOnHover />
    </>
  );
}

/**
 * Extracts SVG data from CSS value if present.
 *
 * Matches:
 * - double quoted URLs: url("data:image/svg+xml,...")
 * - single quoted URLs: url('data:image/svg+xml,...')
 * - unquoted URLs: url(data:image/svg+xml,...)
 */
const getSvgDataURL = (value: string): string | null => {
  const match = value.match(
    /url\(\s*(?:"(data:image\/svg\+xml[^"]*)"|'(data:image\/svg\+xml[^']*)'|(data:image\/svg\+xml[^)]*))\s*\)/i,
  );
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? null;
};

/**
 * Copies value to clipboard and shows a toast notification.
 */
const copyToClipboard = async (value: string) => {
  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard API not available");
    }

    await navigator.clipboard.writeText(value);

    toast(
      <Alert data-size="sm" data-color="success" style={{ width: "100%" }}>
        Copied to clipboard.
      </Alert>,
      {
        autoClose: 1500,
        className: classes.toast,
        icon: false,
        type: "success",
      },
    );
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);

    toast(
      <Alert data-size="sm" data-color="danger" style={{ width: "100%" }}>
        Failed to copy to clipboard.
      </Alert>,
      { autoClose: 1500, className: classes.toast, icon: false, type: "error" },
    );
  }
};

/**
 * Parses CSS variable value and renders it.
 *
 * SVG data URLs are rendered as interactable icons.
 * Other values are rendered as plain text.
 */
function CssVariableValue({ value }: { value: string }) {
  const svgDataURL = getSvgDataURL(value);
  if (svgDataURL) {
    const trimmedValue = value.trim();
    return (
      <Tooltip content={trimmedValue}>
        <button
          type="button"
          onClick={() => void copyToClipboard(trimmedValue)}
          aria-label="Copy SVG value to clipboard"
          className={classes.svgButton}
        >
          <img src={svgDataURL} alt="" className={classes.svgImage} />
        </button>
      </Tooltip>
    );
  }

  return value;
}

/* get variables and its value from css file */
function getCssVariables(css: string) {
  const res: Record<string, string> = {};

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
        (_, p1: string) => stringsRemovedFromCss[Number.parseInt(p1, 10)]!,
      );
      res[name] = valueWithOriginalString;
    }
  }

  return res;
}
