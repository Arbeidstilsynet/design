import { clsx } from "clsx/lite";
import { HTMLAttributes } from "react";
import { DefaultProps } from "../../types";
import { Button, Link, useMediaQuery } from "../../digdir";

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
  const isMobile = useMediaQuery('(max-width: 30rem)');
  const dataSize = isMobile ? 'xs' : 'md';
  return (
    <div className={clsx("at-header__links-background", className)} {...rest} data-size={dataSize}>
      <ul className="at-header__links">
        {links.map((link, index) => (
          <Button key={index} asChild className="at-header__links-buttons">
            <Link href={link.href} className="at-header__links-text">
              {link.text}
            </Link>
          </Button>
        ))}
      </ul>
    </div>
  );
}
