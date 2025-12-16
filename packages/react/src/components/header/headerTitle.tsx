import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { HeaderDefaultLogo } from "./headerDefaultLogo";
import { HeaderTitleDropdown } from "./headerTitleDropdown";
import { HeaderTitleLinks, type LinkItem } from "./headerTitleLinks";
import { HeaderTitleLogo } from "./headerTitleLogo";

export interface HeaderTitleProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  appName: string;
  userName: string;
  links?: LinkItem[];
  controls?: ReactNode[];
  children?: ReactNode;
}

export function HeaderTitle({
  className,
  logo = <HeaderDefaultLogo />,
  appName,
  userName,
  links = [],
  controls = [],
  children,
  ...rest
}: Readonly<HeaderTitleProps>) {
  return (
    <div className={clsx("at-header__title-background", className)} {...rest}>
      <div className={clsx("at-header__title")}>
        <HeaderTitleLogo
          className={clsx("at-header__title-left")}
          logo={logo}
          appName={appName}
        />
        <HeaderTitleLinks
          className={clsx("at-header__title-center")}
          links={links}
        >
          {children}
        </HeaderTitleLinks>
        <HeaderTitleDropdown
          className={clsx("at-header__title-right")}
          links={links}
          userName={userName}
          controls={controls}
        >
          {children}
        </HeaderTitleDropdown>
      </div>
    </div>
  );
}
