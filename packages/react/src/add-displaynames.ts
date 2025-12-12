// Hack to make sure all components are displayed correctly in code snippets in Storybook Docs
import * as designsystemet from "@digdir/designsystemet-react";
import * as akselIcons from "@navikt/aksel-icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addDisplaynames = (pkg: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.keys(pkg).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!!pkg[key] && typeof pkg[key] === "object" && "render" in pkg[key]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      pkg[key].displayName = key;
    }
  });
};

addDisplaynames(designsystemet);
addDisplaynames(akselIcons);
