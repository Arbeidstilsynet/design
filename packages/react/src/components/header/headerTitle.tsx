import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { HeaderTitleLogo } from "./headerTitleLogo";
import { HeaderTitleLinks, type LinkItem } from "./headerTitleLinks";
import { HeaderTitleDropdown } from "./headerTitleDropdown";

export interface HeaderTitleProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  fagsystemNavn?: string;
  brukernavn?: string;
  links?: LinkItem[];
  controls?: ReactNode[];
}

export function HeaderTitle({
  className,
  fagsystemNavn = "Fagsystem",
  brukernavn = "Bruker Brukersen",
  links = [],
  controls = [],
  ...rest
}: Readonly<HeaderTitleProps>) {
  return (
    <div className={clsx("at-header__title-background", className)} {...rest}>
      <div className={clsx("at-header__title")}>
        <HeaderTitleLogo
          className={clsx("at-header__title-left")}
          fagsystemNavn={fagsystemNavn}
        />
        <HeaderTitleLinks
          className={clsx("at-header__title-center")}
          links={links}
        />
        <HeaderTitleDropdown
          className={clsx("at-header__title-right")}
          brukernavn={brukernavn}
          controls={controls}
        />
      </div>
    </div>
  );
}
