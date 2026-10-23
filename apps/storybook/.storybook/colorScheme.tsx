import type { Decorator } from "@storybook/react-vite";
import { useSyncExternalStore } from "react";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import type { Globals } from "storybook/internal/types";
import { darkColorSchemeQuery, resolveColorScheme } from "./theme";

/*
 * The `colorScheme` global is applied as `data-color-scheme` on the preview
 * iframe's <html> element, so stories, MDX content and the docs page theme
 * all follow the same toolbar choice.
 */

const root = () => document.documentElement;

export const applyColorScheme = (scheme: unknown) => {
  const value = typeof scheme === "string" ? scheme : "auto";
  if (root().dataset.colorScheme !== value) root().dataset.colorScheme = value;
};

/** Sets the color scheme synchronously so it is in place before the story renders. */
export const colorSchemeDecorator: Decorator = (Story, ctx) => {
  applyColorScheme(ctx.globals.colorScheme);
  return <Story />;
};

const onGlobals = ({ globals }: { globals: Globals }) =>
  applyColorScheme(globals.colorScheme);

/** Keeps the color scheme in sync on docs pages that render no stories. */
export const syncColorSchemeWithGlobals = () => {
  if (typeof document === "undefined") return;
  applyColorScheme("auto");
  void addons.ready().then((channel) => {
    channel.on(SET_GLOBALS, onGlobals);
    channel.on(GLOBALS_UPDATED, onGlobals);
  });
};

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributeFilter: ["data-color-scheme"] });
  const media = window.matchMedia(darkColorSchemeQuery);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
};

export const useResolvedColorScheme = () =>
  useSyncExternalStore(subscribe, () =>
    resolveColorScheme(root().dataset.colorScheme),
  );
