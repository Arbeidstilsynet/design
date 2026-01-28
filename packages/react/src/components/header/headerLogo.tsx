import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderLogoProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  /**
   * Logo content, typically a link wrapping the app logo/name.
   * This element is always visible on all viewport sizes.
   */
  children: ReactNode;
}

/**
 * Main logo/app name in the header. Always visible on all viewport sizes.
 *
 * Typically contains a `Link` component wrapping a logo image or app name.
 * Unlike `Header.Illustration`, this element remains visible on mobile.
 *
 * @example
 * ```tsx
 * <Header.Logo>
 *   <Link href="/">
 *     <img src="/logo.svg" alt="App Name" />
 *   </Link>
 * </Header.Logo>
 * ```
 */
export function HeaderLogo({
  className,
  children,
  ...rest
}: Readonly<HeaderLogoProps>) {
  return (
    <div className={clsx("at-header__logo", className)} {...rest}>
      {children}
    </div>
  );
}
