// Make sure all React components have a displayName for better debugging in Storybook

import * as akselIcons from "@navikt/aksel-icons";
// Read from the package source, not `@arbeidstilsynet/design-react`: that is
// aliased to the docgen wrappers, which hide the real forwardRef instances.
import * as designsystemet from "../../../packages/react/src";

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

addDisplaynames(designsystemet);
addDisplaynames(akselIcons);
