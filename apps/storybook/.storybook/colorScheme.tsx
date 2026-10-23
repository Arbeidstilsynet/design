import type { Decorator } from "@storybook/react-vite";
import { useSyncExternalStore } from "react";
import {
  colorSchemeStorageKey,
  darkColorSchemeQuery,
  readStoredColorScheme,
  resolveColorScheme,
} from "./theme";

/*
 * The color scheme is applied as `data-color-scheme` on the preview iframe's
 * <html> element, so stories, MDX content and the docs theme follow it.
 */

const root = () => document.documentElement;

const applyColorScheme = (scheme: string) => {
  if (root().dataset.colorScheme !== scheme)
    root().dataset.colorScheme = scheme;
};

/** Applies the toolbar choice and follows changes made in the manager. */
export const syncStoredColorScheme = () => {
  applyColorScheme(readStoredColorScheme());
  window.addEventListener("storage", (event) => {
    if (event.key === colorSchemeStorageKey) {
      applyColorScheme(readStoredColorScheme());
    }
  });
};

/**
 * Chromatic modes and the vitest projects set the `colorScheme` global, which
 * takes precedence over the toolbar choice.
 */
export const colorSchemeDecorator: Decorator = (Story, { globals }) => {
  applyColorScheme(
    typeof globals.colorScheme === "string"
      ? globals.colorScheme
      : readStoredColorScheme(),
  );
  return <Story />;
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
