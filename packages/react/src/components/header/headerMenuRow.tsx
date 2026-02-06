import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ReactNode } from "react";

export interface HeaderMenuRowProps {
  children: ReactNode;
  padded?: boolean;
}

/**
 * Menu row that serves as a wrapper around a link in the header menu.
 * Supports an icon, badge and custom styling.
 */
export function HeaderMenuRow({
  children,
  padded
}: Readonly<HeaderMenuRowProps>) {
  return (
    <Slot className={clsx("at-header__menu-row", padded && "padded")}>
      {children}
    </Slot>
  );
}

export interface HeaderMenuRowIconProps {
  children: ReactNode;
}

export function HeaderMenuRowIcon({ children }: Readonly<HeaderMenuRowIconProps>) {
  return (
    <div className="at-header__menu-row-icon">
      {children}
    </div>
  );
}

export interface HeaderMenuRowBadgeProps {
  color?: "info" | "warning" | "success" | "danger";
  children: ReactNode;
}

export function HeaderMenuRowBadge({ color = "info", children }: Readonly<HeaderMenuRowBadgeProps>) {
  return (
    <div className={`at-header__menu-row-badge-${color}`}>
      {children}
    </div>
  );
}
