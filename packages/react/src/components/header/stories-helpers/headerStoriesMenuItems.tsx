import { InboxIcon, PersonCircleIcon, TasklistIcon } from "@navikt/aksel-icons";
import { Header } from "..";
import { Link, Switch } from "../../..";

/**
 * Profile menu item example.
 * @internal - Not exported to consumers
 */
export function ProfileMenuItem() {
  return (
    <Header.MenuRow>
      <Link href="#">
        <Header.MenuIcon>
          <PersonCircleIcon aria-label="Profil ikon" />
        </Header.MenuIcon>
        <span>Profil</span>
      </Link>
    </Header.MenuRow>
  );
}

ProfileMenuItem.displayName = "ProfileMenuItem";

/**
 * Inbox menu item example with badge.
 * @internal - Not exported to consumers
 */
export function InboxMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <Header.MenuRow>
      <Link href="#">
        <Header.MenuIcon>
          <InboxIcon aria-label="Innboks ikon" />
        </Header.MenuIcon>
        <span>Innboks</span>
        <Header.MenuBadge color="warning">{count}</Header.MenuBadge>
      </Link>
    </Header.MenuRow>
  );
}

InboxMenuItem.displayName = "InboxMenuItem";

/**
 * TODOs menu item example with badge.
 * @internal - Not exported to consumers
 */
export function TODOsMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <Header.MenuRow>
      <Link href="#">
        <Header.MenuIcon>
          <TasklistIcon aria-label="Gjøremål ikon" />
        </Header.MenuIcon>
        <span>Gjøremål</span>
        <Header.MenuBadge color="info">{count}</Header.MenuBadge>
      </Link>
    </Header.MenuRow>
  );
}

TODOsMenuItem.displayName = "TODOsMenuItem";

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

DarkModeMenuItem.displayName = "DarkModeMenuItem";
