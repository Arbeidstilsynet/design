import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { Button, Divider, Dropdown, Link, useMediaQuery } from "../../digdir";
import type { DefaultProps } from "../../types";
import type { LinkItem } from "./headerTitleLinks";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface HeaderTitleDropdownProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  controls?: ReactNode[];
  links?: LinkItem[];
  userName?: string;
}

export function HeaderTitleDropdown({
  className,
  controls,
  links,
  userName,
  ...rest
}: Readonly<HeaderTitleDropdownProps>) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const isMobile = useMediaQuery("(max-width: 768px)");

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
            {links?.map((link) => (
              <Dropdown.Item key={"nav-" + link.href}>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div
                  className={clsx(
                    "at-header__title-dropdown-controls",
                    "at-header__title-dropdown-item-mobile",
                  )}
                >
                  <Link
                    href={link.href}
                    className={clsx("at-header__title-link")}
                  >
                    {link.label}
                  </Link>
                </div>
              </Dropdown.Item>
            ))}
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
            {controls?.map((control, index) => (
              <Dropdown.Item key={id + "-control-" + index}>
                {/* Dropdown.Item does not forward className, so we wrap the control */}
                <div className="at-header__title-dropdown-controls">
                  {control}
                </div>
              </Dropdown.Item>
            ))}
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
