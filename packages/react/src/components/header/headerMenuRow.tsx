import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type { DefaultProps } from "../../types";

export interface HeaderMenuRowProps
  extends DefaultProps<HTMLElement>, HTMLAttributes<HTMLElement> {
  padded?: boolean;
}

/**
 * Menu row that serves as a wrapper around a link in the header menu.
 * Supports an icon, badge and custom styling.
 */
export function HeaderMenuRow({
  className,
  padded,
  ...rest
}: Readonly<HeaderMenuRowProps>) {
  return (
    <Slot
      className={clsx("at-header__menu-row", padded && "padded", className)}
      {...rest}
    />
  );
}

export interface HeaderMenuIconProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {}

export function HeaderMenuIcon({
  className,
  ...rest
}: Readonly<HeaderMenuIconProps>) {
  return <div className={clsx("at-header__menu-icon", className)} {...rest} />;
}

export interface HeaderMenuBadgeProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  color?: "info" | "warning" | "success" | "danger";
}

export function HeaderMenuBadge({
  className,
  color = "info",
  ...rest
}: Readonly<HeaderMenuBadgeProps>) {
  return (
    <div
      className={clsx(`at-header__menu-badge-${color}`, className)}
      {...rest}
    />
  );
}
