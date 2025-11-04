import { Switch } from "@arbeidstilsynet/design-react";
import { ColorItem, ColorPalette } from "@storybook/addon-docs/blocks";
import { useEffect, useRef, useState } from "react";
import { getGroupedThemeColors } from "./getThemeColors";

export function ColorsSwatches() {
  const parentRef = useRef(null);
  const [scheme, setScheme] = useState("light");
  const [colors, setColors] = useState<
    ReturnType<typeof getGroupedThemeColors>
  >({});

  useEffect(() => {
    if (!parentRef.current) return;
    const themeColors = getGroupedThemeColors(parentRef.current);
    setColors(themeColors);
  }, [scheme]);

  return (
    <div
      ref={parentRef}
      data-color-scheme={scheme}
      style={{ padding: "1rem", background: "#ffffff" }}
      className="colors-demo-scope"
    >
      <div
        data-color-scheme="light"
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <Switch
          checked={scheme === "dark"}
          label="Dark color scheme"
          onChange={() => {
            setScheme(scheme === "light" ? "dark" : "light");
          }}
        />
      </div>
      <ColorPalette>
        {Object.entries(colors).map(([name, value]) => (
          <ColorItem key={name} title={name} colors={value} subtitle="" />
        ))}
      </ColorPalette>
    </div>
  );
}
