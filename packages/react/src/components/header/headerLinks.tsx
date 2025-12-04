import { clsx } from "clsx/lite";
import { Slot } from "@radix-ui/react-slot";
import type { DefaultProps } from "../../types";
import { useState } from "react";
import { Dropdown } from "../..";
import { MenuHamburgerIcon, XMarkIcon } from "@navikt/aksel-icons";

export type HeaderLinksProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const HeaderLinksMobile = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger onClick={() => setOpen(!open)} variant="tertiary">
        <span>Lenker</span>
        {open ? <XMarkIcon aria-hidden /> : <MenuHamburgerIcon aria-hidden />}
      </Dropdown.Trigger>
      <Dropdown open={open} onClose={() => setOpen(false)}>
        <Dropdown.List>
          <Dropdown.Item>{children}</Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
};

export const HeaderLinksRoot = ({ children, ...props }: HeaderLinksProps) => {
  return (
    <div className={clsx("at-header__links-root")} {...props}>
      <div className={clsx("at-header__links-desktop")}>{children}</div>
      <div className={clsx("at-header__links-mobile")}>
        <HeaderLinksMobile>{children}</HeaderLinksMobile>
      </div>
    </div>
  );
};

export interface LinkItemProps
  extends DefaultProps<HTMLDivElement>,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const HeaderLinkItem = ({
  asChild = false,
  className,
  children,
  ...props
}: LinkItemProps) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component className={clsx("at-header__links-item", className)} {...props}>
      {children}
    </Component>
  );
};

export const HeaderLinks = Object.assign(HeaderLinksRoot, {
  Item: HeaderLinkItem,
});
