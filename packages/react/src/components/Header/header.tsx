import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  showBanner?: boolean;
  bannerText?: string;
  showTitle?: boolean;
  fagsystemNavn?: string;
  brukernavn?: string;
  showSearch?: boolean;
  showLinks?: boolean;
}

export function Header({
  ref,
  className,
  children,
  ...rest
}: Readonly<HeaderProps>) {

  return (
    <div ref={ref} className={clsx("at-topnav", className)} {...rest}>
      {children}
    </div>
  )
}