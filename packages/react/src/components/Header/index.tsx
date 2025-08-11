import { Header as HeaderParent } from "./header";
import { HeaderBanner } from "./headerBanner";
import { HeaderTitle } from "./headerTitle";
import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";

/**
 * Header component for the design system.
 * It includes optional banner, title, search, and links sections.
 */

const Header = Object.assign(HeaderParent, {
  Banner: HeaderBanner,
  Title: HeaderTitle,
  Search: HeaderSearch,
  Links: HeaderLinks,
});

export type { HeaderProps } from "./header";
export type { HeaderBannerProps } from "./headerBanner";
export type { HeaderSearchProps } from "./headerSearch";
export type { HeaderLinksProps } from "./headerLinks";
export type { HeaderTitleProps } from "./headerTitle";
export { Header, HeaderBanner, HeaderTitle, HeaderSearch, HeaderLinks };