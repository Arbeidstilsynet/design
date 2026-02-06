import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx/lite";
import {
  isValidElement,
  use,
  useLayoutEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button, Divider, Dropdown } from "../../digdir";
import type { DefaultProps, Size } from "../../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { HeaderContext } from "./headerContext";

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
   * <Header.Menu triggerContent="Ola Nordmann">
   *   <ProfileMenuItem />
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
 *   <ProfileLink />
 *   <InboxLink />
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
  const [backdropTop, setBackdropTop] = useState(0);
  const { links, headerRef } = use(HeaderContext);
  const isMobile = useMediaQuery("(max-width: 48rem)");

  // Calculate backdrop position when menu opens
  useLayoutEffect(() => {
    if (!open || !headerRef.current) return;

    const updateBackdropPosition = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (rect) {
        setBackdropTop(rect.bottom);
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
          data-size={(isMobile ? "sm" : undefined) as Size}
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

        <Dropdown
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          placement="bottom"
          className="at-header__dropdown-content"
        >
          {/* Navigation menu items for mobile, including Divider */}
          <Dropdown.List>
            {links?.map((link, index) => (
              <Dropdown.Item key={"nav-" + index}>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div
                  className={clsx(
                    "at-header__dropdown-controls",
                    "at-header__dropdown-item-mobile",
                  )}
                >
                  {isValidElement(link) ? (
                    <Slot className={clsx("at-header__link", "ds-link")}>
                      {link}
                    </Slot>
                  ) : (
                    link
                  )}
                </div>
              </Dropdown.Item>
            ))}

            {links && links.length > 0 && (
              <Dropdown.Item>
                <div
                  className={clsx(
                    "at-header__dropdown-item-mobile at-header__dropdown-controls",
                  )}
                >
                  <Divider />
                </div>
              </Dropdown.Item>
            )}

            {/* Misc menu controls that are always shown */}
            {children && (
              <Dropdown.Item>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div className="at-header__dropdown-controls">{children}</div>
              </Dropdown.Item>
            )}

            {/* Mobile-only close button */}
            <Dropdown.Item>
              <div className="at-header__dropdown-close-mobile">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon aria-hidden />
                  {closeButtonText}
                </Button>
              </div>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>

      {/* overlay */}
      {open ? (
        <div
          aria-hidden
          className="at-header__dropdown-backdrop"
          style={{ top: backdropTop }}
        />
      ) : null}
    </div>
  );
}
