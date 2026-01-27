import { clsx } from "clsx/lite";
import { useMemo, type HTMLAttributes, type ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { HeaderContext } from "./headerContext";

export interface HeaderProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
  /**
   * Navigation links to be displayed in the navbar (desktop) and menu (mobile).
   *
   * On desktop viewports, links appear in the `Header.Navbar` component.
   * On mobile viewports, links are automatically shown in the `Header.Menu` dropdown
   * above any custom menu controls.
   *
   * @example
   * ```tsx
   * <Header links={[
   *   <Link key="home" href="/">Hjem</Link>,
   *   <Link key="about" href="/about">Om oss</Link>,
   * ]}>
   *   ...
   * </Header>
   * ```
   */
  links?: ReactNode[];

  /**
   * Compound component children.
   * Typically includes `Header.Title`, `Header.Navbar`, and `Header.Menu`.
   */
  children?: ReactNode;
}

export function Header({
  ref,
  className,
  children,
  links = [],
  ...rest
}: Readonly<HeaderProps>) {
  const contextValue = useMemo(() => ({ links }), [links]);

  return (
    <HeaderContext.Provider value={contextValue}>
      <header ref={ref} className={clsx("at-header", className)} {...rest}>
        <div className="at-header__container">{children}</div>
      </header>
    </HeaderContext.Provider>
  );
}
