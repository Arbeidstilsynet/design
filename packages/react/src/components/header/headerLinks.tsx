import { clsx } from "clsx/lite";
import { Slot } from "@radix-ui/react-slot";
import type { DefaultProps } from "../../types";
import { useMediaQuery } from "../hooks/useMediaQuery";

export type HeaderLinksProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const HeaderLinksRoot = ({ children, ...props }: HeaderLinksProps) => {
  return (
    <div className={clsx("at-header__links-root")} {...props}>
      <label
        className="hamburger-menu"
        htmlFor="hamburger-checkbox"
        aria-label="Toggle navigation"
      >
        <input id="hamburger-checkbox" type="checkbox" />
      </label>
      <div className={clsx("at-header__links")}>{children}</div>
    </div>
  );
};

export interface LinkItemProps
  extends DefaultProps<HTMLDivElement>,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  asChild: boolean;
  children: React.ReactNode;
}

export const HeaderLinkItem = ({
  asChild,
  className,
  children,
  ...props
}: LinkItemProps) => {
  const Component = asChild ? Slot : "div";
  const isMobile = useMediaQuery("(max-width: 30rem)");
  const dataSize = isMobile ? "xs" : "md";
  return (
    <Component
      className={clsx("at-header__links-item", className)}
      {...props}
      data-size={dataSize}
    >
      {children}
    </Component>
  );
};

export const HeaderLinks = Object.assign(HeaderLinksRoot, {
  Item: HeaderLinkItem,
});
