import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes } from "react";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {}

export function Header({
  ref,
  className,
  children,
  ...rest
}: Readonly<HeaderProps>) {
  return (
    <div ref={ref} className={clsx("at-header", className)} {...rest}>
      {children}
    </div>
  );
}
