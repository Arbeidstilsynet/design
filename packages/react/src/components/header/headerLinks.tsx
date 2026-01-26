import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderLinksProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
  links?: ReactNode[];
}

export function HeaderLinks({
  className,
  links,
  ...rest
}: Readonly<HeaderLinksProps>) {
  return (
    <nav className={clsx(className)} {...rest}>
      {links?.map((link, idx) => {
        if (isValidElement(link)) {
          return (
            <Slot key={idx} className={clsx("at-header__link", "ds-link")}>
              {link}
            </Slot>
          );
        }
        return link;
      })}
    </nav>
  );
}
