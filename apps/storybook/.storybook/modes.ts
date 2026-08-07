export const allModes = {
  "light desktop": {
    colorScheme: "light",
    viewport: "atdesktop",
  },
  "dark desktop": {
    colorScheme: "dark",
    viewport: "atdesktop",
  },
  "light mobile": {
    colorScheme: "light",
    viewport: "atmobile",
  },
  "dark mobile": {
    colorScheme: "dark",
    viewport: "atmobile",
  },
} as const;

export const chromaticModes = {
  "light desktop": allModes["light desktop"],
  "dark desktop": allModes["dark desktop"],
} as const;
