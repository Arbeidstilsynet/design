import { clsx } from "clsx/lite";
import { useState, type HTMLAttributes, type ReactNode } from "react";
import type { DefaultProps } from "../../types";
import { Dropdown } from "../../digdir";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface HeaderTitleDropdownProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  links?: DropdownItem[];
  controls?: ReactNode[];
  brukernavn?: string;
}

export function HeaderTitleDropdown({
  className,
  links,
  controls,
  brukernavn,
  ...rest
}: Readonly<HeaderTitleDropdownProps>) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(className)} {...rest}>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)} variant="tertiary">
          <span className={clsx("at-header__title-brukernavn")}>
            {brukernavn}
          </span>
          <span className="at-header__title-dropdown-text">Meny</span>
          {open ? (
            <ChevronDownIcon aria-hidden />
          ) : (
            <ChevronUpIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown open={open} onClose={() => setOpen(false)}>
          <Dropdown.List>
            {links?.map((link) => (
              <Dropdown.Item key={link.href}>
                <Dropdown.Button asChild onClick={() => setOpen(false)}>
                  <a href={link.href}>{link.label}</a>
                </Dropdown.Button>
              </Dropdown.Item>
            ))}
            {controls?.map((control, index) => (
              <Dropdown.Item key={index}>
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
