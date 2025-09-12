import { Header as HeaderParent } from "./header";
import { HeaderTitle } from "./headerTitle";
import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";

/**
 * Header component for the design system.
 * It includes optional title, search, and links sections.
 *
 * Uses Radix UI's Slot for flexible link items.
 * This means that you can pass any component as a child to `Header.Links.Item` and it will render correctly.
 * The `asChild` prop must be set to `true` on `Header.Links.Item` to enable this behavior.
 * Any className passed to `Header.Links.Item` will be applied to the child component.
 *
 */

const Header = Object.assign(HeaderParent, {
  Title: HeaderTitle,
  Search: HeaderSearch,
  Links: HeaderLinks,
});

export type { HeaderProps } from "./header";
export type { HeaderSearchProps } from "./headerSearch";
export type { HeaderLinksProps, LinkItemProps } from "./headerLinks";
export type { HeaderTitleProps } from "./headerTitle";
export { Header, HeaderTitle, HeaderSearch, HeaderLinks };
