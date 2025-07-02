import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";

export interface BannerProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function Banner({
  className,
  text = "Miljøbanner",
  ...rest
}: Readonly<BannerProps>) {
  return (
    <div className={clsx("at-topnav__banner", className)} {...rest}>
      <p>{text}</p>
    </div>
  );
}