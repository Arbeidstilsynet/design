import { create, type ThemeVars } from "storybook/theming";

/*
 * Colors are read from @arbeidstilsynet/design-theme tokens at runtime.
 * Storybook derives extra shades from theme colors, which it skips for CSS
 * variables, so the resolved values are passed instead of `var(--ds-*)`.
 */

/** Id of the <template> holding the theme CSS in the manager (see main.ts). */
export const themeTokensTemplateId = "gnist-theme-tokens";

const readColorToken = (scheme: "light" | "dark") => {
  // The probe lives in a shadow root so the theme CSS doesn't style the
  // manager page. In the preview the theme CSS is already loaded, and the
  // tokens inherit from the host.
  const host = document.createElement("div");
  host.dataset.colorScheme = scheme;
  const shadow = host.attachShadow({ mode: "open" });
  const template = document.getElementById(themeTokensTemplateId);
  if (template instanceof HTMLTemplateElement) {
    shadow.append(template.content.cloneNode(true));
  }
  const probe = document.createElement("div");
  probe.dataset.colorScheme = scheme;
  shadow.append(probe);
  document.documentElement.append(host);
  const style = getComputedStyle(probe);
  const token = (name: string) => {
    const value = style.getPropertyValue(`--ds-color-${name}`).trim();
    if (!value) throw new Error(`Storybook theme: missing --ds-color-${name}`);
    return value;
  };
  return { token, dispose: () => host.remove() };
};

const createTheme = (scheme: "light" | "dark"): ThemeVars => {
  const { token, dispose } = readColorToken(scheme);
  const dark = scheme === "dark";
  const theme = create({
    base: scheme,
    brandTitle: "Gnist, Arbeidstilsynet Design",
    brandUrl: "https://gnist.arbeidstilsynet.no/",
    brandTarget: "_self",
    brandImage: dark
      ? "https://at-static.arbeidstilsynet.no/logos/at-logo-horizontal-white.svg"
      : "https://at-static.arbeidstilsynet.no/logos/at-logo-horizontal.svg",

    fontBase: '"Inter", sans-serif',
    fontCode:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',

    appBorderRadius: 4,
    inputBorderRadius: 4,

    colorPrimary: token("accent-base-default"),
    colorSecondary: token("accent-base-default"),

    appBg: token("neutral-background-tinted"),
    appContentBg: token("neutral-background-default"),
    appPreviewBg: token("neutral-background-default"),
    appHoverBg: token(
      dark ? "accent-surface-tinted" : "accent-background-tinted",
    ),
    appBorderColor: token("neutral-border-subtle"),

    textColor: token("neutral-text-default"),
    textMutedColor: token("neutral-text-subtle"),
    textInverseColor: token("neutral-base-contrast-default"),

    barBg: token("neutral-surface-default"),
    barTextColor: token("neutral-text-subtle"),
    barSelectedColor: token(
      dark ? "accent-text-subtle" : "accent-base-default",
    ),
    barHoverColor: token("accent-base-hover"),

    buttonBg: token("neutral-surface-default"),
    buttonBorder: token("neutral-border-subtle"),
    booleanBg: token("neutral-surface-tinted"),
    booleanSelectedBg: token(
      dark ? "neutral-surface-active" : "neutral-surface-default",
    ),

    inputBg: token("neutral-surface-default"),
    inputBorder: token("neutral-border-default"),
    inputTextColor: token("neutral-text-default"),
  });
  dispose();
  return theme;
};

/** Mirrors Designsystemet's `data-color-scheme`. */
export type ColorScheme = "light" | "dark" | "auto";

export const darkColorSchemeQuery = "(prefers-color-scheme: dark)";

/*
 * The toolbar choice is stored in localStorage, which the manager and the
 * preview iframe share. Unlike Storybook globals, changing it doesn't
 * re-render the preview, so docs pages don't flash.
 */
export const colorSchemeStorageKey = "gnist-storybook-color-scheme";

export const readStoredColorScheme = (): ColorScheme => {
  const stored = window.localStorage.getItem(colorSchemeStorageKey);
  return stored === "light" || stored === "dark" ? stored : "auto";
};

export const resolveColorScheme = (scheme: unknown): "light" | "dark" => {
  if (scheme === "light" || scheme === "dark") return scheme;
  return typeof window !== "undefined" &&
    window.matchMedia(darkColorSchemeQuery).matches
    ? "dark"
    : "light";
};

const themes = new Map<"light" | "dark", ThemeVars>();

export const getTheme = (scheme: unknown) => {
  const resolved = resolveColorScheme(scheme);
  let theme = themes.get(resolved);
  if (!theme) {
    theme = createTheme(resolved);
    themes.set(resolved, theme);
  }
  return theme;
};
