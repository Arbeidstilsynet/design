import { EnvelopeClosedIcon, PersonCircleIcon } from "@navikt/aksel-icons";
import type { ReactNode } from "react";
import { Badge, Link } from "../../..";

interface MenuLinkItemProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  badge?: number;
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
}: Readonly<MenuLinkItemProps>) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <Link
        href={href}
        style={{
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          minHeight: "0",
        }}
      >
        {children}
      </Link>
      {badge !== undefined && (
        <Badge count={badge} style={{ marginLeft: "auto" }} />
      )}
    </div>
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
export function InboxMenuItem({ count = 15 }: Readonly<{ count?: number }>) {
  return (
    <MenuLinkItem icon={<EnvelopeClosedIcon />} href="#" badge={count}>
      Innboks
    </MenuLinkItem>
  );
}

InboxMenuItem.displayName = "InboxMenuItem";
