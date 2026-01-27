import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx/lite";
import { isValidElement, use, type HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";
import { HeaderContext } from "./headerContext";

export interface HeaderNavbarProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {}

/**
 * Navigation bar showing links in the header.
 * **Hidden on mobile viewports** - links are moved to `Header.Menu` instead.
 *
 * Automatically receives navigation links from the parent `Header` component
 * via context. The links are styled as header navigation links.
 *
 * @example
 * ```tsx
 * <Header links={[<Link href="/">Home</Link>, <Link href="/about">About</Link>]}>
 *   <Header.Title>...</Header.Title>
 *   <Header.Navbar />
 *   <Header.Menu>...</Header.Menu>
 * </Header>
 * ```
 */
export function HeaderNavbar({
  ref,
  className,
  ...rest
}: Readonly<HeaderNavbarProps>) {
  const { links } = use(HeaderContext);

  return (
    <nav ref={ref} className={clsx("at-header__center", className)} {...rest}>
      {links?.map((link, idx) => {
        if (isValidElement(link)) {
          return (
            <Slot
              key={link.key ?? idx}
              className={clsx("at-header__link", "ds-link")}
            >
              {link}
            </Slot>
          );
        }
        return link;
      })}
    </nav>
  );
}
