import { clsx } from "clsx/lite";
import { HTMLAttributes } from "react";
import { DefaultProps } from "../../types";
import { Button, Link } from "../../digdir";

export interface LinksProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  links: {
    href: string;
    text: string;
  }[];
}

export function Links({
  className,
  links,
  ...rest
}: Readonly<LinksProps>) {
  return (
    <div className={clsx("at-topnav__links-background", className)} {...rest}>
      <ul className="at-topnav__links">
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
