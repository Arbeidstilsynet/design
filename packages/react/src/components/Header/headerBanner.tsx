import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes } from "react";

export interface HeaderBannerProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function HeaderBanner({
  className,
  text = "Miljøbanner",
  ...rest
}: Readonly<HeaderBannerProps>) {
  return (
    <div className={clsx("at-header__banner", className)} {...rest}>
      <p>{text}</p>
    </div>
  );
}