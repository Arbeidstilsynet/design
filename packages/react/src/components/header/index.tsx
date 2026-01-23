import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes, ReactNode } from "react";
import { HeaderDropdown } from "./headerDropdown";
import { HeaderLogo } from "./headerLogo";
import { HeaderLinks } from "./headerLinks";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  image: ReactNode;
  appName: ReactNode;
  menuTitle: string;
  children?: ReactNode;
  controls?: ReactNode;
}

export function Header({
  ref,
  className,
  image,
  children,
  appName,
  menuTitle,
  controls = [],
  ...rest
}: Readonly<HeaderProps>) {
  return (
    <header ref={ref} className={clsx("at-header", className)} {...rest}>
      <div className={clsx("at-header__background", className)}>
        <HeaderLogo
          className="at-header__left"
          logo={image}
          appName={appName}
        />
        <HeaderLinks className="at-header__center">{children}</HeaderLinks>
        <HeaderDropdown
          className="at-header__right"
          controls={controls}
          userName={menuTitle}
        />
      </div>
    </header>
  );
}
