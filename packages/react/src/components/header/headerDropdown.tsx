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
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button, Divider, Dropdown } from "../../digdir";
import type { DefaultProps } from "../../types";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface HeaderDropdownProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  links?: ReactNode[];
  userName?: string;
  menuControls?: ReactNode;
  menuCloseText?: string;
}

export function HeaderDropdown({
  className,
  menuControls,
  userName,
  links,
  menuCloseText = "Lukk",
  ...rest
}: Readonly<HeaderDropdownProps>) {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 48rem)");

  return (
    <div className={clsx(className)} {...rest}>
      <Dropdown.TriggerContext>
        {/* Have to use a shared Dropdown.Trigger for desktop/mobile or the positioning in Popover becomes wrong */}
        <Dropdown.Trigger
          data-size="sm"
          variant={isMobile ? "primary" : "tertiary"}
        >
          {isMobile ? (
            <>
              {open ? (
                <XMarkIcon aria-hidden />
              ) : (
                <MenuHamburgerIcon aria-hidden />
              )}
              <span>Meny</span>
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
            {menuControls && (
              <Dropdown.Item>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div className="at-header__dropdown-controls">
                  {menuControls}
                </div>
              </Dropdown.Item>
            )}
          </Dropdown.List>

          {/* Mobile-only close button */}
          <Dropdown.Item>
            <div className="at-header__dropdown-close-mobile">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon aria-hidden />
                {menuCloseText}
              </Button>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </Dropdown.TriggerContext>

      {/* overlay */}
      {open ? (
        <div aria-hidden className="at-header__dropdown-backdrop" />
      ) : null}
    </div>
  );
}
