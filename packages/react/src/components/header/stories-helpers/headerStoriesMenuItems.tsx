import { InboxIcon, PersonCircleIcon, TasklistIcon } from "@navikt/aksel-icons";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Link, Switch } from "../../..";
import classes from "./headerStoriesHelpers.module.css";

interface MenuLinkItemProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  badge?: number;
  badgeDataColor?: "info" | "warning" | "success" | "danger";
}

/**
 * Example menu item with icon and link.
 * This is a story-only component to demonstrate how consumers
 * can build their own custom menu items.
 *
 * @internal - Not exported to consumers
 */
export function MenuLinkItem({
  icon,
  href,
  children,
  badge,
  badgeDataColor = "info",
}: Readonly<MenuLinkItemProps>) {
  return (
    <Link className={classes.menuLinkItem} href={href}>
      <div className={classes.menuLinkItemIcon}>
        {icon}
      </div>
      <span>{children}</span>
      {badge !== undefined && (
        <div className={clsx(classes.menuLinkItemBadge, classes[badgeDataColor])}>
          {badge}
        </div>
      )}
    </Link>
  );
}

/**
 * Profile menu item example.
 * @internal - Not exported to consumers
 */
export function ProfileMenuItem() {
  return (
    <MenuLinkItem icon={<PersonCircleIcon />} href="#">
    Profil
    </MenuLinkItem>
  );
}

ProfileMenuItem.displayName = "ProfileMenuItem";

/**
 * Inbox menu item example with badge.
 * @internal - Not exported to consumers
 */
export function InboxMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <MenuLinkItem icon={<InboxIcon />} href="#" badge={count} badgeDataColor="warning">
      Innboks
    </MenuLinkItem>
  );
}

InboxMenuItem.displayName = "InboxMenuItem";

/**
 * TODOs menu item example with badge.
 * @internal - Not exported to consumers
 */
export function TODOsMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <MenuLinkItem icon={<TasklistIcon />} href="#" badge={count} badgeDataColor="info">
      Gjøremål
    </MenuLinkItem>
  );
}

TODOsMenuItem.displayName = "TODOsMenuItem";

/**
 * Dark mode switch example.
 * @internal - Not exported to consumers
 */
export function DarkModeMenuItem() {
  return (
    <div className={classes.darkModeMenuItem}>
      <Switch label="Mørk modus" position="end" />
    </div>
  );
}

DarkModeMenuItem.displayName = "DarkModeMenuItem";
