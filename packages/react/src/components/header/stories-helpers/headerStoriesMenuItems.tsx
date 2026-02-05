import { InboxIcon, PersonCircleIcon, TasklistIcon } from "@navikt/aksel-icons";
import type { ReactNode } from "react";
import { Button, Switch } from "../../..";

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
  children,
  badge,
  badgeDataColor = "info",
}: Readonly<MenuLinkItemProps>) {
  return (
    <Button
      style={{
        "--dsc-button-background--active": "var(--ds-color-surface-tinted)",
        "--dsc-button-background--hover": "var(--ds-color-surface-tinted)",
        "--dsc-button-background": "unset",
        "--dsc-button-border-width": "0",
        "--dsc-button-color--hover": "var(--ds-color-text-default)",
        "--dsc-button-color": "var(--ds-color-text-default)",
        "--dsc-button-size": "var(--ds-size-8)",
        alignItems: "center",
        height: "var(--ds-size-10)",
        minHeight: "unset",
        display: "flex",
        justifyContent: "flex-start",
        padding: "var(--ds-size-2) var(--ds-size-4)",
      } as React.CSSProperties}
    >
      <div style={{ flexShrink: 0, height: "fit-content", display: "flex", alignItems: "center" }}>{icon}</div>
      <span>{children}</span>
      {badge !== undefined && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: `var(--ds-color-${badgeDataColor}-text-default)`,
          backgroundColor: `var(--ds-color-${badgeDataColor}-surface-tinted)`,
          width: "var(--ds-size-7)",
          height: "var(--ds-size-7)",
          borderRadius: "50%",
          fontSize: "var(--ds-font-size-3)",
          fontWeight: "400",
          marginLeft: "auto",
        }}>
          {badge}
        </div>
      )}
    </Button>
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

/**
 * Dark mode switch example.
 * @internal - Not exported to consumers
 */
export function DarkModeMenuItem() {
  return (
    <div style={{ padding: "var(--ds-size-2) var(--ds-size-4)" }}>
      <Switch label="Mørk modus" position="end" />
    </div>
  );
}

InboxMenuItem.displayName = "InboxMenuItem";
