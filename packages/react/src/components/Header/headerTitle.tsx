import { clsx } from "clsx/lite";
import { LogoBlack } from "../logo/logoblack";
import { LogoWhite } from "../logo/logowhite";
import { Avatar } from "../../digdir";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";

export interface HeaderTitleProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  fagsystemNavn?: string;
  brukernavn?: string;
}

export function HeaderTitle({
  className,
  fagsystemNavn = "Fagsystem",
  brukernavn = "Bruker",
  ...rest
}: Readonly<HeaderTitleProps>) {
  return (
    <div className={clsx("at-header__title-background", className)} {...rest}>
      <div className={clsx("at-header__title")}>
        <div className={clsx("at-header__title-left")}>
          <span className={clsx("at-header__title-light")}>
            <LogoBlack />
          </span>
          <span className={clsx("at-header__title-dark")}>
            <LogoWhite />
          </span>
        </div>
        <div className={clsx("at-header__title-center")}>
          <p>{fagsystemNavn}</p>
        </div>
        <div className={clsx("at-header__title-right")}>
          <Avatar aria-label="Ola Nordmann" initials="ON" />
          <p>{brukernavn}</p>
        </div>
      </div>
    </div>
  )
}