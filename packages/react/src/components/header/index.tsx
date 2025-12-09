import { Header as HeaderParent } from "./header";
import { HeaderTitle } from "./headerTitle";

/**
 * Header component for the design system.
 * It includes the primary title section along with optional search and links sections.
 *
 * The primary Title section (`Header.Title`) displays the system name, user information, and navigation links.
 * You can pass in a list of user controls (like a theme switcher) to be displayed in a dropdown.
 */

const Header = Object.assign(HeaderParent, {
  Title: HeaderTitle,
});

export type { HeaderProps } from "./header";
export type { HeaderTitleProps } from "./headerTitle";
export { Header, HeaderTitle };
