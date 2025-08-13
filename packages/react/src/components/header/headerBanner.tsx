import { clsx } from "clsx/lite";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderBannerProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HeaderBanner({
  children,
  className,
  ...rest
}: Readonly<HeaderBannerProps>) {
  return (
    <div className={clsx("at-header__banner", className)} {...rest}>
      <p>{children}</p>
    </div>
  );
}
