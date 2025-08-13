import { clsx } from "clsx/lite";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";
import { Button, Link } from "../../digdir";

export interface HeaderLinksItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  asButton?: boolean;
}

function HeaderLinksItem({
  children,
  href,
  asButton = false,
  className,
  ...rest
}: Readonly<HeaderLinksItemProps>) {
  const content = (
    <Link href={href} className={clsx("at-header__links-text", className)} {...rest}>
      {children}
    </Link>
  );
  return (
    <li className="at-header__links-item">
      {asButton ? (
        <Button asChild className="at-header__links-buttons">
          {content}
        </Button>
      ) : (
        content
      )}
    </li>
  )
}

export interface HeaderLinksProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HeaderLinksRoot({
  className,
  children,
  ...rest
}: Readonly<HeaderLinksProps>) {

  return (
    <div className={clsx("at-header__links-background", className)} {...rest}>
      <ul className="at-header__links">
        {children}
      </ul>
    </div>
  );
}

export const HeaderLinks = Object.assign(HeaderLinksRoot, {
  Item: HeaderLinksItem,
});