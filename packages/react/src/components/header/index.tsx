import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { HeaderDropdown } from "./headerDropdown";
import { HeaderLinks } from "./headerLinks";
import { HeaderLogo } from "./headerLogo";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  image: ReactNode;
  appName: ReactNode;
  links: ReactNode[];
  menuTitle: string;
  menuControls?: ReactNode;
  children: never;
}

export function Header({
  ref,
  className,
  image,
  appName,
  links,
  menuTitle,
  menuControls = [],
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
        <HeaderLinks className="at-header__center" links={links} />
        <HeaderDropdown
          className="at-header__right"
          menuControls={menuControls}
          userName={menuTitle}
        />
      </div>
    </header>
  );
}
