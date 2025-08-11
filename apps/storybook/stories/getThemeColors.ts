export function getThemeColors(prefix = '--ds-color-') {
  const styles = getComputedStyle(document.documentElement);
  const colors: Record<string, string> = {};
  for (let i = 0; i < styles.length; i++) {
    const name = styles[i];
    if (name!.startsWith(prefix)) {
      colors[name!] = styles.getPropertyValue(name!).trim();
    }
  }
  return colors;
}

export function getGroupedThemeColors(prefix = '--ds-color-') {
  const styles = getComputedStyle(document.documentElement);
  const groups: Record<string, Record<string, string>> = {};

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i];
    if (name!.startsWith(prefix)) {
      // e.g. --ds-color-primary-background-default
      const [, , , , group, ...rest] = name!.split('-'); // ["", "", "primary", ...]
      if (group === "brand") continue;
      const groupName = group!.charAt(0).toUpperCase() + group!.slice(1); // "Primary"
      const colorName = rest.join('-'); // "background-default"
      if (!groups[groupName]) groups[groupName] = {};
      groups[groupName][colorName] = styles.getPropertyValue(name!).trim();
    }
  }
  // Sort groups by Base and Primary first
  const sortedGroupNames = Object.keys(groups).sort((a, b) => {
    if (a === 'Base') return -1;
    if (b === 'Base') return 1;
    if (a === 'Primary') return -1;
    if (b === 'Primary') return 1;
    return a.localeCompare(b);
  });
  const sortedGroups: Record<string, Record<string, string>> = {};
  for (const groupName of sortedGroupNames) {
    sortedGroups[groupName] = groups[groupName];
  }
  return sortedGroups;
}