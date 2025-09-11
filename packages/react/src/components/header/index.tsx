import { Header as HeaderParent } from "./header";
import { HeaderTitle } from "./headerTitle";
import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";

/**
 * Header component for the design system.
 * It includes optional title, search, and links sections.
 * 
 * Uses Radix UI's Slot for flexible link items.
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
