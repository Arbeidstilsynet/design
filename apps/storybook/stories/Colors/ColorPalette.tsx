import { Alert } from "@arbeidstilsynet/design-react";
import React from "react";
import { toast } from "react-toastify";
import classes from "./ColorPalette.module.css";

type ColorPaletteV2Props = {
  palette: Record<string, Record<string, string>>;
};

export const ColorPalette = ({ palette }: ColorPaletteV2Props) => {
  return (
    <div className={classes.palette}>
      {Object.entries(palette).map(([colorgroup, colors]) => (
        <React.Fragment key={colorgroup}>
          <div className={classes.groupName}>
            {colorgroup}
          </div>
          <div>
            <div className={classes.colorRow}>
              {Object.entries(colors).map(([key, value]) => (
                <div
                  className={classes.colorItem}
                  style={{ background: value }}
                  onClick={() => copyToClipboard(`var(--ds-color-${colorgroup.toLowerCase()}-${key})`)}
                />
              ))}
            </div>
            <div className={classes.bottomTextRow}>
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className={classes.bottomTextItem}>
                  {key}<br />{value.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};


const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast(
    <Alert data-size="sm" data-color="success" style={{ width: "100%" }}>Copied CSS variable to clipboard</Alert>,
    { autoClose: 1500, className: classes.toast },
  );
};
