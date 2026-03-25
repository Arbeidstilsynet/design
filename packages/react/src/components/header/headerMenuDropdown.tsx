import { XMarkIcon } from "@navikt/aksel-icons";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { isValidElement, use, useEffect, type ReactNode, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { Button, Divider, Dropdown } from "../../digdir";
import { HeaderContext } from "./headerContext";

interface HeaderMenuDropdownProps {
  children?: React.ReactNode;
  closeButtonText: ReactNode;
  isMobile: boolean;
  open: boolean;
  setOpen: (open: SetStateAction<boolean>) => void;
}

export function HeaderMenuDropdown({
  children,
  closeButtonText,
  isMobile,
  open,
  setOpen,
}: Readonly<HeaderMenuDropdownProps>) {
  const content = (
    <HeaderMenuDropdownContent
      children={children}
      closeButtonText={closeButtonText}
      setOpen={setOpen}
    />
  );

  if (isMobile) {
    return <MobileDropdown content={content} open={open} setOpen={setOpen} />;
  }

  return (
    <Dropdown
      children={content}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      placement="bottom"
      className="at-header__dropdown-content"
    />
  );
}

type MobileDropdownProps = Pick<HeaderMenuDropdownProps, "open" | "setOpen"> & {
  content: ReactNode;
};

function MobileDropdown({
  content,
  open,
  setOpen,
}: MobileDropdownProps) {
    // Add onClick event to dropdown trigger (As it is no longer handled automatically by popover)
    useEffect(() => {
      const trigger = document.querySelector<HTMLElement>(".at-header__dropdown-trigger");
      if (!trigger) {
        console.error("Dropdown trigger not found when trying to set onClick event");
        return;
      }

      const handleTriggerClick = () => setOpen((prevOpen) => !prevOpen);
      trigger.addEventListener("click", handleTriggerClick);
      return () => {
        trigger.removeEventListener("click", handleTriggerClick);
      }
    }, []);

    // Close dropdown on Escape key press and return focus to trigger (Logic based on Popover code of digdir/designsystemet)
    useEffect(() => {
      const handleKeydown = (event: KeyboardEvent) => {
        if (!open || event.key !== 'Escape') return;

        event.preventDefault(); // Prevent closing fullscreen in Safari
        document.querySelector<HTMLElement>(".at-header__dropdown-trigger")?.focus?.(); // Move focus back to trigger
        setOpen(false);
      };

      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }, [open]);

    if (!open) {
      return null;
    }

    const domElement = document.getElementById("at-header__mobile-dropdown-content");
    if (!domElement) {
      console.error("Mobile dropdown content container not found");
      return null;
    }

    return createPortal(content, domElement);
}

type HeaderMenuDropdownContentProps = Pick<HeaderMenuDropdownProps, "children" | "closeButtonText" | "setOpen">;

function HeaderMenuDropdownContent({
  children,
  closeButtonText,
  setOpen,
}: Readonly<HeaderMenuDropdownContentProps>) {
  const { links } = use(HeaderContext);

  return (
    <>
      {/* Navigation menu items for mobile, including Divider */}
      {links?.map((link, index) => (
        <div
          className={clsx(
            "at-header__dropdown-controls",
            "at-header__dropdown-item-mobile",
          )}
            key={`link-${index}`}
        >
          {isValidElement(link) ? (
            <Slot className={clsx("at-header__link", "ds-link")}>
              {link}
            </Slot>
          ) : (
            link
          )}
        </div>
      ))}

      {links && links.length > 0 && (
        <div
          className={clsx(
            "at-header__dropdown-item-mobile at-header__dropdown-controls",
          )}
        >
          <Divider />
        </div>
      )}

      {/* Misc menu controls that are always shown */}
      {children && (
        <div className="at-header__dropdown-controls">{children}</div>
      )}

      {/* Mobile-only close button */}
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
    </>
  )
}
