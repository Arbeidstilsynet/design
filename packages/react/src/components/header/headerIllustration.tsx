import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderIllustrationProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  /**
   * Illustration content, typically an image or icon.
   * This element is hidden on mobile viewports.
   */
  children: ReactNode;
}

/**
 * Decorative illustration shown next to the logo in the header.
 * **Hidden on mobile viewports** to save space.
 *
 * Use for decorative branding images that are not essential for navigation.
 * For the main logo that should always be visible, use `Header.Logo` instead.
 *
 * @example
 * ```tsx
 * <Header.Illustration>
 *   <img src="/illustration.svg" alt="" />
 * </Header.Illustration>
 * ```
 */
export function HeaderIllustration({
  className,
  children,
  ...rest
}: Readonly<HeaderIllustrationProps>) {
  return (
    <div className={clsx("at-header__logo", className)} {...rest}>
      {children}
    </div>
  );
}
