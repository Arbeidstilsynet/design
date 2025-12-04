import { clsx } from "clsx/lite";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";
import { HeaderTitleLogo } from "./headerTitleLogo";
import { HeaderTitleLinks, type LinkItem } from "./headerTitleLinks";
import { HeaderTitleDropdown } from "./headerTitleDropdown";
import { Switch } from "../../digdir";

export interface HeaderTitleProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  fagsystemNavn?: string;
  brukernavn?: string;
  links?: LinkItem[];
}

export function HeaderTitle({
  className,
  fagsystemNavn = "Fagsystem",
  brukernavn = "Bruker Brukersen",
  links = [
    { label: "Hjem", href: "#" },
    { label: "Saksbehandling", href: "#" },
    { label: "Mine saker", href: "#" },
  ],
  ...rest
}: Readonly<HeaderTitleProps>) {
  const controls = [<Switch label="Mørk modus" position="end" />];
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
          links={links}
          controls={controls}
        />
      </div>
    </div>
  );
}
