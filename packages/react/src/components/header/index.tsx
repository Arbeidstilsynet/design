import { Header as HeaderParent } from "./header";
import { HeaderIllustration } from "./headerIllustration";
import { HeaderLogo } from "./headerLogo";
import { HeaderMenu } from "./headerMenu";
import {
  HeaderMenuBadge,
  HeaderMenuIcon,
  HeaderMenuRow,
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
 * - `Header.MenuRow` - Wrapper for individual menu items in the dropdown
 * - `Header.MenuIcon` - Icon for menu items
 * - `Header.MenuBadge` - Badge for menu items
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
 *   <Link href="/" aria-label="Link til hjem">
 *     <Header.Title>
 *       <Header.Illustration>
 *         <img src="/illustration.svg" alt="App Name" />
 *       </Header.Illustration>
 *       <Header.Logo style={{ fontFamily: "Literata" }}>
 *        Fagsystem
 *       </Header.Logo>
 *     </Header.Title>
 *   </Link>
 *   <Header.Navbar />
 *   <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
 *     <Header.MenuRow>
 *       <Link href="#">
 *         <Header.MenuIcon>
 *           <PersonCircleIcon aria-label="Profil ikon" />
 *         </Header.MenuIcon>
 *         <span>Profil</span>
 *       </Link>
 *     </Header.MenuRow>
 *     <Header.MenuRow>
 *       <Link href="#">
 *         <Header.MenuIcon>
 *           <InboxIcon aria-label="Innboks ikon" />
 *         </Header.MenuIcon>
 *         <span>Innboks</span>
 *         <Header.MenuBadge color="warning">19</Header.MenuBadge>
 *       </Link>
 *     </Header.MenuRow>
 *     <Header.MenuRow>
 *       <Link href="#">
 *         <Header.MenuIcon>
 *           <TasklistIcon aria-label="Gjøremål ikon" />
 *         </Header.MenuIcon>
 *         <span>Gjøremål</span>
 *         <Header.MenuBadge color="info">19</Header.MenuBadge>
 *       </Link>
 *     </Header.MenuRow>
 *     <Divider />
 *     <div style={{ padding: "var(--ds-size-2) var(--ds-size-4)" }}>
 *       <Switch label="Mørk modus" position="end" />
 *     </div>
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
  MenuBadge: HeaderMenuBadge,
});

export type { HeaderProps } from "./header";
export { HeaderContext } from "./headerContext";
export type { HeaderIllustrationProps } from "./headerIllustration";
export type { HeaderLogoProps } from "./headerLogo";
export type { HeaderMenuProps } from "./headerMenu";
export type {
  HeaderMenuBadgeProps,
  HeaderMenuIconProps,
  HeaderMenuRowProps,
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
  HeaderTitle,
};
