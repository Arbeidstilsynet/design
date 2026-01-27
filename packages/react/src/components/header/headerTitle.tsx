import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderTitleProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  /**
   * Title content, typically containing `Header.Illustration` and `Header.Logo`.
   *
   * @example
   * ```tsx
   * <Header.Title>
   *   <Header.Illustration>{illustrationImage}</Header.Illustration>
   *   <Header.Logo><Link href="/">{logoImage}</Link></Header.Logo>
   * </Header.Title>
   * ```
   */
  children: ReactNode;
}

/**
 * Container for the header's branding area containing illustration and logo.
 * Typically placed as the first child of `Header`.
 *
 * Use `Header.Illustration` for decorative images (hidden on mobile) and
 * `Header.Logo` for the main logo/app name (always visible).
 *
 * @example
 * ```tsx
 * <Header.Title>
 *   <Header.Illustration>{illustrationImage}</Header.Illustration>
 *   <Header.Logo><Link href="/">{logoImage}</Link></Header.Logo>
 * </Header.Title>
 * ```
 */
export function HeaderTitle({
  className,
  children,
  ...rest
}: Readonly<HeaderTitleProps>) {
  return (
    <div className={clsx("at-header__left", className)} {...rest}>
      {children}
    </div>
  );
}
