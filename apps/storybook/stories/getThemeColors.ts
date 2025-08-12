function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Minimal local type for grouping rules to avoid `any`
type GroupingRule = CSSRule & { readonly cssRules: CSSRuleList };

function isGroupingRule(rule: CSSRule): rule is GroupingRule {
  return "cssRules" in rule;
}

function collectCustomPropNames(prefix = "--ds-color-"): Set<string> {
  const names = new Set<string>();
  const varRe = new RegExp(`(${escapeRe(prefix)}[\\w-]+)\\s*:`, "g");

  const processRules = (rules?: CSSRuleList) => {
    if (!rules) return;
    for (const rule of Array.from(rules)) {
      // Recurse into grouping rules (@media, @supports, @container, @layer, etc.)
      if (isGroupingRule(rule)) {
        processRules(rule.cssRules);
      }
      try {
        const text = rule.cssText as string | undefined;
        if (!text) continue;
        let m: RegExpExecArray | null;
        while ((m = varRe.exec(text)) !== null) {
          names.add(m[1]!);
        }
      } catch {
        // Some rule types or cross-origin rules can throw; skip
      }
    }
  };

  for (const sheet of Array.from(document.styleSheets)) {
    // Narrow to CSSStyleSheet to access cssRules (may still throw cross-origin)
    const cssSheet = sheet as CSSStyleSheet;
    try {
      processRules(cssSheet.cssRules);
    } catch {
      // Cross-origin/inaccessible stylesheet; skip
    }
  }

  return names;
}

export function getThemeColors(prefix = "--ds-color-", target?: Element) {
  const el = target ?? document.documentElement;
  const styles = getComputedStyle(el);

  // Primary discovery by scanning CSS text
  const names = collectCustomPropNames(prefix);

  // Fallback to computed-style enumeration (may not list custom props)
  if (names.size === 0) {
    for (let i = 0; i < styles.length; i++) {
      const name = styles[i];
      if (name && name.startsWith(prefix)) names.add(name);
    }
  }

  const colors: Record<string, string> = {};
  for (const name of names) {
    const value = styles.getPropertyValue(name).trim();
    if (value) colors[name] = value;
  }
  return colors;
}

export function getGroupedThemeColors(
  prefix = "--ds-color-",
  target?: Element,
) {
  const flat = getThemeColors(prefix, target);
  const groups: Record<string, Record<string, string>> = {};

  for (const [fullName, value] of Object.entries(flat)) {
    // e.g. --ds-color-primary-background-default
    const suffix = fullName.slice(prefix.length); // "primary-background-default"
    const [groupRaw, ...rest] = suffix.split("-");
    if (!groupRaw || groupRaw === "brand") continue;

    const groupName = groupRaw.charAt(0).toUpperCase() + groupRaw.slice(1);
    const colorName = rest.join("-");

    if (!groups[groupName]) groups[groupName] = {};
    groups[groupName][colorName] = value;
  }

  const sortedGroupNames = Object.keys(groups).sort((a, b) => {
    if (a === "Base") return -1;
    if (b === "Base") return 1;
    if (a === "Primary") return -1;
    if (b === "Primary") return 1;
    return a.localeCompare(b);
  });

  const sorted: Record<string, Record<string, string>> = {};
  for (const name of sortedGroupNames) sorted[name] = groups[name]!;
  return sorted;
}
