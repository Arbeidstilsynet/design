import { clsx } from "clsx/lite";
import type { HTMLAttributes } from "react";
import { Link } from "../../digdir";
import type { DefaultProps } from "../../types";

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeaderTitleLinksProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  links?: LinkItem[];
}

export function HeaderTitleLinks({
  className,
  links,
  ...rest
}: Readonly<HeaderTitleLinksProps>) {
  return (
    <nav className={clsx(className)} {...rest}>
      {links?.map((link) => (
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
