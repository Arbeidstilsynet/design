import { Header as HeaderParent } from "./header";
import { HeaderTitle } from "./headerTitle";

/**
 * Header component for the design system.
 * It includes the primary title section along with optional search and links sections.
 *
 * The primary Title section (`Header.Title`) displays the system name, user information, and navigation links.
 * You can pass in a list of user controls (like a theme switcher) to be displayed in a dropdown.
 *
 * For the navigation links, you can either provide an array of link items via the `links` prop,
 * or you can customize the links by passing your own components as children to `Header.Title`.
 * Make sure that the children you provide are valid React elements and accept className props for proper styling.
 *
 * Example usage for Next.js Link components:
 * ```tsx
 * import Link from "next/link";
 *
 * <Header>
 *   <Header.Title
 *     appName="My Application"
 *     userName="John Doe"
 *   >
 *     <Link href="/">Home</Link>
 *     <Link href="/about">About</Link>
 *  </Header.Title>
 * </Header>
 * ```
 */

const Header = Object.assign(HeaderParent, {
  Title: HeaderTitle,
});

export type { HeaderProps } from "./header";
export type { HeaderTitleProps } from "./headerTitle";
export { Header, HeaderTitle };
export { HeaderDefaultLogo } from "./headerDefaultLogo";
