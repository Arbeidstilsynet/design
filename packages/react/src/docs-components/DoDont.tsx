// based on upstream component
// https://github.com/digdir/designsystemet/blob/v1.23.0/apps/www/app/_components/do-dont/do-dont.tsx

import {
  CheckmarkCircleFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { Story } from "@storybook/addon-docs/blocks";
import type { ComponentProps, ReactNode } from "react";
// @ts-ignore - Exception for CSS modules - Ordinary, exported CSS files are defined in the CSS project.
import classes from "./DoDont.module.css";

type DoDontProps = {
  /** The story showing the example. */
  of: ComponentProps<typeof Story>["of"];
  variant: "do" | "dont";
  /** Description of the example. */
  children?: ReactNode;
};

/**
 * Shows a "do" or "don't" example from a story, with a description.
 * Place several in a `<div className="dodont-row">` to show them side by side.
 */
export function DoDont({ of, variant, children }: DoDontProps) {
  return (
    <div className={`${classes.dodont} sb-unstyled`} data-variant={variant}>
      <div
        className={classes.header}
        data-color={variant === "do" ? "success" : "danger"}
      >
        {variant === "do" ? (
          <CheckmarkCircleFillIcon aria-hidden />
        ) : (
          <XMarkOctagonFillIcon aria-hidden />
        )}
        <p className="ds-paragraph">{variant === "do" ? "Do" : "Don't"}</p>
      </div>
      <div className={classes.preview}>
        <Story of={of} />
      </div>
      <div className={classes.footer}>{children}</div>
    </div>
  );
}
