import { clsx } from "clsx/lite";
import type { HTMLAttributes } from "react";
import { Avatar } from "../../digdir";
import type { DefaultProps } from "../../types";
import { LightDarkLogo } from "../logo/lightdarklogo";

export interface HeaderTitleProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  fagsystemNavn?: string;
  brukernavn?: string;
}

export function HeaderTitle({
  className,
  fagsystemNavn = "Fagsystem",
  brukernavn = "Bruker Brukersen",
  ...rest
}: Readonly<HeaderTitleProps>) {
  const getInitials = (name?: string) => {
    if (!name) return "";
    const names = name.split(" ");

    if (names.length === 1) {
      return names[0]!.charAt(0).toUpperCase();
    }
    return (
      names[0]!.charAt(0).toUpperCase() + names.at(-1)!.charAt(0).toUpperCase()
    );
  };
  return (
    <div className={clsx("at-header__title-background", className)} {...rest}>
      <div className={clsx("at-header__title")}>
        <div className={clsx("at-header__title-left")}>
          <LightDarkLogo width="150px" />
        </div>
        <div className={clsx("at-header__title-center")}>
          <p>{fagsystemNavn}</p>
        </div>
        <div className={clsx("at-header__title-right")}>
          <Avatar
            aria-label={brukernavn}
            initials={getInitials(brukernavn)}
            data-size="xs"
          />
          <p className={clsx("at-header__title-brukernavn")}>{brukernavn}</p>
        </div>
      </div>
    </div>
  );
}
