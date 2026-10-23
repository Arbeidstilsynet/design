// The manager bundle uses the classic JSX runtime.
// oxlint-disable-next-line no-unused-vars
import React from "react";
import { Select } from "storybook/internal/components";
import { useStorybookApi } from "storybook/manager-api";
import {
  type ColorScheme,
  colorSchemeStorageKey,
  getTheme,
  readStoredColorScheme,
} from "./theme";

const options = [
  { value: "light", title: "Light" },
  { value: "dark", title: "Dark" },
  { value: "auto", title: "Auto" },
] satisfies { value: ColorScheme; title: string }[];

const ContrastIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" />
    <path d="M7 1a6 6 0 0 1 0 12z" fill="currentColor" />
  </svg>
);

/**
 * Stores the choice in localStorage. The preview iframe picks it up through
 * the `storage` event (see colorScheme.tsx).
 */
export function ColorSchemeSelect() {
  const api = useStorybookApi();
  return (
    <Select
      ariaLabel="Color scheme for Storybook and stories"
      icon={<ContrastIcon />}
      size="small"
      padding="small"
      options={options}
      defaultOptions={readStoredColorScheme()}
      onSelect={(value) => {
        window.localStorage.setItem(colorSchemeStorageKey, String(value));
        api.setOptions({ theme: getTheme(value) });
      }}
    />
  );
}
