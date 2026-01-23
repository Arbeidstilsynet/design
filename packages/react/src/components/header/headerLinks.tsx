import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { Slot } from "@radix-ui/react-slot";
import { Children, isValidElement } from "react";

export interface HeaderLinksProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function HeaderLinks({
  className,
  children,
  ...rest
}: Readonly<HeaderLinksProps>) {
  return (
    <nav className={clsx(className)} {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <Slot className={clsx("at-header__link", "ds-link")}>{child}</Slot>
          );
        }
        return child;
      })}
    </nav>
  );
}
