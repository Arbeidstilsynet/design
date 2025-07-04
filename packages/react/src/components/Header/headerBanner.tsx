import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";

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