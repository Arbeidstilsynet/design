import { Dropdown, Switch } from "@arbeidstilsynet/design-react";
import { Unstyled } from "@storybook/addon-docs/blocks";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ColorPalette } from "./ColorPalette";
import classes from "./ColorsSwatches.module.css";
import { getGroupedThemeColors } from "./getThemeColors";

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
    <Unstyled>
      <div
        ref={parentRef}
        data-color-scheme={scheme}
        className={classes.container}
        data-color={dataColor}
      >
        <div
          data-color-scheme="light"
          data-color={dataColor}
          className={classes.inputs}
        >
          <Switch
            checked={scheme === "dark"}
            label="Dark color scheme"
            onChange={() => {
              setScheme(scheme === "light" ? "dark" : "light");
            }}
          />
          <Dropdown.TriggerContext>
            <Dropdown.Trigger className={classes.triggerButton} data-size="sm">
              [data-color="{dataColor}"]
            </Dropdown.Trigger>
            <Dropdown placement="bottom-end" className={classes.dropdownContent}>
              <Dropdown.List>
                {Object.keys(colors.ordinary).map((color) => (
                  <Dropdown.Item key={color}>
                    <Dropdown.Button
                      data-color={color.toLowerCase()}
                      value={color.toLowerCase()}
                      onClick={() => setDataColor(color.toLowerCase())}
                      className={classes.listItemButton}
                    >
                      {color}
                    </Dropdown.Button>
                  </Dropdown.Item>
                ))}
              </Dropdown.List>
            </Dropdown>
          </Dropdown.TriggerContext>
        </div>
        <div className={classes.infoText}>
          <span>
            Semantic colors:{" "}
          </span>
          <span>
            Changes based on the closest ancestor with a "data-color" attribute
            (Defaults to Accent)
          </span>
        </div>
        <ColorPalette palette={colors.special} />
        <br />
        <div className={classes.infoText}>
          <span>
            Color palette:{" "}
          </span>
          <span>
            Only changes with the dark color scheme
          </span>
        </div>
        <ColorPalette palette={colors.ordinary} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        pauseOnHover
      />
    </Unstyled>
  );
}
