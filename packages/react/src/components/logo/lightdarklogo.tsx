import type { SVGProps } from "react";
import { LogoBlack } from "./logoblack";
import { LogoWhite } from "./logowhite";

export interface LightDarkLogoProps extends SVGProps<SVGSVGElement> {
  /**
   * Width of the logo. Default is "100%".
   */
  width?: string | number;
}

/**
 * Displays the Arbeidstilsynet logo with automatic switching between
 * black and white variants based on the current color scheme.
 *
 * You can alternatively import `LogoBlack`, `LogoWhite` or `LogoGreen` directly.
 *
 * Usage:
 * ```tsx
 * <LightDarkLogo width="150px" />
 * ```
 */
export function LightDarkLogo({
  width = "100%",
  ...rest
}: Readonly<LightDarkLogoProps>) {
  return (
    <span className="at-logo-wrapper">
      <span className="at-logo at-logo-light">
        <LogoBlack width={width} {...rest} />
      </span>
      <span className="at-logo at-logo-dark">
        <LogoWhite width={width} {...rest} />
      </span>
    </span>
  );
}
