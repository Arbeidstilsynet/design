import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { Heading } from "../..";

export interface HeaderTitleLogoProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  logo: ReactNode;
  appName: string;
}

export function HeaderTitleLogo({
  className,
  logo,
  appName,
  ...rest
}: Readonly<HeaderTitleLogoProps>) {
  return (
    <div className={clsx(className)} {...rest}>
      <div className={clsx("at-header__title-logo")}>{logo}</div>
      <Heading>{appName}</Heading>
    </div>
  );
}
