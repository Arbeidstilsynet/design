import { Header as HeaderParent } from "./header";
import { HeaderIllustration } from "./headerIllustration";
import { HeaderLogo } from "./headerLogo";
import { HeaderMenu } from "./headerMenu";
import {
  HeaderMenuBadge,
  HeaderMenuIcon,
  HeaderMenuRow
} from "./headerMenuRow";
import { HeaderNavbar } from "./headerNavbar";
import { HeaderTitle } from "./headerTitle";


/**
 * Compound component for building responsive application headers.
 *
 * Header provides a flexible structure with automatic responsive behavior:
 * - **Desktop**: Shows title area, navigation bar, and dropdown menu
 * - **Mobile**: Shows logo only, with navigation links moved to hamburger menu
 *
 * ## Subcomponents
 *
 * - `Header.Title` - Container for branding area (illustration + logo)
 * - `Header.Illustration` - Decorative image (hidden on mobile)
 * - `Header.Logo` - Main logo/app name (always visible)
 * - `Header.Navbar` - Navigation links (hidden on mobile, shown in desktop)
 * - `Header.Menu` - Dropdown menu with custom controls
 *
 * ## Links prop
 *
 * For proper SPA navigation, pass an array of link components (e.g. `<NextLink>`) from the routing library, instead of Link from the design system.
 * These will automatically receive classnames through Slot for styling.
 *
 * ## Usage
 *
 * ```tsx
 * const links = [
 *   <Link key="home" href="/">Hjem</Link>,
 *   <Link key="about" href="/about">Om oss</Link>,
 * ];
 *
 * <Header links={links}>
 *   <Link href="/">
 *     <Header.Title>
 *       <Header.Illustration>
 *         <img src="/illustration.svg" alt="App Name" />
 *       </Header.Illustration>
 *       <Header.Logo>
 *         <img src="/logo.svg" alt="App Name" />
 *       </Header.Logo>
 *     </Header.Title>
 *   </Link>
 *   <Header.Navbar />
 *   <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
 *     <ProfileMenuItem />
 *     <InboxMenuItem />
 *     <Divider />
 *     <DarkModeMenuItem />
 *   </Header.Menu>
 * </Header>
 * ```
 */
const Header = Object.assign(HeaderParent, {
  Title: HeaderTitle,
  Illustration: HeaderIllustration,
  Logo: HeaderLogo,
  Navbar: HeaderNavbar,
  Menu: HeaderMenu,
  MenuRow: HeaderMenuRow,
  MenuIcon: HeaderMenuIcon,
  MenuBadge: HeaderMenuBadge
});

export type { HeaderProps } from "./header";
export { HeaderContext } from "./headerContext";
export type { HeaderIllustrationProps } from "./headerIllustration";
export type { HeaderLogoProps } from "./headerLogo";
export type { HeaderMenuProps } from "./headerMenu";
export type {
  HeaderMenuBadgeProps,
  HeaderMenuIconProps,
  HeaderMenuRowProps
} from "./headerMenuRow";
export type { HeaderNavbarProps } from "./headerNavbar";
export type { HeaderTitleProps } from "./headerTitle";
export {
  Header,
  HeaderIllustration,
  HeaderLogo,
  HeaderMenu,
  HeaderMenuBadge,
  HeaderMenuIcon,
  HeaderMenuRow,
  HeaderNavbar,
  HeaderTitle
};

