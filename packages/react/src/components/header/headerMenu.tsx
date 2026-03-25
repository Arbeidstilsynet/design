import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import {
  use,
  useLayoutEffect,
  useState,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { Dropdown } from "../../digdir";
import type { DefaultProps } from "../../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { HeaderContext } from "./headerContext";
import { HeaderMenuDropdown } from "./headerMenuDropdown";

export interface HeaderMenuProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  /**
   * Content for the menu button on desktop.
   * Typically a user name or menu title.
   */
  triggerContent: ReactNode;

  /**
   * Text for the menu button on mobile.
   * @default "Meny".
   */
  mobileMenuText?: string;

  /**
   * Text for the close button in mobile dropdown view.
   * @default "Lukk"
   */
  closeButtonText?: ReactNode;

  /**
   * Custom menu controls to display in the dropdown.
   * On mobile viewport these appear between navigation links and the close button in the menu.
   * A `<Divider />` is automatically added between navigation links and custom controls.
   *
   * @example
   * ```tsx
   * <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
   *   <Header.MenuRow>
   *     <Link href="#">
   *       <Header.MenuIcon>
   *         <PersonCircleIcon aria-label="Profil ikon" />
   *       </Header.MenuIcon>
   *       <span>Profil</span>
   *     </Link>
   *   </Header.MenuRow>
   *   <Header.MenuRow>
   *     <Link href="#">
   *       <Header.MenuIcon>
   *         <InboxIcon aria-label="Innboks ikon" />
   *       </Header.MenuIcon>
   *       <span>Innboks</span>
   *       <Header.MenuBadge color="warning">19</Header.MenuBadge>
   *     </Link>
   *   </Header.MenuRow>
   *   <Header.MenuRow>
   *     <Link href="#">
   *       <Header.MenuIcon>
   *         <TasklistIcon aria-label="Gjøremål ikon" />
   *       </Header.MenuIcon>
   *       <span>Gjøremål</span>
   *       <Header.MenuBadge color="info">19</Header.MenuBadge>
   *     </Link>
   *   </Header.MenuRow>
   *   <Divider />
   *   <Switch label="Mørk modus" position="end" />
   * </Header.Menu>
   * ```
   */
  children?: ReactNode;
}

/**
 * Dropdown menu for the header with user controls and navigation (on mobile).
 *
 * On **desktop**: Shows a dropdown trigger with `triggerContent` that opens a menu
 * containing only the custom children (menu controls).
 *
 * On **mobile**: Shows a hamburger menu button that opens a full-width dropdown
 * containing both navigation links (from parent `Header`) and custom children.
 *
 * The component is responsible for the dropdown behavior and styling.
 * You control what appears in the menu through the `children` prop.
 *
 * @example
 * ```tsx
 * <Header.Menu triggerContent="Ola Nordmann" closeButtonText="Lukk">
 *   <Header.MenuRow>
 *     <Link href="#">
 *       <Header.MenuIcon>
 *         <PersonCircleIcon aria-label="Profil ikon" />
 *       </Header.MenuIcon>
 *       <span>Profil</span>
 *     </Link>
 *   </Header.MenuRow>
 *   <Header.MenuRow>
 *     <Link href="#">
 *       <Header.MenuIcon>
 *         <InboxIcon aria-label="Innboks ikon" />
 *       </Header.MenuIcon>
 *       <span>Innboks</span>
 *       <Header.MenuBadge color="warning">19</Header.MenuBadge>
 *     </Link>
 *   </Header.MenuRow>
 *   <Header.MenuRow>
 *     <Link href="#">
 *       <Header.MenuIcon>
 *         <TasklistIcon aria-label="Gjøremål ikon" />
 *       </Header.MenuIcon>
 *       <span>Gjøremål</span>
 *       <Header.MenuBadge color="info">19</Header.MenuBadge>
 *     </Link>
 *   </Header.MenuRow>
 *   <Divider />
 *   <Switch label="Mørk modus" position="end" />
 * </Header.Menu>
 * ```
 */
export function HeaderMenu({
  className,
  children,
  triggerContent,
  mobileMenuText = "Meny",
  closeButtonText = "Lukk",
  ...rest
}: Readonly<HeaderMenuProps>) {
  const [open, setOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(0);
  const { links, headerRef } = use(HeaderContext);
  const isMobile = useMediaQuery("(max-width: 48rem)");

  // Calculate backdrop position when menu opens
  useLayoutEffect(() => {
    if (!open || !headerRef.current) return;

    const updateBackdropPosition = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (rect) {
        setHeaderBottom(rect.bottom);
      }
    };

    updateBackdropPosition();

    // Update on scroll/resize
    window.addEventListener("scroll", updateBackdropPosition, true);
    window.addEventListener("resize", updateBackdropPosition);

    return () => {
      window.removeEventListener("scroll", updateBackdropPosition, true);
      window.removeEventListener("resize", updateBackdropPosition);
    };
  }, [open, headerRef]);

  return (
    <div className={clsx("at-header__right", className)} {...rest}>
      <Dropdown.TriggerContext>
        {/* Have to use a shared Dropdown.Trigger for desktop/mobile or the positioning in Popover becomes wrong */}
        <Dropdown.Trigger
          variant={isMobile ? "primary" : "tertiary"}
          className="at-header__dropdown-trigger"
        >
          {isMobile ? (
            <>
              {open ? (
                <XMarkIcon aria-hidden />
              ) : (
                <MenuHamburgerIcon aria-hidden />
              )}
              {mobileMenuText}
            </>
          ) : (
            <>
              {triggerContent}
              {open ? (
                <ChevronUpIcon aria-hidden />
              ) : (
                <ChevronDownIcon aria-hidden />
              )}
            </>
          )}
        </Dropdown.Trigger>
        <HeaderMenuDropdown
          children={children}
          closeButtonText={closeButtonText}
          isMobile={isMobile}
          open={open}
          setOpen={setOpen}
        />
      </Dropdown.TriggerContext>
    </div>
  );
}
