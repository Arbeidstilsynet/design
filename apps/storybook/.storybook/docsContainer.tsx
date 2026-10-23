import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import type { PropsWithChildren } from "react";
import { useResolvedColorScheme } from "./colorScheme";
import { darkTheme, lightTheme } from "./theme";

export const ThemedDocsContainer = (
  props: PropsWithChildren<DocsContainerProps>,
) => {
  const scheme = useResolvedColorScheme();
  return (
    <DocsContainer
      {...props}
      theme={scheme === "dark" ? darkTheme : lightTheme}
    />
  );
};
