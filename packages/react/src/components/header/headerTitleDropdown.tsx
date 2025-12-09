import { clsx } from "clsx/lite";
import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { Dropdown } from "../../digdir";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface HeaderTitleDropdownProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  controls?: ReactNode[];
  brukernavn?: string;
}

export function HeaderTitleDropdown({
  className,
  controls,
  brukernavn,
  ...rest
}: Readonly<HeaderTitleDropdownProps>) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={clsx(className)} {...rest}>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)} variant="tertiary">
          <div className="at-header__title-dropdown-desktop">
            {brukernavn}
            {open ? (
              <ChevronUpIcon aria-hidden />
            ) : (
              <ChevronDownIcon aria-hidden />
            )}
          </div>
          <div className="at-header__title-dropdown-mobile">
            <span className="at-header__title-dropdown-text">Meny</span>
            {open ? (
              <XMarkIcon aria-hidden />
            ) : (
              <MenuHamburgerIcon aria-hidden />
            )}
          </div>
        </Dropdown.Trigger>
        <Dropdown open={open} onClose={() => setOpen(false)}>
          <Dropdown.List>
            {controls?.map((control, index) => (
              <Dropdown.Item key={id + "-control-" + index}>
                <div className={clsx("at-header__title-dropdown-controls")}>
                  {control}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    </div>
  );
}
