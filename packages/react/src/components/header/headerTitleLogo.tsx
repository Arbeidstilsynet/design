import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";

function LogoSvg({
  width = 48,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="40" rx="4" fill="#0062BA" />
      <path d="M24 8L32 16H28V28H20V16H16L24 8Z" fill="white" />
      <circle cx="24" cy="32" r="2" fill="white" />
    </svg>
  );
}

export interface HeaderTitleLogoProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  fagsystemNavn?: string;
}

export function HeaderTitleLogo({
  className,
  logo,
  fagsystemNavn = "Fagsystem",
  ...rest
}: Readonly<HeaderTitleLogoProps>) {
  return (
    <div className={clsx(className)} {...rest}>
      <div className={clsx("at-header__title-logo")}>{logo || <LogoSvg />}</div>
      <p>{fagsystemNavn}</p>
    </div>
  );
}
