import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface LightDarkImageProps
  extends
    DefaultProps<HTMLSpanElement>,
    Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image to show in light mode */
  light: React.ReactNode;
  /** Image to show in dark mode */
  dark: React.ReactNode;
}

/**
 * Displays an image with automatic switching between
 * light and dark variants based on the current color scheme.
 *
 * Usage:
 * ```tsx
 * <LightDarkImage light={<LogoBlack />} dark={<LogoWhite />} />
 * ```
 */
export function LightDarkImage({
  light,
  dark,
  ...rest
}: Readonly<LightDarkImageProps>) {
  return (
    <span className="at-lightdarkimage" {...rest}>
      <span className="at-lightdarkimage-light">{light}</span>
      <span className="at-lightdarkimage-dark">{dark}</span>
    </span>
  );
}
