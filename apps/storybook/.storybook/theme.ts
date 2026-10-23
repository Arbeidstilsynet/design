import { create, type ThemeVars } from "storybook/theming";

// Literal colors copied from @arbeidstilsynet/design-theme/arbeidstilsynet.css.
// Storybook derives extra shades from these values, which it skips for CSS
// variables, so one theme per color scheme is used instead.

const brand = {
  brandTitle: "Gnist, Arbeidstilsynet Design",
  brandUrl: "https://gnist.arbeidstilsynet.no/",
  brandTarget: "_self",
} satisfies Partial<ThemeVars>;

const typography = {
  fontBase: '"Inter", sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
} satisfies Partial<ThemeVars>;

const shape = {
  appBorderRadius: 4,
  inputBorderRadius: 4,
} satisfies Partial<ThemeVars>;

export const lightTheme = create({
  base: "light",
  ...brand,
  ...typography,
  ...shape,
  brandImage:
    "https://at-static.arbeidstilsynet.no/logos/at-logo-horizontal.svg",

  colorPrimary: "#0B8477", // accent-base-default
  colorSecondary: "#0B8477", // accent-base-default

  appBg: "#F3F3F3", // neutral-background-tinted
  appContentBg: "#FFFFFF", // neutral-background-default
  appPreviewBg: "#FFFFFF", // neutral-background-default
  appHoverBg: "#D6F1EE", // accent-background-tinted
  appBorderColor: "#BCBCBC", // neutral-border-subtle

  textColor: "#080808", // neutral-text-default
  textMutedColor: "#424242", // neutral-text-subtle
  textInverseColor: "#FFFFFF", // neutral-base-contrast-default

  barBg: "#FFFFFF", // neutral-surface-default
  barTextColor: "#424242", // neutral-text-subtle
  barSelectedColor: "#0B8477", // accent-base-default
  barHoverColor: "#085C53", // accent-base-hover

  buttonBg: "#FFFFFF", // neutral-surface-default
  buttonBorder: "#BCBCBC", // neutral-border-subtle
  booleanBg: "#EEEEEE", // neutral-surface-tinted
  booleanSelectedBg: "#FFFFFF", // neutral-surface-default

  inputBg: "#FFFFFF", // neutral-surface-default
  inputBorder: "#797979", // neutral-border-default
  inputTextColor: "#080808", // neutral-text-default
});

export const darkTheme = create({
  base: "dark",
  ...brand,
  ...typography,
  ...shape,
  brandImage:
    "https://at-static.arbeidstilsynet.no/logos/at-logo-horizontal-white.svg",

  colorPrimary: "#3C9D92", // accent-base-default
  colorSecondary: "#3C9D92", // accent-base-default

  appBg: "#1F1F1F", // neutral-background-tinted
  appContentBg: "#181818", // neutral-background-default
  appPreviewBg: "#181818", // neutral-background-default
  appHoverBg: "#1C4D44", // accent-surface-tinted
  appBorderColor: "#505050", // neutral-border-subtle

  textColor: "#ECECEC", // neutral-text-default
  textMutedColor: "#B9BBBB", // neutral-text-subtle
  textInverseColor: "#080808", // neutral-base-contrast-default

  barBg: "#282828", // neutral-surface-default
  barTextColor: "#B9BBBB", // neutral-text-subtle
  barSelectedColor: "#7BCCC3", // accent-text-subtle
  barHoverColor: "#17E5CA", // accent-base-hover

  buttonBg: "#282828", // neutral-surface-default
  buttonBorder: "#505050", // neutral-border-subtle
  booleanBg: "#2E2E2E", // neutral-surface-tinted
  booleanSelectedBg: "#434343", // neutral-surface-active

  inputBg: "#282828", // neutral-surface-default
  inputBorder: "#818181", // neutral-border-default
  inputTextColor: "#ECECEC", // neutral-text-default
});

/** Value of the `colorScheme` global, mirroring Designsystemet's `data-color-scheme`. */
export type ColorScheme = "light" | "dark" | "auto";

export const darkColorSchemeQuery = "(prefers-color-scheme: dark)";

export const resolveColorScheme = (scheme: unknown): "light" | "dark" => {
  if (scheme === "light" || scheme === "dark") return scheme;
  return typeof window !== "undefined" &&
    window.matchMedia(darkColorSchemeQuery).matches
    ? "dark"
    : "light";
};

export const getTheme = (scheme: unknown) =>
  resolveColorScheme(scheme) === "dark" ? darkTheme : lightTheme;
