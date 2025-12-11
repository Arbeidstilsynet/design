import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { clsx } from "clsx/lite";
import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { Dropdown } from "../../digdir";
import type { DefaultProps } from "../../types";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface HeaderTitleDropdownProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  controls?: ReactNode[];
  userName?: string;
}

export function HeaderTitleDropdown({
  className,
  controls,
  userName,
  ...rest
}: Readonly<HeaderTitleDropdownProps>) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={clsx(className)} {...rest}>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger
          onClick={() => setOpen(!open)}
          data-size="sm"
          variant="tertiary"
          className="at-header__title-dropdown-desktop"
        >
          {userName}
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown.Trigger
          onClick={() => setOpen(!open)}
          data-size="sm"
          variant="primary"
          className="at-header__title-dropdown-mobile"
        >
          {open ? <XMarkIcon aria-hidden /> : <MenuHamburgerIcon aria-hidden />}
          <span className="at-header__title-dropdown-text">Meny</span>
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
