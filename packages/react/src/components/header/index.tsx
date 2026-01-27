import { Header as HeaderParent } from "./header";
import { HeaderIllustration } from "./headerIllustration";
import { HeaderLogo } from "./headerLogo";
import { HeaderMenu } from "./headerMenu";
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
 * ## Usage
 *
 * ```tsx
 * const links = [
 *   <Link key="home" href="/">Hjem</Link>,
 *   <Link key="about" href="/about">Om oss</Link>,
 * ];
 *
 * <Header links={links}>
 *   <Header.Title>
 *     <Header.Illustration>
 *       <img src="/illustration.svg" alt="" />
 *     </Header.Illustration>
 *     <Header.Logo>
 *       <Link href="/">
 *         <img src="/logo.svg" alt="App Name" />
 *       </Link>
 *     </Header.Logo>
 *   </Header.Title>
 *   <Header.Navbar />
 *   <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
 *     <ProfileMenuItem />
 *     <InboxMenuItem />
 *     <Divider />
 *     <Switch label="Mørk modus" position="end" />
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
});

export type { HeaderProps } from "./header";
export { HeaderContext } from "./headerContext";
export { HeaderIllustration } from "./headerIllustration";
export type { HeaderIllustrationProps } from "./headerIllustration";
export { HeaderLogo } from "./headerLogo";
export type { HeaderLogoProps } from "./headerLogo";
export { HeaderMenu } from "./headerMenu";
export type { HeaderMenuProps } from "./headerMenu";
export { HeaderNavbar } from "./headerNavbar";
export type { HeaderNavbarProps } from "./headerNavbar";
export { HeaderTitle } from "./headerTitle";
export type { HeaderTitleProps } from "./headerTitle";
export { Header };
