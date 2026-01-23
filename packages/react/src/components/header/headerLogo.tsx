import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderLogoProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  logo: ReactNode;
  appName: ReactNode;
}

export function HeaderLogo({
  className,
  logo,
  appName,
  ...rest
}: Readonly<HeaderLogoProps>) {
  return (
    <div className={clsx(className)} {...rest}>
      <div className={clsx("at-header__logo")}>{logo}</div>
      <div>{appName}</div>
    </div>
  );
}
