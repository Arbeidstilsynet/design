// Make sure all React components have a displayName for better debugging in Storybook

import * as akselIcons from "@navikt/aksel-icons";
// Read from the package source, not `@arbeidstilsynet/design-react`: that is
// aliased to the docgen wrappers, which hide the real forwardRef instances.
import * as designsystemet from "../../../packages/react/src";
// The docgen-wrapper barrel: digdir compounds are wrapper functions here, and
// `export *` re-exports our custom components, so walking it covers every
// compound sub a story can render.
import * as wrappers from "../docgen-wrappers";

const addDisplaynames = (pkg: Record<string, unknown>): void => {
  Object.keys(pkg).forEach((key) => {
    const value = pkg[key];
    if (
      value !== null &&
      typeof value === "object" &&
      "render" in value &&
      typeof (value as { render?: unknown }).render === "function"
    ) {
      (value as { displayName?: string }).displayName ??= key;
    }
  });
};

const isComponentLike = (value: unknown): value is { displayName?: string } => {
  if (typeof value === "function") return true;
  if (value !== null && typeof value === "object") {
    const obj = value as { render?: unknown; $$typeof?: unknown };
    return typeof obj.render === "function" || obj.$$typeof !== undefined;
  }
  return false;
};

// Give compound sub-components a dotted displayName (e.g. `Table.Head`,
// `FilePicker.Files`). Storybook's "Show code" reads the runtime `displayName`
// first, so this makes compound components render with the dot separator.
const addCompoundDisplaynames = (pkg: Record<string, unknown>): void => {
  Object.keys(pkg).forEach((key) => {
    const parent = pkg[key];
    if (
      parent === null ||
      (typeof parent !== "object" && typeof parent !== "function")
    ) {
      return;
    }
    Object.keys(parent).forEach((subKey) => {
      if (!/^[A-Z]/.test(subKey)) return;
      const sub = (parent as Record<string, unknown>)[subKey];
      if (isComponentLike(sub)) {
        sub.displayName ??= `${key}.${subKey}`;
      }
    });
  });
};

addDisplaynames(designsystemet);
addDisplaynames(akselIcons);
addCompoundDisplaynames(wrappers);
