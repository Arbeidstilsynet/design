import { clsx } from "clsx/lite";
import { HTMLAttributes } from "react";
import { DefaultProps } from "../../types";
import { Button, Link } from "../../digdir";

export interface HeaderLinksProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  links: {
    href: string;
    text: string;
  }[];
}

export function HeaderLinks({
  className,
  links,
  ...rest
}: Readonly<HeaderLinksProps>) {
  return (
    <div className={clsx("at-header__links-background", className)} {...rest}>
      <ul className="at-header__links">
        {links.map((link, index) => (
          <Button key={index} asChild>
            <Link href={link.href}>
              {link.text}
            </Link>
          </Button>
        ))}
      </ul>
    </div>
  );
}
