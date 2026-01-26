import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx/lite";
import {
  Children,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button, Divider, Dropdown } from "../../digdir";
import type { DefaultProps } from "../../types";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface HeaderDropdownProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  controls?: ReactNode;
  userName?: string;
  children?: ReactNode;
}

export function HeaderDropdown({
  className,
  controls,
  userName,
  children,
  ...rest
}: Readonly<HeaderDropdownProps>) {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 48rem)");

  return (
    <div className={clsx(className)} {...rest}>
      <Dropdown.TriggerContext>
        {/* Have to use a shared Dropdown.Trigger for desktop/mobile or the positioning in Popover becomes wrong */}
        <Dropdown.Trigger
          onClick={() => setOpen(!open)}
          data-size="sm"
          variant={isMobile ? "primary" : "tertiary"}
          className="at-header__title-dropdown-trigger"
        >
          {isMobile ? (
            <>
              {open ? (
                <XMarkIcon aria-hidden />
              ) : (
                <MenuHamburgerIcon aria-hidden />
              )}
              <span className="at-header__title-dropdown-text">Meny</span>
            </>
          ) : (
            <>
              {userName}
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
          onClose={() => setOpen(false)}
          placement="bottom"
          className="at-header__title-dropdown-content"
        >
          {/* Navigation menu items for mobile, including Divider */}
          <Dropdown.List>
            {children
              ? Children.map(children, (child, index) => (
                  <Dropdown.Item key={"nav-" + index}>
                    {/* Dropdown.Item does not forward className, so we wrap the control */}
                    <div
                      className={clsx(
                        "at-header__title-dropdown-controls",
                        "at-header__title-dropdown-item-mobile",
                      )}
                    >
                      {isValidElement(child) ? (
                        <Slot
                          className={clsx("at-header__title-link", "ds-link")}
                        >
                          {child}
                        </Slot>
                      ) : (
                        child
                      )}
                    </div>
                  </Dropdown.Item>
                ))
              : null}
            <Dropdown.Item>
              <div
                className={clsx(
                  "at-header__title-dropdown-item-mobile at-header__title-dropdown-controls",
                )}
              >
                <Divider />
              </div>
            </Dropdown.Item>

            {/* Misc menu controls that are always shown */}
            {controls && (
              <Dropdown.Item>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div className="at-header__title-dropdown-controls">
                  {controls}
                </div>
              </Dropdown.Item>
            )}
          </Dropdown.List>

          {/* Mobile-only close button */}
          <Dropdown.Item>
            <div className="at-header__title-dropdown-close-mobile">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon aria-hidden />
                Lukk
              </Button>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </Dropdown.TriggerContext>

      {/* overlay */}
      {open ? (
        <div aria-hidden className="at-header__title-dropdown-backdrop" />
      ) : null}
    </div>
  );
}
