// Make sure all React components have a displayName for better debugging in Storybook
import * as designsystemet from "@arbeidstilsynet/design-react";
import * as akselIcons from "@navikt/aksel-icons";

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
