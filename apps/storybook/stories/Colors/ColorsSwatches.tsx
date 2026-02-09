import { Dropdown, Switch } from "@arbeidstilsynet/design-react";
import { ColorItem, ColorPalette } from "@storybook/addon-docs/blocks";
import { useEffect, useRef, useState } from "react";
import { getGroupedThemeColors } from "./getThemeColors";

const buttonStyle: React.CSSProperties = {
  background: "var(--ds-color-background-tinted)",
  color: "var(--ds-color-text-default)",
};

export function ColorsSwatches() {
  const parentRef = useRef(null);
  const [scheme, setScheme] = useState("light");
  const [colors, setColors] = useState<
    ReturnType<typeof getGroupedThemeColors>
  >({ special: {}, ordinary: {} });
  const [dataColor, setDataColor] = useState("accent");

  useEffect(() => {
    if (!parentRef.current) return;
    const themeColors = getGroupedThemeColors(parentRef.current);
    setColors(themeColors);
  }, [scheme, dataColor]);

  return (
    <div
      ref={parentRef}
      data-color-scheme={scheme}
      style={{ padding: "1rem", background: "#ffffff" }}
      className="colors-demo-scope"
      data-color={dataColor}
    >
      <div
        data-color-scheme="light"
        data-color={dataColor}
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Switch
          checked={scheme === "dark"}
          label="Dark color scheme"
          onChange={() => {
            setScheme(scheme === "light" ? "dark" : "light");
          }}
        />
        <Dropdown.TriggerContext>
          <Dropdown.Trigger style={buttonStyle} data-size="sm">
            [data-color="{dataColor}"]
          </Dropdown.Trigger>
          <Dropdown placement="bottom-end">
            <Dropdown.List style={{ padding: "0", margin: "0" }}>
              {Object.keys(colors.ordinary).map((color) => (
                <Dropdown.Item style={{ display: "block" }} key={color}>
                  <Dropdown.Button
                    data-color={color.toLowerCase()}
                    value={color.toLowerCase()}
                    onClick={() => setDataColor(color.toLowerCase())}
                    style={buttonStyle}
                  >
                    {color}
                  </Dropdown.Button>
                </Dropdown.Item>
              ))}
            </Dropdown.List>
          </Dropdown>
        </Dropdown.TriggerContext>
      </div>
      <div style={{ padding: "0.5rem 0", marginBottom: "1rem" }}>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Dynamic colors:{" "}
        </span>
        <span style={{ color: "black" }}>
          Changes based on the closest ancestor with a "data-color" attribute
          (Defaults to Accent)
        </span>
      </div>
      <ColorPalette>
        {Object.entries(colors.special).map(([name, value]) => (
          <ColorItem key={name} title={name} colors={value} subtitle="" />
        ))}
      </ColorPalette>
      <div style={{ padding: "0.5rem 0", marginBottom: "1rem" }}>
        <span style={{ color: "black", fontWeight: "bold" }}>
          Regular colors:{" "}
        </span>
        <span style={{ color: "black" }}>
          Only changes with the dark color scheme
        </span>
      </div>
      <ColorPalette>
        {Object.entries(colors.ordinary).map(([name, value]) => (
          <ColorItem key={name} title={name} colors={value} subtitle="" />
        ))}
      </ColorPalette>
    </div>
  );
}
