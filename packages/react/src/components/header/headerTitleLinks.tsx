import { clsx } from "clsx/lite";
import type { HTMLAttributes, ReactNode } from "react";
import { Link } from "../../digdir";
import type { DefaultProps } from "../../types";
import { Slot } from "@radix-ui/react-slot";
import { Children, isValidElement } from "react";

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeaderTitleLinksProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  links?: LinkItem[];
  children?: ReactNode;
}

export function HeaderTitleLinks({
  className,
  links,
  children,
  ...rest
}: Readonly<HeaderTitleLinksProps>) {
  return (
    <nav className={clsx(className)} {...rest}>
      {children
        ? Children.map(children, (child) => {
            if (isValidElement(child)) {
              return (
                <Slot className={clsx("at-header__title-link", "ds-link")}>
                  {child}
                </Slot>
              );
            }
            return child;
          })
        : links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx("at-header__title-link")}
            >
              {link.label}
            </Link>
          ))}
    </nav>
  );
}
